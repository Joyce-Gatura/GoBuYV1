import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import { createProduct,
    getProducts,
    getFeaturedProducts

 } from "../controllers/productController.js";

const router = express.Router();

router.post("/", authMiddleware, createProduct);
router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);
export default router;