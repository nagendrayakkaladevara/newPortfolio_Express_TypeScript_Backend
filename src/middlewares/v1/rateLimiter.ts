import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per `windowMs`
  // message: { message: "You've made too many requests from this IP.Please try again later🙂." },
  message: { message: "Too many requests, please try again later🙂." },
  headers: true, // Send RateLimit headers in the response
  standardHeaders: "draft-7", // Use standard rate limit headers
  legacyHeaders: false, // Disable deprecated headers
});
