const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllOrderItems = async (req, res) => {
    const orderItems = await prisma.orderItem.findMany({
        include: {
            order: {
                include: {
                    table: true
                }
            },
            menu: true
        }
    });
    res.json(orderItems);
}

exports.getOrderItemById = async (req, res) => {
    const { id } = req.params;
    const orderItem = await prisma.orderItem.findUnique({
        where: {
            id: id
        },
        include: {
            order: {
                include: {
                    table: true
                }
            },
            menu: true
        }
    });
    if (orderItem) {
        res.json(orderItem);
    } else {
        res.status(404).json({ error: "Order item not found." });
    }
}

exports.createOrderItem = async (req, res) => {
    const { menuId, orderId, quantity } = req.body;
    const orderItem = await prisma.orderItem.create({
        data: {
            orderId: parseInt(orderId),
            menuId: parseInt(menuId),
            quantity: parseInt(quantity)
        }
    });
    res.status(201).json(orderItem);
}

exports.updateOrderItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedOrderItem = await prisma.orderItem.update({
        where: {
            id: id
        },
        data: {
            quantity: parseInt(quantity)
        }
    });
    res.status(200).json(updatedOrderItem);
}

exports.deleteOrderItem = async (req, res) => {
    const { id } = req.params;
    const deletedOrderItem = await prisma.orderItem.delete({
        where: {
            id: id
       }
    });
    res.status(204).send(deletedOrderItem);
}