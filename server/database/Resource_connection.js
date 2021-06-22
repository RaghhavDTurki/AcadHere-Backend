const mongoose = require("mongoose");

const connectResourcesDB = async() =>{
    try {
        //mongodb connection string
        const con = await mongoose.connection.useDb(
            "ResourceDB",
            {
            useNewUrlParser:true,
            useFindAndModify:false,
            useUnifiedTopology:true,
            useCreateIndex:true
            })

        console.log(`MongoDB connected: ResourceDB collection connected!`)
    } catch (err) {
        console.log(err);        
        process.exit(1);
    }
}

module.exports = connectResourcesDB;