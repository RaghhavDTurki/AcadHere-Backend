import { NextFunction, Request, Response } from "express";

const isAuthorized = async (req:Request, res: Response, next: NextFunction) => {
    const email = req.body.email as string | undefined;
    
    if(email == null || email == "")
    {
        return res.status(401).send("Unauthorised!");
    }

    const indexofAt: number = email.indexOf("@");
    
    if(indexofAt == -1)
    {
        return res.status(401).send("Unauthorised!");
    }

    const emailDomain: string = email.split("@")[1];
    if(emailDomain != "iiitkota.ac.in")
    {
        return res.status(401).send("Unauthorised!");
    }
    
    next();
}

export { isAuthorized };