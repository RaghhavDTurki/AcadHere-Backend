import { Schema, model } from 'mongoose';

export interface TimeTableInterface{
    Batch: string,
    Lab_Batch?: string | null, 
    Day: number[],
    Teacher: string,
    Subject: string,
    Time: string[],
    Start_Time: string[],
    Link: string
}


let schema = new Schema<TimeTableInterface>({
    Batch:{
        type:String,
        required:true
    },
    Lab_Batch:{
        type:String,
    },
    Day:{
        type:[Number],
        required:true
    },
    Teacher:{
        type:String,
        required:true
    },
    Subject:{
        type:String,
        required:true
    },
    Time:{
        type:[String],
        required: true
    },
    Start_Time:{
        type: [String],
        required: true
    },
    Link:{
        type:String,
        required:true,
    }
});

export const TimeTableDB = model<TimeTableInterface>('TimeTableDB', schema);