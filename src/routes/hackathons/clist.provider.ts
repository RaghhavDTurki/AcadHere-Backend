import axios, { AxiosResponse } from "axios";
import { auth, ConvertUTCtoIST, isToday, isTomorrow } from "../cp_reminder/cp_reminder";
import { ClistContest } from "../cp_reminder/helper";
import { beforeDate } from "./DateUtil";
import { HackathonInterface, Hackathons } from "./hackathon.controller";

let SUPPORTED_HACKATHON_WEBSITES = {
    "hackerearth.com": '',
    "ctftime.org": '',
    "kaggle.com": '',
}

function filterCLISTHackathons(data : ClistContest) : boolean
{
    let website: string = data.resource;
    if(SUPPORTED_HACKATHON_WEBSITES.hasOwnProperty(website))
    {
        return true;
    }
    return false;
}

let query_date: Date = new Date();
let query_dateToString: string = query_date.toISOString();

export async function getCLISTHackathons(): Promise<HackathonInterface[]>
{
    let hackathon_list:HackathonInterface[]  = [];
    // GET hackathons from CLIST
       
    const AxiosResponse = <AxiosResponse>await axios.get(`https://clist.by/api/v2/contest/?limit=200&start__gt=${query_dateToString}&order_by=start`,auth).catch(err => console.error(err));
    let data: ClistContest[] = AxiosResponse.data.objects;
    for(let i = 0; i < data.length; i++)
    {
        if(filterCLISTHackathons(data[i]))
        {
            if(!(new Date(data[i].start) < beforeDate())) continue;
            let new_hackathon: HackathonInterface = Object.assign({}, Hackathons);
            new_hackathon.name = data[i].event;
            new_hackathon.reg_start = data[i].start;
            new_hackathon.reg_end = data[i].end;
            new_hackathon.host = data[i].resource;
            new_hackathon.site = data[i].href;

            hackathon_list.push(new_hackathon);
        }
    }
    return hackathon_list;
} 
