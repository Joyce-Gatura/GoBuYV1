import prisma from "../config/prisma.js";

// Get currently authenticated user's profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile retrieved successfully",
      user,
    });

  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};