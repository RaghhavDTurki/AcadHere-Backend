import { Schema, model } from 'mongoose';

interface ResourceInterface{
    Url: string
    Post_Time: Date
    Subject_Code?: string
    Message: string
    Resource_Type: string
}

let resourceSchema = new Schema<ResourceInterface>({
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

export const ResourceDB = model<ResourceInterface>('ResourceDB', resourceSchema);
 