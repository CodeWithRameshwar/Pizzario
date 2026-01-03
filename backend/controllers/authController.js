import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import generateToken from "../utils/generateToken.js";


export const register = async (req, res) => {
  const { name, email, password } = req.body;
   if (!name || !email || !password) return res.status(400).json({ msg: "All fields required" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    password: hashed,
    verificationToken: token
  });

  res.json({ msg: "Registered successfully. Verify your email." });
};

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//   if (!user.isVerified) return res.status(401).json({ msg: "Verify email first" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token, user });
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user._id);

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


