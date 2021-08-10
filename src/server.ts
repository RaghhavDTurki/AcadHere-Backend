import express from "express";
import ioredis from 'ioredis'
import cors from 'cors'
import dotenv from "dotenv";

const app = express();

import route from './routes/router'
import { connectNoticeBoardDB } from "./database/NoticeBoard_Connection";
import { connectResourceDB } from "./database/Resource_Connection";
import { limiter } from './middleware/rateLimiter';
import { connectTimeTableDB } from "./database/TimeTable_Connection";

// Configure the Environment Variables
dotenv.config();

app.enable('trust proxy')
app.use(cors());
app.use(limiter);
app.use(express.json());

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

app.use('/', route);

// Setting up Port
const PORT: Number = parseInt(<string>process.env.PORT, 10) || 3000;

app.listen(PORT,function(){
    console.log(`Server started at http://localhost:${PORT}.`);
});