


// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   try {
//     // Get the Authorization header
//     const authHeader = req.headers.authorization;

//     // Check whether token was provided
//     if (!authHeader) {
//       return res.status(401).json({
//         message: "Authentication token is required",
//       });
//     }

//     // Expected format: Bearer TOKEN
//     if (!authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Invalid authentication format",
//       });
//     }

//     // Extract token
//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         message: "Authentication token is missing",
//       });
//     }

//     // Verify JWT
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     // Store authenticated user's information
//     req.user = decoded;

//     // Continue to protected route
//     next();

//   } catch (error) {
//     console.error("Authentication error:", error);

//     return res.status(401).json({
//       message: "Invalid or expired token",
//     });
//   }
// };

// export default authMiddleware;


import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Authentication token is required",
      });
    }

    // Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authentication format",
      });
    }

    // Extract token
    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        message: "Authentication token is missing",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure userId exists in the token
    if (!decoded.userId) {
      return res.status(401).json({
        message: "Invalid token: user ID is missing",
      });
    }

    // Store authenticated user
    req.user = {
      userId: decoded.userId,
    };

    console.log("Authenticated user:", req.user);

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;