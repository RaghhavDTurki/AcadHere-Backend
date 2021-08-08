import { redisClient } from './../../server';
import axios from "axios";
import { Request, Response } from "express";
import { ContestInterface, CONTEST } from "./Contest_Object";
import { beforeDate, ClistContest, getCompetitions, paginate } from "./helper";

export const auth = {
    headers : {"Authorization" : "ApiKey " + "RDT" + ":" + "1f31dc825bce80ce5e7d981dbca6385f59232b19"}
}

let query_date: Date = new Date();
let query_dateToString: string = query_date.toISOString();


export const isToday = (someDate: string) : boolean => {
    const today: Date = new Date();
    let query_date: Date = new Date(Date.parse(someDate)); 
    return query_date.getDate() == today.getDate() &&
    query_date.getMonth() == today.getMonth() &&
    query_date.getFullYear() == today.getFullYear()
}

export const isTomorrow = (someDate: string) : boolean => {
    const contest_Day: Date = new Date(Date.parse(someDate));
    const today: Date = new Date();
    const tomorrow: Date = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if(tomorrow.getDate() == contest_Day.getDate())
    {
        return true;
    }
    else return false;
}

const getContests = async (req: Request, res: Response): Promise<void> => {
    if(!req.query.pg)
    {
        res.status(400).send("Send page number!");
        return;
    }

    const page = parseInt(<string>req.query.pg, 10);

    // check if cached data exists
    let cacheEntry = await redisClient.get('CP-Reminder');

    // If we have a cache hit
    if(cacheEntry)
    {
        // return that entry
        let Entry: ContestInterface[] = JSON.parse(cacheEntry);
        const paginatedResponse = paginate(page, Entry)
        res.send(paginatedResponse);
        return;
    }


    // otherwise call the api for response
    axios.get(`https://clist.by/api/v2/contest/?limit=200&start__gt=${query_dateToString}&order_by=start`,auth)
    .then(function(response): void {
        let data: ClistContest[] = response.data.objects;
        let contest_list:ContestInterface[]  = [];
        for(let i = 0; i < data.length; i++)
        {
            if(getCompetitions(data[i]))
            {
                if(new Date(data[i].start) > beforeDate())continue;
                let new_contest: ContestInterface = Object.assign({}, CONTEST);
                new_contest.event_name = data[i].event;
                new_contest.start_time = data[i].start;
                new_contest.duration = data[i].duration;
                new_contest.resource_website = data[i].resource;
                new_contest.contest_url = data[i].href;

                if(isToday(new_contest.start_time))
                {
                    new_contest.status = "Today";
                }
                else if(isTomorrow(new_contest.start_time))
                {
                    new_contest.status = "Tomorrow";
                }
                else 
                {
                    new_contest.status = "Upcoming";
                }
                contest_list.push(new_contest);
            }
        }
        const paginatedResponse = paginate(page, contest_list);

        // Store key in redis cloud
        redisClient.set('CP-Reminder', JSON.stringify(contest_list), 'EX', 7200);

        res.send(paginatedResponse)
    })
    .catch(err => {
        res.sendStatus(500);
        console.error(err);
    });
}

export { getContests }