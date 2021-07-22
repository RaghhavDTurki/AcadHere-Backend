import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const username:string = "adminadmin";
const password: string = "password";
const secret: string = 'kajsb%yhsuyh19872hN7y&Y&*Y!!BT!*TBR^[}&(:"KHY';
const expiresIn: number = 3 * 24 * 60 * 60;

const adminLogin = async (req:Request, res: Response) => {
    const Username: string = req.body.username;
    const Password: string = req.body.password;
    if(Password == password && Username == username)
    {
        let randomSalt: string = await bcrypt.genSalt(10);
        const token: string = jwt.sign({ randomSalt }, secret, {
            expiresIn: expiresIn
        });
        res.cookie('jwt', token), {
            httpOnly: true, 
            maxAge: expiresIn * 1000
        };
        res.status(200).send("ok!");
    }
    else
    {
        res.status(401).send("Unauthorised!");
        return;
    }
}

const isAdmin = async (req:Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.jwt;

    // check if token exists and is valid
    if(token)
    {
        jwt.verify(token, secret, (error: jwt.VerifyErrors | null, decodedToken: jwt.JwtPayload | undefined) => {
            if(error)
            {
                res.status(401).send("Unauthorised!");
                return;
            }
            else
            {
                next();
            }
        })
    }
    else
    {
        res.status(401).send("Unauthorised!");
        return;
    }
}

export { adminLogin, isAdmin }