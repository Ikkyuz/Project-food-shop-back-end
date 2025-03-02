const express = require('express');
const app = express.Router();
const menuController = require('../controllers/menu.controller');
const authMiddleware = require('../middlewares/auth.middleware');

app.get("/", menuController.getAllMenus);
app.get("/:id", menuController.getMenuById);
app.post("/", menuController.createMenu);
app.put("/:id", menuController.updateMenu);
app.delete("/:id", menuController.deleteMenu);


module.exports = app;