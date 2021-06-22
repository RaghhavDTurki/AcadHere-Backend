
WEBSITE_ALLOWED_PATTERNS = {
    "codeforces.com" : [''],
    "codechef.com" : ['lunch', 'cook', 'rated'],
    'atcoder.jp' : ['abc:', 'arc:', 'agc:', 'grand', 'beginner', 'regular'],
    'topcoder.com' : ['srm', 'tco'],
    'codingcompetitions.withgoogle.com' : [''],
    'facebook.com/hackercup' : [''],
    'leetcode.com' : ['']
}

WEBSITE_DISALLOWED_PATTERNS = {
    "codeforces.com" : ['wild', 'fools', 'kotlin', 'unrated'],
    "codechef.com" : ['unrated'],
    'atcoder.jp' : [],
    'topcoder.com' : [],
    'codingcompetitions.withgoogle.com' : ['registration'],
    'facebook.com/hackercup' : [],
    'leetcode.com' : []
}

SUPPORTED_WEBSITES = {
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


function getCompetitions (data)
{
    let name = data.event.toLowerCase();
    let website = data.resource;
    if(SUPPORTED_WEBSITES.hasOwnProperty(website))
    {
        return true;
    }
    else return false;
}

module.exports = {
    getCompetitions : getCompetitions
}
