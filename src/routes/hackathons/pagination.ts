import { HackathonInterface } from './hackathon.controller';


export function paginate(pageNumber: number, contestList: HackathonInterface[])
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
    let paginatedHackathon: HackathonInterface[] = contestList.slice((pageNumber - 1) * perPage, pageNumber * perPage);
    return {
        "maxPages" : maxPageCount,
        "contest": paginatedHackathon
    }
    // return paginatedHackathon;
}