import { redisClient } from './../../server';
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
    const page = parseInt(<string>req.query.pg, 10);
    
    // Check if cached data exists 
    let cacheEntry = await redisClient.get('Hackathons')

    // If we have a cache hit
    if(cacheEntry)
    {
        // return that entry
        let Entry: HackathonInterface[] = JSON.parse(cacheEntry);
        const paginatedResponse = paginate(page, Entry)
        res.send(paginatedResponse);
        return;
    }
    
    // Otherwise get data from api
    getAllHackathons()
    .then(Hackathons => {
        const paginatedResponse = paginate(page, Hackathons);

        // Enter key in cache
        redisClient.set('Hackathons', JSON.stringify(Hackathons), 'EX', 7200);
        res.send(paginatedResponse);
    })
    .catch(error => {
        console.error(error);
        res.status(500);
    })
}
