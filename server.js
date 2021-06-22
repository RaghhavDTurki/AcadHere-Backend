const express = require("express");
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const connectNoticeBoardDB = require('./server/database/Notice_Board_connection')
const connectResourcesDB = require('./server/database/Resource_connection')

// Configure the Environment Variables
dotenv.config({path:"config.env"});

app.use(bodyParser.json());

// Load Router
app.use('/', require("./server/routes/router"));

// Connect to DataBase
connectNoticeBoardDB();
// connectResourcesDB();

// Setting up Port
let PORT = process.env.PORT
if(PORT == null || PORT == "")
{
    PORT = 8080;
}

app.listen(PORT,function(){
    console.log(`Server started at http://localhost:${PORT}.`);
});