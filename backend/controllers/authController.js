const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

async function register(req, res) {
  const { name, email, password, role = "patient", phone } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
  if (!["patient", "doctor"].includes(role)) return res.status(400).json({ message: "Public registration is only for patients and doctors" });

  const normalizedEmail = email.toLowerCase().trim();
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) return res.status(409).json({ message: "An account with this email already exists" });

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email: normalizedEmail, password: hashed, role, phone });
  return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: generateToken(user) });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email || "").toLowerCase().trim() });
  if (!user || !user.isActive || !(await bcrypt.compare(password || "", user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: generateToken(user) });
}

async function me(req, res) {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}

module.exports = { register, login, me };
