import { Request, Response } from "express";
import { NoticeDb } from "../../models/NoticeSchema";
import { paginateNoticeBoard } from "./Pagination";

const createNotice = (req: Request, res: Response): void => {
    // Validate Request
    if(!req.body)
    {
        console.log(req.body);
        res.status(400).send({ message : "Content cannot be empty!"});
        return;
    }

    if(!req.body.Message && !req.body.Status && !req.body.Heading)
    {
        res.status(400).send("Please fill the required fields!");
        return;
    }
    //New Message
    let time: Date = new Date();
    const new_message = new NoticeDb({
        Heading: req.body.Heading,
        Message : req.body.Message,
        Post_time : time,
        Status : req.body.Status,
        Other: (req.body.Other)?req.body.Other:null,
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

const findNotice = async (req: Request, res: Response): Promise<void> => {
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
        if(!req.query.pg)
        {
            res.status(400).send("Send page number!");
            return;
        }
        let totalMessages:number = await NoticeDb.countDocuments();
        let maxPages: number = Math.ceil(totalMessages / 20);
        let pgNumber: number = parseInt(<string>req.query.pg, 10);
        paginateNoticeBoard(pgNumber, 20)
        .then(paginatedData => res.status(200).json({
            "maxPages" : maxPages,
            "messages": paginatedData
        }))
        .catch(error => console.error(error));
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