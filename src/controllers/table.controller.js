const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllTables = async (req, res) => {
  const tables = await prisma.table.findMany();
  res.status(200).json(tables);
};

exports.getTableById = async (req, res) => {
  const { id } = req.params;
  const table = await prisma.table.findUnique({
    where: { id: id },
  });
  if (table) {
    res.json(table);
  } else {
    res.status(404).json({ error: "Table not found." });
  }
};

exports.createTable = async (req, res) => {
  const { number } = req.body;
  const table = await prisma.table.create({ data: { number } });
  res.status(201).json(table);
};