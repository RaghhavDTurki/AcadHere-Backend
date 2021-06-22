const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    Message:{
        type:String,
        required:true
    },
    Post_Time:{
        type:Date,
        default:Date.now,
        required:true,
    },
    Status:{
        type:String,
        required:true,
    }
});


const NoticeDb = mongoose.model('NoticeDB',schema);

module.exports = NoticeDb;