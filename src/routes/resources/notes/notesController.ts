import { Request, Response } from "express";
import { ResourceDB } from "../../../database/models/ResourceSchema";

// Post a Notes Resource
const createNotes = (req: Request,res: Response): void | undefined => {
    // Validate Request
    if(!req.body)
    {
        console.log(req.body);
        res.status(400).send({ message : "Content cannot be empty!"});
        return;
    }

    // Check if content type is Notes
    if(req.body.Resource_Type != "Notes")
    {
        res.status(400).send({ message : "Content type should be Notes!"});
        return;
    }

    //New Resource
    let time: Date = new Date();
    const new_resource = new ResourceDB({
        Url: req.body.Url,
        Subject_Code : req.body.Subject_Code,
        Message : req.body.Message,
        Post_time : time,
        Resource_Type : req.body.Resource_Type,
    })

    new_resource.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });
};

// Get all Notes resources or a specific one
const findNotes = (req: Request,res: Response): void | undefined => {
    if(req.query.id)
    {   
        const id = <string>req.query.id;
        ResourceDB.findById(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message : "No resource found with id "+ id});
            }
            else
            {
                if(data.Resource_Type != "Notes")
                {   
                    res.status(400).send({ message : "Content type should be Notes!"});
                    return;
                }   
                res.send(data);
            }
        });
    }
    else
    {
        ResourceDB.find({ Resource_Type : 'Notes' })
        .then(resources => {
            res.send(resources);
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving resource information" });
        });
    }
};

// Update/Patch a Single Notes Resource
const updateNotes = (req: Request, res: Response): Response | void => {
    if(!req.body)
    {
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    
    const id = <string>req.params.id;

    ResourceDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data)
        {
            res.status(404).send({ message : `Cannot Update Resource with ${id}. Maybe Resource not found!`})
        }
        else
        {
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Error in Updating Resource!"});
    });
};

// Delete a notes Resource
const deleteNotes = (req: Request,res: Response): Response | void => {
    if(!req.params.id)
    {
        return res
            .status(400)
            .send({ message : "Please Enter the Notes ID to Delete!"});
    }
    else
    {
        const id = <string>req.params.id;
        
        ResourceDB.findByIdAndDelete(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }
            else
            {
                res.send({ message : "Notes Resource Deleted Successfully! " });
            }
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error in Deleting Resource!"});
        });
    }
};

export { createNotes,findNotes, updateNotes, deleteNotes };