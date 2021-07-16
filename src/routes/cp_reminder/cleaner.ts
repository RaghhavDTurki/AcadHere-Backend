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
    // devfolio
    // hackerearth
}

export function getCompetitions(data : ClistContest) : boolean
{
    let name: string = data.event;
    let website: string = data.resource;
    if(SUPPORTED_WEBSITES.hasOwnProperty(website))
    {
        return true;
    }
    return false;
}
