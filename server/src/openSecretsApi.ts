import querystring from 'querystring';
import fetch from 'node-fetch';
require('dotenv').config();

const BASE_URL = "https://www.opensecrets.org/api/";
const baseParams = {
    apikey: process.env.OPEN_SECRETS_API_KEY,
    output: "json",
};

// call Open Secrets api, which takes method as a param (e.g. method=candSummary)
async function getCandidateData(cid: string, method: string) {
    const params = {
		...baseParams,
		cid,
		method,
	};
    const reqUrl = `${BASE_URL}?${querystring.stringify(params)}`;
    try {
        const response = await fetch(reqUrl);
        if (`${response.status}`[0] === "4") {
            return null;
        }
        return response.json();
    } catch(e) {
        console.log(e);
        return null;    
    }
}

export { getCandidateData };