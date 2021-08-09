import { redisClient } from './../server';
import RateLimit from 'express-rate-limit';
import RedisStore from "rate-limit-redis";
// const RateLimit = require("express-rate-limit");
// const RedisStore = require("rate-limit-redis");

export const limiter = new (RateLimit as any)({
  store: new RedisStore({
    client: redisClient
  }),
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000,
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});
