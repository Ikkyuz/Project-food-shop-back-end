const bcrypt = require('bcrypt');
const authService = require('../services/auth.service');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Register function สำหรับการสร้าง Admin ใหม่
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // เข้ารหัส password
    const hashedPassword = await bcrypt.hash(password, 10); 

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword, 
      },
    });
    res.json(admin); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login function สำหรับการยืนยันตัวตนของ Admin
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // ตรวจสอบว่า email และ password มีค่าหรือไม่
  if (!email || !password) {
    return res.status(400).json({ error: 'กรุณากรอกอีเมลและรหัสผ่าน' });
  }

  try {
    // ค้นหา Admin ตามอีเมล
    const admin = await prisma.admin.findUnique({
      where: { email: email }, // ตรวจสอบว่า email ถูกส่งไป
    });

    if (!admin) {
      return res.status(401).json({ error: 'ข้อมูลไม่ถูกต้อง' });
    }

    // เปรียบเทียบรหัสผ่าน
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
    }

    // สร้าง JWT token สำหรับการยืนยันตัวตน
    const token = authService.generateToken({ adminId: admin.id });

    res.json({ token });  // ส่ง JWT token กลับ
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};