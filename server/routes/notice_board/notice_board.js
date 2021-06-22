const NoticeDb = require("../../models/notice_schema");


// Create a new Message for the Notice Board
exports.create = (req,res) => {
    // Validate Request
    if(!req.body)
    {
        console.log(req.body);
        res.status(400).send({ message : "Content cannot be empty!"});
        return;
    }

    //New Message
    let time = new Date();
    const new_message = new NoticeDb({
        Message : req.body.Message,
        Post_time : time,
        Status : req.body.Status,
    })

    new_message.save(new_message)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });
};



// Get all messages or Get a single message
exports.find = (req,res) => {
    if(req.query.id)
    {   
        const id = req.query.id;
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
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" });
            });
    }
};



// Update/Patch a Single Message
exports.update = (req, res) => {
    if(!req.body)
    {
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    
    const id = req.params.id;
    req.body.Post_time = Date.now;
    // console.log(req)
    NoticeDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message : `Cannot Update Message with ${id}. Maybe Message not found!`})
            }
            else
            {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error in Updating Message!"});
        });
};


// Delete a Single Message
exports.delete = (req,res) => {
    if(!req.params.id)
    {
        return res
            .status(400)
            .send({ message : "Please Enter the Message ID to Delete!"});
    }
    else
    {
        const id = req.params.id;
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
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Message with id=" + id
                });
            });
    }
};