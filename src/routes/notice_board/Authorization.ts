import { NextFunction, Request, Response } from "express";

const isAuthorized = async (req:Request, res: Response, next: NextFunction) => {
    const email = req.headers.email as string | undefined;
    
    if(email == null || email == "")
    {
        return res.status(401).send("Unauthorised!");
    }

    const indexofAt: number = email.indexOf("@");
    
    if(indexofAt == -1)
    {
        return res.status(401).send("Unauthorised!");
    }

    const domain: string = email.split("@")[1];
    if(domain != "iiitkota.ac.in")
    {
        return res.status(401).send("Unauthorised!");
    }
    
    next();
}

export { isAuthorized };