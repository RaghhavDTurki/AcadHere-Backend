import axios from "axios";
import { Request, Response } from "express";
import { ContestInterface, CONTEST } from "./Contest_Object";
import { ClistContest, getCompetitions, paginate } from "./helper";

const auth = {
    headers : {"Authorization" : "ApiKey " + process.env.user + ":" + process.env.API_KEY}
}


let query_date: Date = new Date();
let query_dateToString: string = query_date.toISOString();

const ConvertUTCtoIST = (date_string: string) : string => {
    let IST_time: Date = new Date(Date.parse(date_string));
    let IST_Time_Stringify: string = IST_time.toString();
    return IST_Time_Stringify;
}

const isToday = (someDate: string) : boolean => {
    const today: Date = new Date();
    let query_date: Date = new Date(Date.parse(someDate)); 
    return query_date.getDate() == today.getDate() &&
    query_date.getMonth() == today.getMonth() &&
    query_date.getFullYear() == today.getFullYear()
}

const isTomorrow = (someDate: string) : boolean => {
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

const getContests = (req: Request, res: Response): void => {
    if(!req.query.pg)
    {
        res.status(400).send("Send page number!");
        return;
    }
    axios.get(`https://clist.by/api/v2/contest/?limit=200&start__gt=${query_dateToString}&order_by=start`,auth)
    .then(function(response): void {
        let data: ClistContest[] = response.data.objects;
        let contest_list:ContestInterface[]  = [];
        for(let i = 0; i < data.length; i++)
        {
            if(getCompetitions(data[i]))
            {
                let new_contest: ContestInterface = Object.assign({}, CONTEST);
                new_contest.event_name = data[i].event;
                new_contest.start_time = ConvertUTCtoIST(data[i].start);
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
        const page = parseInt(<string>req.query.pg, 10);
        const paginatedContest: ContestInterface[] = paginate(page, contest_list);
        const limit: number = Math.ceil(contest_list.length / 20);
        res.json({
            "maxPages" : limit,
            "contest": paginatedContest
        });
    })
    .catch(err => console.error(err));
}
export { getContests }