import { redisClient } from './../server';
import rateLimter from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

export const rateLimiterUsingThirdParty = rateLimter({
    store: new RedisStore({
        client: redisClient
    }),
    max: 300,
    windowMs: 60 * 60 * 1000,   // 1 hour in milliseconds
    headers: true,
    message: 'You have exceeded the 100 requests in 1 hr limit!', 
})