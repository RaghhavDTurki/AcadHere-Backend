import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'acadhereapp@gmail.com',
        pass: 'herokuBackend@kota200'
    }
});

export const sendMail = (req: Request, res: Response) => {
    if(!req.body.name || !req.body.email || !req.body.phone || !req.body.message)
    {
        res.status(400).send("Fill in the required fields!");
        return;
    }

    let heading: string = `Message from ${req.body.name}`; 
    let message: string = <string>req.body.message + `\nLocation: ${req.body.location}` + `\nPhone: ${req.body.phone}`;
    
    let mailOptions = {
        from : 'acadhereapp@gmail.com',
        to: '2020kucp1065@iiitkota.ac.in,2020kucp1023@iiitkota.ac.in,2020kucp1096@iiitkota.ac.in,2020kucp1138@iiitkota.ac.in,2020kucp1094iiitkota.ac.in',
        subject: heading,
        text: message
    }
    transport.sendMail(mailOptions, function(error, data){
        if(error)
        {
            res.status(500).send(error);
            console.error(error);
        }
        else
        {
            res.status(200).send("Email sent succesfully!");
        }
    })
}