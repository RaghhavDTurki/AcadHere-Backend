const axios = require("axios")
const cleaner = require("./cleaner"); 
const CONTEST = require("./Contest_Object");
const getCompetitions = cleaner.getCompetitions;

// Headers for API
const auth = {
    headers : {"Authorization" : "ApiKey " + process.env.user + ":" + process.env.API_KEY}
};


// Get current date
let query_date = new Date();
query_date = query_date.toISOString();

// Utility Functions
const ConvertUTCtoIST = (date_string) => {
    let IST_time = new Date(Date.parse(date_string));
    IST_time = IST_time.toString();
    return IST_time;
}

const isToday = (someDate) => {
    const today = new Date()
    someDate = new Date(Date.parse(someDate));
    return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}


const isTomorrow = (someDate) => {
    const contest_Day = new Date(Date.parse(someDate));
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if(tomorrow.getDate() == contest_Day.getDate())
    {
        return true;
    }
    else return false;
}


// Get Future contests
exports.get_Contests = (req, res) => {
    axios.get(`https://clist.by/api/v2/contest/?limit=200&start__gt=${query_date}&order_by=start`,auth)
    .then(function(response){
        let data = response.data.objects;
        let contest_list = [];
        for(let i = 0; i < data.length; i++)
        {
            if(getCompetitions(data[i]))
            {
                let new_contest = Object.assign({},CONTEST);

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
        res.send(contest_list);
        console.log(contest_list.length)
    })
    .catch(err => console.error(err));
}
