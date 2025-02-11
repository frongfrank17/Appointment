// /utils/redis.js
const redis = require('redis');
const configs = require('../configs/index')
const redisClient = redis.createClient();

redisClient.on('error', (err) => console.error('Redis error:', err));

async function storeSession(accessToken, refreshToken) {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  const expiryTime = configs.setting.Authorization.REFR_KEY_T; // Expiry time in milliseconds (60 seconds)
  await redisClient.set(accessToken, refreshToken, 'PX', expiryTime);
}

async function getSession(accessToken) {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return await redisClient.get(accessToken);
}

async function deleteSession(accessToken) {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  await redisClient.del(accessToken);
}

module.exports = { storeSession, getSession, deleteSession };
