import Admin from "../models/adminModel.js";
import generateToken from "../middleswares/Token.js";
import bcrypt from "bcryptjs";

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword
    });

    const token = generateToken(newAdmin);

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
};




export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin);

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
};


export const adminLogout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully. Remove token on client side."
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
