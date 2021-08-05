import { HackathonInterface } from './hackathon.controller';
import axios from "axios";
import { beforeDate } from "./DateUtil";


export const getDevFolio = async (): Promise<HackathonInterface[]> => {
    let DevFolioHackathons: HackathonInterface[] = [];
    await axios.get('https://devfolio.co/api/hackathons', {
        params : {
            filter: 'application_open',
            page: 1,
            limit: 20
        }
    })
    .then(devfolioHackathon => {
        for(let i = 0; i < devfolioHackathon.data.result.length; i++)
        {
            let hs = devfolioHackathon.data.result[i].hackathon_setting;
            let Name = devfolioHackathon.data.result[i].name;
            let Site = hs.site || `https://${devfolioHackathon.data.result[0].hackathon_setting.subdomain}.devfolio.co`
            let Desc = devfolioHackathon.data.result[i].desc;
            let Reg_Start = hs.reg_starts_at;
            let Reg_End = hs.reg_ends_at;
            if(new Date(Reg_End) < beforeDate()) continue;
            let Hackathon: HackathonInterface = {
                name: Name,
                site: Site, 
                desc: Desc,
                reg_start: Reg_Start,
                reg_end: Reg_End,
                host: 'devfolio.co'
            }
            DevFolioHackathons.push(Hackathon);
        }

    })
    .catch(err => console.error(err));
    return DevFolioHackathons;
}