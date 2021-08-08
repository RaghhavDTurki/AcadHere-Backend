import { Schema, model } from 'mongoose';

export interface TimeTableInterface{
    Teacher: string,
    Subject: string,
    Time: string,
    Link: string
}


let schema = new Schema<TimeTableInterface>({
    Teacher:{
        type:String,
        required:true
    },
    Subject:{
        type:String,
        required:true
    },
    Time:{
        type:String,
        required: true
    },
    Link:{
        type:String,
        required:true,
    }
});

export const TimeTableDB = model<TimeTableInterface>('TimeTableDB', schema);