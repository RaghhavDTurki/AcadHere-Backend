import { redisClient } from './../server';
import RateLimit from 'express-rate-limit';
import RedisStore from "rate-limit-redis";
import redis from 'redis'

export const limiter = RateLimit({
    store: new RedisStore({
        client: redis.createClient({
            host: <string>process.env.REDIS_HOST,
            port: parseInt(<string>process.env.REDIS_PORT, 10),
            password: <string>process.env.REDIS_PASSWORD
        })
    }),
    windowMs: 60 * 60 * 1000,
    max: 300,
    headers: true,
    message: "You have reached the max limit of requests in 1 hour!"
})