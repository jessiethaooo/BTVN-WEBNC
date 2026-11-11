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
let database, fashionCollection, fashionCounterCollection, UserCollection;

function createFashionSlug(subject, IdF) {
    const slugSubject = (subject || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") || "fashion";
    return `${slugSubject}-p${IdF}`;
}

async function prepareFashionCollection() {
    const fashions = await fashionCollection.find(
        {},
        { projection: { IdF: 1, slug: 1, fashion_subject: 1 } }
    ).sort({ _id: 1 }).toArray();
    const usedIds = new Set();
    const validIds = new Set(
        fashions
            .map(fashion => fashion.IdF)
            .filter(IdF => Number.isSafeInteger(IdF) && IdF > 0)
    );
    let nextIdF = [...validIds].reduce((max, IdF) => Math.max(max, IdF), 0);

    for (const fashion of fashions) {
        let IdF = fashion.IdF;
        if (!Number.isSafeInteger(IdF) || IdF < 1 || usedIds.has(IdF)) {
            do {
                nextIdF += 1;
                IdF = nextIdF;
            } while (validIds.has(IdF) || usedIds.has(IdF));
        }
        usedIds.add(IdF);

        const slug = createFashionSlug(fashion.fashion_subject, IdF);
        if (fashion.IdF !== IdF || fashion.slug !== slug) {
            await fashionCollection.updateOne(
                { _id: fashion._id },
                { $set: { IdF, slug } }
            );
        }
    }

    await fashionCollection.createIndex({ IdF: 1 }, { unique: true });
    await fashionCollection.createIndex({ slug: 1 }, { unique: true });
    await fashionCounterCollection.updateOne(
        { _id: "fashionIdF" },
        { $max: { sequence_value: nextIdF } },
        { upsert: true }
    );
}

async function initDB() {
    await client.connect();
    database = client.db("FashionData");
    fashionCollection = database.collection("Fashion");
    fashionCounterCollection = database.collection("Counters");
    UserCollection = database.collection("User");
    await prepareFashionCollection();
    console.log("Đã kết nối MongoDB thành công!");
}

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

app.get("/fashions/slug/:slug", async (req, res) => {
    try {
        const result = await fashionCollection.findOne({ slug: req.params.slug });
        if (!result) {
            return res.status(404).send({ message: "Không tìm thấy Fashion!" });
        }
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: "Lỗi truy vấn chi tiết!", error: err.message });
    }
});

app.get("/fashions/idf/:IdF", async (req, res) => {
    const IdF = Number(req.params.IdF);
    if (!Number.isSafeInteger(IdF) || IdF < 1) {
        return res.status(400).send({ message: "IdF phải là số nguyên dương!" });
    }

    try {
        const result = await fashionCollection.findOne({ IdF });
        if (!result) {
            return res.status(404).send({ message: "Không tìm thấy Fashion với IdF này!" });
        }
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: "Lỗi truy vấn chi tiết!", error: err.message });
    }
});

app.get("/fashions/:id", async (req, res) => {
    try {
        const o_id = new ObjectId(req.params.id);
        const result = await fashionCollection.findOne({ _id: o_id });
        if (!result) {
            return res.status(404).send({ message: "Không tìm thấy Fashion!" });
        }
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: "ID không hợp lệ!", error: err.message });
    }
});

app.post("/fashions", async (req, res) => {
    try {
        if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
            return res.status(400).send({ message: "Dữ liệu Fashion không hợp lệ!" });
        }
        const counter = await fashionCounterCollection.findOneAndUpdate(
            { _id: "fashionIdF" },
            { $inc: { sequence_value: 1 } },
            { upsert: true, returnDocument: "after" }
        );
        const IdF = counter.sequence_value;
        const fashion = {
            style: req.body.style || "",
            fashion_subject: req.body.fashion_subject || "",
            fashion_detail: req.body.fashion_detail || "",
            fashion_image: req.body.fashion_image || "",
            IdF,
            slug: createFashionSlug(req.body.fashion_subject, IdF)
        };
        const result = await fashionCollection.insertOne(fashion);
        res.status(201).send({ ...fashion, _id: result.insertedId });
    } catch (err) {
        res.status(500).send({ message: "Lỗi thêm dữ liệu!", error: err.message });
    }
});

app.put("/fashions", async (req, res) => {
    try {
        const o_id = new ObjectId(req.body._id);
        const existingFashion = await fashionCollection.findOne({ _id: o_id });
        if (!existingFashion) {
            return res.status(404).send({ message: "Không tìm thấy Fashion!" });
        }
        const updateFields = {
            style: req.body.style ?? existingFashion.style,
            fashion_subject: req.body.fashion_subject ?? existingFashion.fashion_subject,
            fashion_detail: req.body.fashion_detail ?? existingFashion.fashion_detail,
            fashion_image: req.body.fashion_image ?? existingFashion.fashion_image,
            slug: createFashionSlug(
                req.body.fashion_subject ?? existingFashion.fashion_subject,
                existingFashion.IdF
            )
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
initDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`My Server listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error("Không thể khởi động server Fashion:", err);
        process.exitCode = 1;
    });