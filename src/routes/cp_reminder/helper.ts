import { ContestInterface } from "./Contest_Object";

export interface ClistContest {
    "id": number,
    "resource": string,
    "resource_id": number,
    "host": string,
    "event": string,
    "start": string,
    "end": string,
    "duration": number,
    "href": string
}

let SUPPORTED_WEBSITES = {
    'codeforces.com': '',
    'codechef.com':'',
    'atcoder.jp':'',
    'topcoder.com':'',
    'codingcompetitions.withgoogle.com':'',
    'facebook.com/hackercup':'',
    'leetcode.com':'',
}

export function getCompetitions(data : ClistContest) : boolean
{
    let website: string = data.resource;
    if(SUPPORTED_WEBSITES.hasOwnProperty(website))
    {
        return true;
    }
    return false;
}

export function paginate(pageNumber: number, contestList: ContestInterface[])
{
    const perPage: number = 20;
    const maxPageCount = Math.ceil(contestList.length / perPage);  
    if(pageNumber < 1)
    {
        pageNumber = 1;
    }
    
    if(pageNumber > maxPageCount)
    {
        pageNumber = maxPageCount;
    }
    let paginatedContest: ContestInterface[] = contestList.slice((pageNumber - 1) * perPage, pageNumber * perPage);
    return {
        "maxPages" : maxPageCount,
        "contest": paginatedContest
    }
    // return paginatedContest;
}

const now = new Date();

export const afterDate = () =>
  new Date(now.getFullYear(), now.getMonth(), now.getDate());

export const beforeDate = () =>
  new Date(afterDate().setDate(afterDate().getDate() + 14));

export const preserveTill = () =>
  new Date(afterDate().setDate(afterDate().getDate() - 5));
