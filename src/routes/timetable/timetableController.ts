import { Request, Response } from 'express';
import { TimeTableDB } from './../../models/TimeTableSchema';



const createSlot = (req: Request, res: Response): void => {
    // Validate Request
    if(!req.body)
    {
        console.log(req.body);
        res.status(400).send({ message : "Content cannot be empty!"});
        return;
    }

    if(!req.body.Teacher || !req.body.Link || !req.body.Time || !req.body.Subject)
    {
        res.status(400).send("Please fill the required fields!");
        return;
    }
    //New Message
    const new_slot = new TimeTableDB({
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
    if(req.query.id)
    {
        const id = <string>req.query.id;
        TimeTableDB.findById(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message : "No Class found with id "+ id});
            }
            else
            {
                res.send(data);
            }
        });
    }
    else
    {   
        TimeTableDB.find()
        .then(TimeTable => {
            res.send(TimeTable);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        })
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
                res.status(404).send({ message : `Cannot Update Message with ${id}. Message not found!`})
            }
            else
            {
                res.send(data);
            }
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Error in Updating Message!"});
    });
}

const deleteTimeTable = (req: Request, res: Response): void => {
    if(!req.params.id)
    {
        res.status(400).send({ message : "Please Enter the Message ID to Delete!"});
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