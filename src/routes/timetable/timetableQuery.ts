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
    let dayQuery: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await TimeTableDB.find({ Day: day });
    let dayQueryResponse = []
    for(let i = 0; i < dayQuery.length; i++)
    {
        let Slot = {
            Batch: dayQuery[i].Batch,
            Lab_Batch: dayQuery[i].Lab_Batch, 
            Day: day,
            Teacher: dayQuery[i].Teacher,
            Subject: dayQuery[i].Subject,
            Time: dayQuery[i].Time[dayQuery[i].Day.indexOf(day)],
            Link: dayQuery[i].Link
        }
        dayQueryResponse.push(Slot);
    }
    return dayQueryResponse;
}

export async function getDayAndLabBatchQuery(labBatch: string, day: number)
{
    let batchAndDayQueryResponse: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await TimeTableDB.find({ Batch: labBatch[0], Lab_Batch: null, Day: day })
    let labBatchQueryResponse: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await TimeTableDB.find({ Batch: labBatch[0], Lab_Batch: labBatch, Day: day })
    batchAndDayQueryResponse.push(...labBatchQueryResponse);
    let result = [];
    for(let i = 0; i < batchAndDayQueryResponse.length; i++)
    {
        let Slot = {
            Batch: batchAndDayQueryResponse[i].Batch,
            Lab_Batch: batchAndDayQueryResponse[i].Lab_Batch, 
            Day: day,
            Teacher: batchAndDayQueryResponse[i].Teacher,
            Subject: batchAndDayQueryResponse[i].Subject,
            Time: batchAndDayQueryResponse[i].Time[batchAndDayQueryResponse[i].Day.indexOf(day)],
            Link: batchAndDayQueryResponse[i].Link
        }
        result.push(Slot);
    }
    return result;
}