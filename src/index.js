const express = require("express");
const app = express();

// โหลดค่า environment variables จากไฟล์ .env
require('dotenv').config();
const port = process.env.PORT || 3000;  // ใช้ PORT ที่กำหนดใน .env ถ้าไม่มีใช้ 3000

const bodyParser = require("body-parser");  // ใช้ body-parser เพื่อจัดการข้อมูลที่ส่งมาจาก client
const cors = require("cors");  // ใช้ CORS เพื่อเปิดใช้งานการเข้าถึงจากโดเมนต่างๆ

// นำเข้า routes ต่าง ๆ ที่เชื่อมต่อกับ resource ของระบบ
const menuRoute = require("./routes/menu.route");
const orderRoute = require("./routes/order.route");
const tableRoute = require("./routes/table.route");
const orderItemRoute = require("./routes/orderItem.route");
const categoryRoute = require("./routes/category.route");
const adminRoute = require("./routes/admin.route");

// ใช้ express.static เพื่อให้บริการไฟล์ภาพจากโฟลเดอร์ 'images'
app.use('/images', express.static('images'));

// ใช้ CORS เพื่อให้อนุญาตการเชื่อมต่อจากทุกโดเมน
app.use(cors());

// ใช้ body-parser เพื่อจัดการกับข้อมูล JSON ที่ถูกส่งมาจาก client
app.use(bodyParser.json());

// ใช้ body-parser เพื่อจัดการกับข้อมูล URL encoded ที่ถูกส่งมาจาก client
app.use(bodyParser.urlencoded({ extended: true }));

// ตั้งค่า endpoint หลัก (test route) สำหรับการทดสอบว่า API ทำงานได้
app.get("/", (req, res) => {
  res.send("Hello World!!!");  // ส่งข้อความตอบกลับไปยัง client
});

// ตั้งค่า routes สำหรับ API ต่าง ๆ
app.use("/menus", menuRoute);
app.use("/orders", orderRoute);
app.use("/tables", tableRoute);
app.use("/orderItems", orderItemRoute);
app.use("/categories", categoryRoute);
app.use("/admin", adminRoute);

// เริ่มต้นเซิร์ฟเวอร์ที่พอร์ตที่กำหนดไว้ใน .env หรือพอร์ต 3000
app.listen(port, () => {
  console.log(`✅ Server started at http://localhost:${port}`);  // แสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มต้นเสร็จ
});
