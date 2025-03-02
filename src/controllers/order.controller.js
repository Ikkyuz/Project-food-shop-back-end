/*************  ✨ Codeium Command ⭐  *************/
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllOrders = async (req, res) => {
    const orders = await prisma.order.findMany({
        include: {
            table: true,
        }
    });
    res.status(200).json(orders);
}

exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
        where: { id: id },
        include: {
            table: true,
        }
    });
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ error: "Order not found." });
    }
}

exports.createOrder = async (req, res) => {
    const { tableId } = req.body;
    const order = await prisma.order.create({
        data: {
            tableId,
        }
    });
    res.status(201).json(order);
}

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    const deletedOrder = await prisma.order.delete({
        where: { id: id }
    });
    res.status(204).send(deletedOrder);
}