import { Schema, model } from 'mongoose';

export interface NoticeInterface{
    Heading: string,
    Message: string;
    Link?: string,
    Other?: string,
    Post_Time: Date;
    Status: string;
}


let schema = new Schema<NoticeInterface>({
    Heading:{
        type:String,
        required:true
    },
    Message:{
        type:String,
        required:true
    },
    Link:{
        type:String,
    },
    Other:{
        type:String,
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