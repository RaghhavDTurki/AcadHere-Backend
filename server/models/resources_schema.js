const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    Url:{
        type:String,
        required:true
    },
    Post_Time:{
        type:Date,
        default:Date.now,
        required:true,
    },
    Subject_Code:{
        type:String,
        required:true
    },
    Message:{
        type:String,
        required:true
    },
    Resource_Type:{
        type:String,
        required:true
    }
});

const ResourceDB = mongoose.model('ResourceDB', schema);

module.exports = ResourceDB;