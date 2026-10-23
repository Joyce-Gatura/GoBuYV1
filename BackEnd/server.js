import express from "express";
import prisma from "./config/prisma.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import mpesaRoutes from "./routes/mpesaRoutes.js";
const app = express();
app.use(express.json())

// app.use(cors({origin: "http://localhost:5173"}))

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gobuyv1-frontend.onrender.com",
    ],
  })
);
app.use("/api/orders", orderRoutes)
app.use("/api/mpesa", mpesaRoutes)

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "GoBuy backend is running"
    });
});
app.listen(PORT, async () => {
    await prisma.$connect();
    console.log(`GoBuy server running on http://localhost:${PORT}`);
    console.log("Database connected");
});


