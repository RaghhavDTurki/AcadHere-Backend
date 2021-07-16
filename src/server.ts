import express from "express";

const app = express();
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectNoticeBoardDB } from "./database/dbConnection/NoticeBoard_Connection";
import { connectResourceDB } from "./database/dbConnection/Resource_Connection";
import route from './routes/router'

// Configure the Environment Variables
dotenv.config({path:"config.env"});

app.use(bodyParser.json());

app.use('/', route);
connectNoticeBoardDB();
connectResourceDB();

// Setting up Port
const PORT: Number = parseInt(<string>process.env.PORT, 10) || 3000;

app.listen(PORT,function(){
    console.log(`Server started at http://localhost:${PORT}.`);
});