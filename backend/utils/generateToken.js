const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role, email: user.email },
    process.env.JWT_SECRET || "dev-only-change-me",
    { expiresIn: "7d" }
  );
}

module.exports = generateToken;
