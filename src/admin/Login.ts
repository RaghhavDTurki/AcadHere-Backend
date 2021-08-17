import { redisClient } from './../server';
import { NextFunction, Request, Response } from "express";

interface SessionEntryInterface {
    createdAt: number,
    ip_address: string 
} 

const username = <string>process.env.ADMIN_USERNAME;
const password = <string>process.env.ADMIN_PASSWORD;

const adminLogin = async (req:Request, res: Response) => {

    let token: string = req.ip; 
    let sessionKey = await redisClient.get(`rIP: ${token}`);

    const Username: string = req.body.username;
    const Password: string = req.body.password;
    if(Password == password && Username == username)
    {

        if(!sessionKey)
        {
            let sessionObject: SessionEntryInterface = {
                createdAt: Date.now(),
                ip_address: req.ip
            }
            redisClient.set(`rIP: ${req.ip}`, JSON.stringify(sessionObject), 'EX', 3600 * 24 * 3);
        }

        res.status(200).send("ok!");
    }
    else
    {
        res.status(401).send("Unauthorised!");
        return;
    }
}

const isAdmin = async (req:Request, res: Response, next: NextFunction) => {
    const ip_address = req.ip;
    const sesssionEntry = await redisClient.get(`rIP: ${ip_address}`);
    if(!sesssionEntry)
    {
        res.status(401).send("Unauthorised!");
        return;
    }

    next();
}

const AdminLogin = async (req:Request, res: Response, next: NextFunction) => {
    const ip_address = req.ip;
    const sesssionEntry = await redisClient.get(`rIP: ${ip_address}`);
    if(!sesssionEntry)
    {
        res.status(401).send("Unauthorised!");
        return;
    }

    res.status(200).send("ok");
}

export { adminLogin, isAdmin, AdminLogin }