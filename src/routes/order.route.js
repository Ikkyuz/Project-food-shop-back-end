const express = require('express');
const app = express.Router();
const orderController = require('../controllers/order.controller');

app.get("/", orderController.getAllOrders);
app.get("/:id", orderController.getOrderById);
app.post("/", orderController.createOrder);
app.delete("/:id", orderController.deleteOrder);


module.exports = app;