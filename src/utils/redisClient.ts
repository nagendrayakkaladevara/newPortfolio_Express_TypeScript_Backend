import Redis from "ioredis";

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD, // Required for authentication
    tls: { rejectUnauthorized: false } // Enable secure TLS connection
});

redisClient.on("connect", () => {
    console.log("✅ Connected to Redis successfully!");
});

redisClient.on("error", (err) => {
    console.error("🚨 Redis Connection Error:", err);
});

export default redisClient;
