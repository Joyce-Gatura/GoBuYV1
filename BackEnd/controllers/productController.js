import prisma from "../config/prisma.js";
import { nanoid } from "nanoid";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      category,
      description,
      stock,
      featured,
    } = req.body;

    if (!name || price === undefined || !image || !category) {
      return res.status(400).json({
        message: "Name, price, image and category are required.",
        error: error.message
      });
    }

    const product = await prisma.product.create({
      data: {
        id: nanoid(),
        name,
        price,
        image,
        category,
        description,
        stock: stock ?? 0,
        featured: featured===true || featured==="true" ,
      }
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      message: "Failed to create product",
      error: error.message
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Get products error:", error);

    return res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        featured: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching featured products:", error);

    res.status(500).json({
      message: "Failed to fetch featured products",
    });
  }
};