import { HackathonInterface } from './hackathon.controller';
import axios, { AxiosResponse } from 'axios';
import cheerio from 'cheerio'
import { beforeDate } from './DateUtil';
import { decodeHTML } from 'entities';


const HTMLPartToTextPart = (HTMLPart: string) => (
    HTMLPart
      .replace(/\n/ig, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style[^>]*>/ig, '')
      .replace(/<head[^>]*>[\s\S]*?<\/head[^>]*>/ig, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script[^>]*>/ig, '')
      .replace(/<\/\s*(?:p|div)>/ig, '\n')
      .replace(/<br[^>]*\/?>/ig, '\n')
      .replace(/<[^>]*>/ig, '')
      .replace("&amp;",'&')
      .replace('&nbsp;', ' ')
      .replace(/[^\S\r\n][^\S\r\n]+/ig, ' ')
);

const getDetails = async (url: string) => {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
  
    // scrape required JSON data
    return JSON.parse(<string>$('#challenge-json-ld').html());
  };

const parseDate = (str: string) => {
    const matches = <RegExpExecArray>/^(\w{3})\s(\d{2}).*?(\d{4})/.exec(str);
    return new Date([...matches].splice(1).join(' '));
  };

export const getDevPost = async (): Promise<HackathonInterface[]> => {
    let DevPostHackathons: HackathonInterface[] = [];
    let { data } = <AxiosResponse>await axios.get("https://devpost.com/api/hackathons", {
        params: {
            challenge_type: 'online',
            order_by: 'recently-added',
            status: 'upcoming'
        }
    }).catch(error => console.error(error));
    
    let FilteredHackathons: [] = data.hackathons.filter((e: { submission_period_dates: string; }) => parseDate(e.submission_period_dates) < beforeDate());

    await Promise.all(
        FilteredHackathons.map(async (e: any, i: number) => {
            const details = await getDetails(e.url);
            DevPostHackathons[i] = {
                name: e.title,
                // desc: HTMLPartToTextPart(details.description),
                desc: HTMLPartToTextPart(decodeHTML(details.description).replace(/<[^>]+>/g, '')),
                host: 'devpost.com',
                site: e.url,
                reg_start: details.startDate,
                reg_end: details.endDate
                
            };
        })
    );
    return DevPostHackathons;
}