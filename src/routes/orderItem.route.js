const express = require('express');
const app = express.Router();
const orderItemController = require('../controllers/orderItem.controller');

app.get("/", orderItemController.getAllOrderItems);
app.get("/:id", orderItemController.getOrderItemById);
app.post("/", orderItemController.createOrderItem);
app.put("/:id", orderItemController.updateOrderItem);
app.delete("/:id", orderItemController.deleteOrderItem);

module.exports = app;
