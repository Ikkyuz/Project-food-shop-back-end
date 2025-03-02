const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllCategories = async (req, res) => {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
};