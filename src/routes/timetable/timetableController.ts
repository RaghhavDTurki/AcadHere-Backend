import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { TimeTableDB, TimeTableInterface } from './../../models/TimeTableSchema';
import { getDayAndLabBatchQuery, getDayQuery, getLabBatchQuery } from './timetableQuery';


const createSlot = (req: Request, res: Response): void => {
    // Validate Request
    if(!req.body)
    {
        console.log(req.body);
        res.status(400).send({ message : "Content cannot be empty!"});
        return;
    }

    if(!req.body.Teacher || !req.body.Link || !req.body.Time || !req.body.Subject || !req.body.Day || !req.body.Batch)
    {
        res.status(400).send("Please fill the required fields!");
        return;
    }
    //New Message
    const new_slot = new TimeTableDB({
        Batch : <string>req.body.Batch,
        Lab_Batch: (req.body.Lab_Batch)?req.body.Lab_Batch:null,
        Day : req.body.Day, 
        Teacher: <string>req.body.Teacher,
        Subject: <string>req.body.Subject,
        Time: <string>req.body.Time,
        Link: <string>req.body.Link
    })

    new_slot.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });
}

const getTimeTable = async (req: Request, res: Response): Promise<void> => {
    if(req.query.lb && req.query.day)
    {
        // Query for Lab Batch and Day
        let labBatch = <string>req.query.lb;
        let day = parseInt(<string>req.query.day, 10);
        let labBatchAndDayQueryResponse: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await getDayAndLabBatchQuery(labBatch, day);
        res.send(labBatchAndDayQueryResponse)
    }
    else if(req.query.lb)
    {
        // Query for Lab Batch Time Table
        let labBatch = <string>req.query.lb;
        let labBatchQueryResponse: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await getLabBatchQuery(labBatch)
        res.send(labBatchQueryResponse);
    }
    else if(req.query.day)
    {
        // Query Time Table for a Day
        let day = parseInt(<string>req.query.day, 10);
        let dayQueryResponse: (TimeTableInterface & Document<any, any, TimeTableInterface>)[] = await getDayQuery(day);
        res.send(dayQueryResponse);
    }
    else
    {
        res.status(400).send("Please send Lab Batch or Day!!");
    }


};

const updateTimeTable = (req: Request, res: Response): Response | void => {
    if(!req.body)
    {
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    
    const id: string = req.params.id;
    TimeTableDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data)
            {
                res.status(404).send({ message : `Cannot Update Time Table Slot with ${id}. Message not found!`})
            }
            else
            {
                res.send(data);
            }
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Error in Updating Time Table Slot!"});
    });
}

const deleteTimeTable = (req: Request, res: Response): void => {
    if(!req.params.id)
    {
        res.status(400).send({ message : "Please Enter the Table Table Slot ID to Delete!"});
    }
    else
    {
        const id: string = req.params.id;
        TimeTableDB.findByIdAndDelete(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }
            else
            {
                res.send({ message : "Message Deleted Successfully! " });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Could not delete Message with id=" + id
            });
            console.error(error);
        })
    }
};

export { createSlot, getTimeTable, updateTimeTable, deleteTimeTable }