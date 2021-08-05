import { HackathonInterface } from './hackathon.controller';
import { AxiosResponse } from 'axios';
import { beforeDate } from "./DateUtil";
import axios from 'axios';

export const getDare2Compete = async (): Promise<HackathonInterface[]> => {
    let D2CData = <AxiosResponse>await axios.get("https://api.dare2compete.com/api/opportunity/search-new", {
        params: {
            opportunity: 'hackathons',
            filters: ',All,Open',
            types: 'teamsize,eligible,oppstatus'
        }
    }).catch(error => {
        console.error(error);
    })
    let Hackathons: [] = D2CData.data.data.data;
    let recentHackathons: any[] = Hackathons.filter((e: { start_date: string; }) => new Date(e.start_date) < beforeDate());
    let D2CHackathons: HackathonInterface[] = [];
    await Promise.all(
        recentHackathons.map(async({ id }: any, i: number) => {
            let compInfo = await axios.get(`https://dare2compete.com/api/public/competition/${id}`)
            let competition = compInfo.data.data.competition;
            // console.log(compInfo)
            D2CHackathons[i] = {
                name: competition.title,
                desc: competition.meta_info.description || competition.details,
                host: 'dare2compete.com',
                site: competition.web_url || competition.seo_url,
                reg_start: competition.regnRequirements.start_regn_dt,
                reg_end: competition.regnRequirements.end_regn_dt,
            };
        })
    )
    return D2CHackathons;
}