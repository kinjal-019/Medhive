const jwt = require("jsonwebtoken");
const Practitioner = require("../models/Practitioner");

async function protect(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Authentication required" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev-only-change-me");
    if (req.user.role === "doctor") {
      const practitioner = await Practitioner.findOne({ user: req.user.id }).select("_id");
      if (practitioner) req.user.practitionerId = practitioner._id.toString();
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
module.exports = protect;
