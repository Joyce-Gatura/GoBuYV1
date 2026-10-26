
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not configured");

    return res.status(500).json({
      message: "Authentication service is not configured",
    });
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token is required",
    });
  }

  const token = authHeader.substring(7).trim();

  if (!token) {
    return res.status(401).json({
      message: "Authentication token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      return res.status(401).json({
        message: "Invalid token: user ID is missing",
      });
    }

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError" ||
        error.name === "NotBeforeError") {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    console.error("Authentication middleware error:", error);

    return res.status(500).json({
      message: "Authentication failed",
    });
  }
};

export default authMiddleware;
