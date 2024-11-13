import { createClient } from 'redis';
import dotenv from 'dotenv';
import { dev } from './db';

dotenv.config();

export const redisClient = createClient({
  url: dev.db.radisUrl
});


redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis...");
    await redisClient.flushAll();
  } catch (error) {
    console.error("Redis connection error:", error);
    process.exit(1);
  }
};


// const clearRedisData = async () => {
//   try {
//     await redisClient.flushAll();
//     console.log('All Redis data has been cleared.');
//   } catch (error) {
//     console.error('Error clearing Redis data:', error);
//   }
// };

// clearRedisData();

 