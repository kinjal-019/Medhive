const test = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

test("generates a JWT containing user identity and role", () => {
  const token = generateToken({ _id: "abc123", email: "doctor@example.com", role: "doctor" });
  const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-only-change-me");
  assert.equal(payload.id, "abc123");
  assert.equal(payload.role, "doctor");
  assert.equal(payload.email, "doctor@example.com");
});
