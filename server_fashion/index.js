const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 4000; // Đội chuẩn Port 4000 theo đề bài
const MONGO_URI = "mongodb://127.0.0.1:27017";

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

let fashionCollection;

async function connectDB() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log("Đã kết nối MongoDB!");
        const db = client.db("FashionData");
        fashionCollection = db.collection("Fashion");
    } catch (err) {
        console.error("Lỗi kết nối MongoDB:", err);
    }
}
connectDB();

// 1. Lấy toàn bộ Fashion, sắp xếp ngày tạo giảm dần
app.get("/fashions", async (req, res) => {
    try {
        const result = await fashionCollection.find({}).sort({ created_at: -1, _id: -1 }).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Lọc danh sách Fashion theo 1 Style
app.get("/fashions/style/:style", async (req, res) => {
    try {
        const styleParam = req.params.style;
        const result = await fashionCollection.find({ 
            style: { $regex: new RegExp("^" + styleParam + "$", "i") } 
        }).sort({ created_at: -1 }).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Trả về 1 Fashion dựa vào ObjectId
app.get("/fashions/:id", async (req, res) => {
    try {
        const result = await fashionCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).json({ message: "Không tìm thấy" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Thêm mới 1 Fashion
app.post("/fashions", async (req, res) => {
    try {
        const img = req.body.thumbnail || req.body.fashion_image || "";
        const newFashion = {
            style: req.body.style || "STREET STYLE",
            fashion_subject: req.body.fashion_subject,
            fashion_detail: req.body.fashion_detail,
            thumbnail: img,
            fashion_image: img,
            created_at: new Date()
        };
        const result = await fashionCollection.insertOne(newFashion);
        res.status(201).json({ _id: result.insertedId, ...newFashion });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. Chỉnh sửa 1 Fashion
app.put("/fashions/:id?", async (req, res) => {
    try {
        const id = req.params.id || req.body._id;
        const img = req.body.thumbnail || req.body.fashion_image || "";
        const updateData = {
            style: req.body.style,
            fashion_subject: req.body.fashion_subject,
            fashion_detail: req.body.fashion_detail,
            thumbnail: img,
            fashion_image: img
        };
        await fashionCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
        res.json({ _id: id, ...updateData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 6. Xóa 1 Fashion dựa vào id
app.delete("/fashions/:id", async (req, res) => {
    try {
        const result = await fashionCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ message: "Xóa thành công", count: result.deletedCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server API running at http://localhost:${PORT}`);
});