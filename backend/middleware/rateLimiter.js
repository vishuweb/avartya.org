const rateLimit = require("express-rate-limit");

// ─── Global limiter (all routes) ───────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later" },
});

// ─── Auth limiter (login endpoint) ─────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts, please try again in 15 minutes" },
  skipSuccessfulRequests: true,
});

// ─── Public form submission limiter ────────────────────────
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many submissions from this IP, please try again later" },
});

module.exports = { globalLimiter, authLimiter, formLimiter };
