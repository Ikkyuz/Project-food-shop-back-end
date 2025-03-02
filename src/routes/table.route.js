const express = require('express');
const app = express.Router();
const tableController = require('../controllers/table.controller');

app.get("/", tableController.getAllTables);
app.get("/:id", tableController.getTableById);
app.post("/", tableController.createTable);

module.exports = app;