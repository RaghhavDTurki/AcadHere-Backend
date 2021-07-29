import { Schema, model } from 'mongoose';

export interface NoticeInterface{
    Message: string;
    Post_Time: Date;
    Status: string;
}


let schema = new Schema<NoticeInterface>({
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

export const NoticeDb = model<NoticeInterface>('NoticeDB', schema);