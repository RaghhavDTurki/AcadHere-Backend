import express from "express";
import ioredis from 'ioredis'
const app = express();
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectNoticeBoardDB } from "./database/NoticeBoard_Connection";
import { connectResourceDB } from "./database/Resource_Connection";
import cookieParser from 'cookie-parser'
import route from './routes/router'

// Configure the Environment Variables
dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', route);
connectNoticeBoardDB();
connectResourceDB();

// Set up Redis Client
export const redisClient = new ioredis({
    host: <string>process.env.REDIS_HOSTNAME,
    port: parseInt(<string>process.env.REDIS_PORT, 10),
    password: <string>process.env.REDIS_PASSWORD,

});

redisClient.on('error', err => {
    console.log('Error ' + err);
});

// async function delCache(key: string) {
//     return await redisClient.del(key);
// }

// Setting up Port
const PORT: Number = parseInt(<string>process.env.PORT, 10) || 3000;

app.listen(PORT,function(){
    console.log(`Server started at http://localhost:${PORT}.`);
});