import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { TimeTableDB, TimeTableInterface } from './../../models/TimeTableSchema';

export async function getLabBatchQuery(labBatch: string)
{
    let batchQueryResponse: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await TimeTableDB.find({ Batch: labBatch[0], Lab_Batch: null })
    let labBatchQueryResponse: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await TimeTableDB.find({ Batch: labBatch[0], Lab_Batch: labBatch })
    batchQueryResponse.push(...labBatchQueryResponse)
    return batchQueryResponse;
}

export async function getDayQuery(day: number)
{
    let dayQueryResponse: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await TimeTableDB.find({ Day: day });
    return dayQueryResponse
}

export async function getDayAndLabBatchQuery(labBatch: string, day: number)
{
    let batchAndDayQueryResponse: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await TimeTableDB.find({ Batch: labBatch[0], Lab_Batch: null, Day: day })
    let labBatchQueryResponse: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await TimeTableDB.find({ Batch: labBatch[0], Lab_Batch: labBatch, Day: day })
    batchAndDayQueryResponse.push(...labBatchQueryResponse)
    return batchAndDayQueryResponse;
}