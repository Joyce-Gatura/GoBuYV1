import prisma from "../config/prisma.js";
import { nanoid } from "nanoid";



export const createOrder = async (req, res) => {
  try {
    const {
      items,
      name,
      email,
      phone,
      deliveryAddress,
      city,
      paymentMethod,
    } = req.body;

    const userId = req.user.userId;

    // 1. Validate required fields
    if (
      !items ||
      items.length === 0 ||
      !name ||
      !email ||
      !phone ||
      !deliveryAddress ||
      !city ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "All order details are required.",
      });
    }

    // 2. Get product IDs
    const productIds = items.map((item) => item.productId);

    // 3. Get products
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    // 4. Make sure all products exist
    if (products.length !== items.length) {
      return res.status(400).json({
        message: "One or more products were not found.",
      });
    }

    let totalAmount = 0;

    const orderItems = [];

    // 5. Validate stock and calculate total
    for (const item of items) {
      const product = products.find(
        (product) => product.id === item.productId
      );

      if (!product) {
        return res.status(400).json({
          message: `Product ${item.productId} was not found.`,
        });
      }

      if (item.quantity <= 0) {
        return res.status(400).json({
          message: "Quantity must be greater than zero.",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} does not have enough stock.`,
        });
      }

      const itemTotal = Number(product.price) * item.quantity;

      totalAmount += itemTotal;

      orderItems.push({
        id: nanoid(),
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // 6. Create order as Pending
    const order = await prisma.order.create({
      data: {
        id: nanoid(),
        userId,
        name,
        email,
        phone,
        deliveryAddress,
        city,
        paymentMethod,
        totalAmount,

        status: "Pending",

        items: {
          create: orderItems,
        },
      },

      include: {
        items: true,
      },
    });

    // IMPORTANT:
    // Stock is NOT reduced here.
    // Stock will be reduced after successful M-Pesa payment.

    res.status(201).json({
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Get my orders error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};