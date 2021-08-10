import { NextFunction, Request, Response } from "express";

declare module 'express-session' {
    interface SessionData {
        userIP: string;
    }
}

const username:string = "adminadmin";
const password: string = "password";

const adminLogin = async (req:Request, res: Response) => {
    const Username: string = req.body.username;
    const Password: string = req.body.password;
    if(Password == password && Username == username)
    {
        let token: string = req.ip; 
        // const token: string = jwt.sign({ Salt }, secret, {
        //     expiresIn: expiresIn
        // });
        req.session.userIP = token;
        res.status(200).send("ok!");
    }
    else
    {
        res.status(401).send("Unauthorised!");
        return;
    }
}

const isAdmin = async (req:Request, res: Response, next: NextFunction) => {
    if(!req.session || !req.session.userIP)
    {
        res.status(401).send("Unauthorised!");
        return;
    }
    next();
}

export { adminLogin, isAdmin }