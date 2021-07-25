import { Request, Response } from "express";
import { NoticeDb } from "../../models/NoticeSchema";

const createNotice = (req: Request, res: Response): void => {
    // Validate Request
    if(!req.body)
    {
        console.log(req.body);
        res.status(400).send({ message : "Content cannot be empty!"});
        return;
    }

    //New Message
    let time: Date = new Date();
    const new_message = new NoticeDb({
        Message : req.body.Message,
        Post_time : time,
        Status : req.body.Status,
    })

    new_message.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });
}

const findNotice = (req: Request, res: Response): void => {
    if(req.query.id)
    {
        const id = <string>req.query.id;
        NoticeDb.findById(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message : "No message found with id "+ id});
            }
            else
            {
                res.send(data);
            }
        });
    }
    else
    {
        NoticeDb.find()
        .then(messages => {
            res.send(messages);
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving messages" });
        })
    }
};

const updateNotice = (req: Request, res: Response): Response | void => {
    if(!req.body)
    {
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    
    const id: string = req.params.id;
    req.body.Post_time = Date.now;
    NoticeDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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

const deleteNotice = (req: Request, res: Response): void => {
    if(!req.params.id)
    {
        res.status(400).send({ message : "Please Enter the Message ID to Delete!"});
    }
    else
    {
        const id: string = req.params.id;
        NoticeDb.findByIdAndDelete(id)
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
        })
    }
};

export { createNotice, findNotice, updateNotice, deleteNotice };