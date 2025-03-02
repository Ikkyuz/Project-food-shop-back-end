const express = require('express');
const app = express.Router();
const adminController = require('../controllers/admin.controller');

app.post("/register", adminController.register);
app.post("/login", adminController.login);

module.exports = app;