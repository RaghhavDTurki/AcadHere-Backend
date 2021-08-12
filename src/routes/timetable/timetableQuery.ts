import { Document } from 'mongoose';
import { TimeTableDB, TimeTableInterface } from './../../models/TimeTableSchema';

interface SlotInterface{
    Batch: string, 
    Lab_Batch: string, 
    Day: number,
    Teacher: string, 
    Subject: string,
    Time: string,
    Start_Time: string, 
    Link: string
}

function compare(ObjA: SlotInterface, ObjB: SlotInterface)
{
    if( ObjA.Start_Time < ObjB.Start_Time ){
        return -1;
      }
    if ( ObjA.Start_Time > ObjB.Start_Time ){
    return 1;
    }
    return 0;
}

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
        let Slot: SlotInterface = {
            Batch: dayQuery[i].Batch,
            Lab_Batch: <string>dayQuery[i].Lab_Batch, 
            Day: day,
            Teacher: dayQuery[i].Teacher,
            Subject: dayQuery[i].Subject,
            Time: dayQuery[i].Time[dayQuery[i].Day.indexOf(day)],
            Start_Time: dayQuery[i].Start_Time[dayQuery[i].Day.indexOf(day)],
            Link: dayQuery[i].Link
        }
        dayQueryResponse.push(Slot);
    }
    dayQueryResponse.sort(compare);
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
        let Slot:SlotInterface = {
            Batch: batchAndDayQueryResponse[i].Batch,
            Lab_Batch: <string>batchAndDayQueryResponse[i].Lab_Batch, 
            Day: day,
            Teacher: batchAndDayQueryResponse[i].Teacher,
            Subject: batchAndDayQueryResponse[i].Subject,
            Start_Time: batchAndDayQueryResponse[i].Start_Time[batchAndDayQueryResponse[i].Day.indexOf(day)],
            Time: batchAndDayQueryResponse[i].Time[batchAndDayQueryResponse[i].Day.indexOf(day)],
            Link: batchAndDayQueryResponse[i].Link
        }
        result.push(Slot);
    }
    result.sort(compare)
    return result;
}