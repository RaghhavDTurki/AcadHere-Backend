import express from "express";
import { SessionOptions } from 'express-session'
import { RedisStoreOptions } from 'connect-redis'
import ioredis from 'ioredis'
import cors from 'cors'
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import connectRedis from 'connect-redis'

const app = express();

import route from './routes/router'
import { connectNoticeBoardDB } from "./database/NoticeBoard_Connection";
import { connectResourceDB } from "./database/Resource_Connection";
import cookieParser from 'cookie-parser'
import { limiter } from './middleware/rateLimiter';
import { connectTimeTableDB } from "./database/TimeTable_Connection";

// Configure the Environment Variables
dotenv.config();

app.enable('trust proxy')
app.use(cors());
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
connectNoticeBoardDB();
connectResourceDB();
connectTimeTableDB();

// Set up Redis Client
export const redisClient = new ioredis({
    host: <string>process.env.REDIS_HOSTNAME,
    port: parseInt(<string>process.env.REDIS_PORT, 10),
    password: <string>process.env.REDIS_PASSWORD
});

redisClient.on('error', err => {
    console.log('Error ' + err);
});

// async function delCache(key: string) {
//     return await redisClient.del(key)
// }

const RedisStore = connectRedis(session)
app.use(session({
    secret: <string>process.env.SESSION_SECRET,
    name: <string>process.env.SESSION_NAME,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 3,    // 3 days
        httpOnly: true,
        secure: <string>process.env.NODE_ENV == 'production',
    },
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
        client: redisClient
    })
}));


app.use('/', route);

// Setting up Port
const PORT: Number = parseInt(<string>process.env.PORT, 10) || 3000;

app.listen(PORT,function(){
    console.log(`Server started at http://localhost:${PORT}.`);
});