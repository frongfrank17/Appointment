// /utils/redis.js
const { redisClient} = require('../database/redis');

redisClient.on('error', (err) => console.error('Redis error:', err));
//redisClient.connect();
//redisClient.on('error', (err) => console.error('Redis error:', err));

async function reserveSlot(redisKey , book) {
    if (!redisClient.isOpen) {
        await redisClient.connect();
      }
    await redisClient.exists(redisKey).then(
         async () => {
          await redisClient.SET(redisKey , JSON.stringify(book))
          return  true
    } 
    ).catch(err => {
        return false
    } )
        
  }
  
  module.exports = { redisClient, reserveSlot };
  