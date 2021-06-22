const mongoose = require("mongoose");

const connectNoticeBoardDB = async() =>{
    try {
        //mongodb connection string
        const con = await mongoose.connect(
            process.env.MONGO_URI_NOTICE_BOARD,
            {
            useNewUrlParser:true,
            useFindAndModify:false,
            useUnifiedTopology:true,
            useCreateIndex:true
            })

        console.log(`MongoDB connected: ${con.connection.host}`)
    } catch (err) {
        console.log(err);        
        process.exit(1);
    }
}

module.exports = connectNoticeBoardDB