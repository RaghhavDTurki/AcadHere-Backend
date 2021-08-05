import { Request, Response } from "express";
import { getDevPost } from './devpost.provider';
import { getDare2Compete } from './dare2compete.provider';
import { getCLISTHackathons } from "./clist.provider";
import { getDevFolio } from "./devfolio.provider";
import { paginate } from "./pagination";

export interface HackathonInterface{
    name: string, 
    site: string, 
    host: string, 
    reg_start: string,
    reg_end: string, 
    desc?: string,
}

export let Hackathons : {
    name: string
    site: string, 
    host: string, 
    reg_start: string,
    reg_end: string, 
    desc?: string,
}
const getAllHackathons = async () => {
    let allHackathons: HackathonInterface[] = [
        ...await(getCLISTHackathons()),
        ...await(getDevFolio()),
        ...await(getDevPost()),
        ...await(getDare2Compete())
    ]
    return allHackathons
}

export const getHackathons = async (req: Request, res: Response): Promise<void> => {
    if(!req.query.pg)
    {
        res.status(400).send("Send page number!");
        return;
    }
    getAllHackathons()
    .then(Hackathons => {
        const page = parseInt(<string>req.query.pg, 10);
        const paginatedHackathon: HackathonInterface[] = paginate(page, Hackathons);
        const limit: number = Math.ceil(Hackathons.length / 20);
        res.json({
            "maxPages" : limit,
            "contest": paginatedHackathon
        });
    })
    .catch(error => {
        console.error(error);
        res.status(500);
    })
}
