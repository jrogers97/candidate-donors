import axios from 'axios';

const ENDPOINT = "http://localhost:5000";

async function getCandidates(searchQuery: string) {
    if (!searchQuery) {
        return null;
    }
    const response = await axios.get(`${ENDPOINT}/candidates`, { params: { name: searchQuery } });
    return response.data;
};

async function getCandidateSummary(cid: string) {
    if (!cid) {
        return null;
    }
    const response = await axios.get(`${ENDPOINT}/summary`, { params: { cid }});
    if (response && response.data && response.data.response 
        && response.data.response.summary && response.data.response.summary["@attributes"]) {
        return response.data.response.summary["@attributes"];
    }
    return null;
}

async function getCandidateContributors(cid: string) {
    if (!cid) {
        return null;
    }
    const response = await axios.get(`${ENDPOINT}/contributors`, { params: { cid }});
    const output: {attributes?: any, contributors?: any} = {};
    if (response && response.data && response.data.response && response.data.response.contributors) {
        if (response.data.response.contributors["@attributes"]) {
            output["attributes"] = response.data.response.contributors["@attributes"];
        }
        if (response.data.response.contributors["contributor"]) {
            output["contributors"] = response.data.response.contributors["contributor"];
        }
        return output;
    }
    return null;
}

async function getAllCandidateData(cid: string) {
    const [summary, contributors] = await Promise.all([
        getCandidateSummary(cid),
        getCandidateContributors(cid),
    ]);
    return { summary, contributors };
}

export { getCandidates, getAllCandidateData };