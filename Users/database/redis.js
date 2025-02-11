// /database/redis.js
const redis = require('redis');
const config = require('../configs/index');

// Configure the Redis client
const redisClient = redis.createClient({

  socket: { host: config.setting.redis.REDIS_HOST, port: config.setting.redis.REDIS_PORT },
  password: config.setting.redis.REDIS_PASSWORD || undefined,
});

// Handle Redis connection events
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.log(config.setting.redis.REDIS_HOST)
  console.error('Redis error:', err);
});

async function connectRedis() {
  try {
    await redisClient.connect()// Redis client now supports async connect
    console.log('Redis connection established');
  } catch (error) {
    console.error('Failed to connect to Redis:', error.message);
    process.exit(1);
  }
}

async function disconnectRedis() {
  await redisClient.quit();
  console.log('Redis connection closed');
}

module.exports = { redisClient, connectRedis, disconnectRedis };
