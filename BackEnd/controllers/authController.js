import argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import {nanoid} from "nanoid";

// =========================
// REGISTER USER
// =========================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    // 2. Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    // 3. Hash password using Argon2
    const hashedPassword = await argon2.hash(password);

    // 4. Create user
    const user = await prisma.user.create({
      data: {
        id: nanoid(),
        
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. Don't send password back to client
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// =========================
// LOGIN USER
// =========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Input validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Verify password
    const passwordIsValid = await argon2.verify(
      user.password,
      password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // 5. Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



// LOGOUT USER

export const logout = async (req, res) => {
  try{
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



// DELETE USER ACCOUNT


export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



// Change Password



export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 1. Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    // 2. Get logged-in user's ID from JWT
    const userId = req.user.userId;

    // 3. Find the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 4. Verify current password
    const passwordIsValid = await argon2.verify(
      user.password,
      currentPassword
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    // 5. Prevent using the same password
    const samePassword = await argon2.verify(
      user.password,
      newPassword
    );

    if (samePassword) {
      return res.status(400).json({
        message: "New password must be different from your current password",
      });
    }

    // 6. Hash the new password
    const hashedPassword = await argon2.hash(newPassword);

    // 7. Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


