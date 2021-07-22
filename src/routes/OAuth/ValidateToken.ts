import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library'

const CLIENT_ID:string = "443599361185-mu0cmls7b9f5bcim0at665dl78a3aqbq.apps.googleusercontent.com";
const client: OAuth2Client = new OAuth2Client(CLIENT_ID);

const validateToken = async(req: Request, res: Response): Promise<void> => {
    const token = <string>req.body.token;
    await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    })
    .then(ticket => {
        res.status(200).send('success');
    })  
    .catch(error => {
        // console.log(error);
        res.status(401).send('failure');
    }) 
}

export { validateToken }