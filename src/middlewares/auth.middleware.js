// middlewares/auth.middleware.js
const authService = require('../services/auth.service');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // ดึง token จาก headers

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decoded = authService.verifyToken(token); // ยืนยัน token
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = decoded; // เพิ่มข้อมูลผู้ใช้ที่ยืนยันแล้วใน request
  next();
};

module.exports = { authenticate };