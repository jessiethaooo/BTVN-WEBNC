const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // Khai báo express-session
const morgan = require('morgan');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3002;
const JWT_SECRET = 'chua_khoa_bi_mat_123456';

// -------------------------------------------------------------
// 1. HÀM BỔ TRỢ & MIDDLEWARE XÁC THỰC
// -------------------------------------------------------------
function hashSHA256(plainText) {
    if (!plainText) return '';
    return crypto.createHash('sha256').update(plainText).digest('hex');
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "Không tìm thấy Bearer Token! Vui lòng đăng nhập." });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ message: "Token không hợp lệ hoặc đã hết hạn!" });
        }
        req.user = user;
        next();
    });
}

// -------------------------------------------------------------
// 2. MIDDLEWARES CẤU HÌNH SERVER
// -------------------------------------------------------------
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Cấu hình Middleware Session cho Giỏ hàng & Đăng xuất
app.use(session({
    secret: 'bi_mat_gio_hang_123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Đặt true nếu chạy HTTPS
}));

// -------------------------------------------------------------
// 3. KẾT NỐI MONGODB
// -------------------------------------------------------------
const client = new MongoClient("mongodb://127.0.0.1:27017");
let database, fashionCollection, UserCollection;

async function initDB() {
    try {
        await client.connect();
        database = client.db("FashionData");
        fashionCollection = database.collection("Fashion");
        UserCollection = database.collection("User");
        console.log("Đã kết nối MongoDB thành công!");
    } catch (err) {
        console.error("Lỗi kết nối MongoDB:", err);
    }
}
initDB();

// -------------------------------------------------------------
// 4. API ROUTES
// -------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB");
});

// --- FASHION APIs ---
app.get("/fashions", async (req, res) => {
    try {
        const result = await fashionCollection.find({}).toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: "Lỗi truy vấn danh sách!", error: err.message });
    }
});

app.get("/fashions/:id", async (req, res) => {
    try {
        const o_id = new ObjectId(req.params.id);
        const result = await fashionCollection.findOne({ _id: o_id });
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: "ID không hợp lệ!", error: err.message });
    }
});

app.post("/fashions", async (req, res) => {
    try {
        await fashionCollection.insertOne(req.body);
        res.send(req.body);
    } catch (err) {
        res.status(500).send({ message: "Lỗi thêm dữ liệu!", error: err.message });
    }
});

app.put("/fashions", async (req, res) => {
    try {
        const o_id = new ObjectId(req.body._id);
        const updateFields = {
            style: req.body.style,
            fashion_subject: req.body.fashion_subject,
            fashion_detail: req.body.fashion_detail,
            fashion_image: req.body.fashion_image
        };
        await fashionCollection.updateOne({ _id: o_id }, { $set: updateFields });
        const result = await fashionCollection.findOne({ _id: o_id });
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: "Lỗi cập nhật dữ liệu!", error: err.message });
    }
});

app.delete("/fashions/:id", async (req, res) => {
    try {
        const o_id = new ObjectId(req.params.id);
        const result = await fashionCollection.findOne({ _id: o_id });
        await fashionCollection.deleteOne({ _id: o_id });
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: "Lỗi xóa dữ liệu!", error: err.message });
    }
});

// --- CART API ---
app.post('/cart/add', (req, res) => {
    const { fashionId, name, price } = req.body;
    
    // 1. Tạo giỏ hàng nếu chưa tồn tại trong Session
    if (!req.session.cart) {
        req.session.cart = [];
    }
    
    // 2. Thêm sản phẩm vào mảng giỏ hàng của Session
    req.session.cart.push({ fashionId, name, price, addedAt: new Date() });
    
    res.send({ 
        message: "Added to temporary cart", 
        cartCount: req.session.cart.length 
    });
});

// --- AUTHENTICATION APIs ---
app.post('/user-login', async (req, res) => {
    try {
        const hashedPassword = hashSHA256(req.body.password);
        const user = await UserCollection.findOne({
            username: req.body.username,
            password: hashedPassword
        });

        if (user) {
            const token = jwt.sign(
                { username: user.username, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            if (req.body.rememberMe) {
                res.cookie('remember_user', req.body.username, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: false,
                    secure: false,
                    sameSite: 'Lax'
                });
            }

            res.status(200).send({
                message: "Login successful!",
                token: token,
                user: { username: user.username, role: user.role }
            });
        } else {
            res.status(401).send({ message: "Wrong user or email or password!" });
        }
    } catch (err) {
        res.status(500).send({ message: "Lỗi hệ thống khi đăng nhập!", error: err.message });
    }
});

app.post('/user-change-password', verifyToken, async (req, res) => {
    try {
        const { username, oldPassword, newPassword } = req.body;

        if (!username || !oldPassword || !newPassword) {
            return res.status(400).send({ message: "Vui lòng nhập đầy đủ thông tin!" });
        }

        const hashedOldPassword = hashSHA256(oldPassword);
        const user = await UserCollection.findOne({
            username: username,
            password: hashedOldPassword
        });

        if (!user) {
            return res.status(400).send({ message: "Mật khẩu cũ không chính xác!" });
        }

        const hashedNewPassword = hashSHA256(newPassword);
        await UserCollection.updateOne(
            { username: username },
            { $set: { password: hashedNewPassword } }
        );

        res.status(200).send({ 
            message: "Đổi mật khẩu thành công!", 
            hashedPassword: hashedNewPassword 
        });
    } catch (err) {
        res.status(500).send({ message: "Lỗi hệ thống khi đổi mật khẩu!", error: err.message });
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('remember_user');
    res.clearCookie('connect.sid');

    if (req.session) {
        req.session.destroy((err) => {
            if (err) return res.status(500).send("Error logging out");
            res.send("Logged out successfully");
        });
    } else {
        res.send("Logged out successfully");
    }
});

// -------------------------------------------------------------
// 5. KHỞI CHẠY SERVER
// -------------------------------------------------------------
app.listen(port, () => {
    console.log(`My Server listening on port ${port}`);
});