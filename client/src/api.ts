import axios from 'axios';
import { Candidate, CandidateData, Contributor } from './interfaces';

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
    if (response && response.data && response.data.response) {
        const parsed = JSON.parse(JSON.stringify(response.data.response).replace(/@attributes/g, "attributes"));
        if (parsed && parsed.summary && parsed.summary.attributes) {
            return parsed.summary.attributes;
        }
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
        const parsed = JSON.parse(JSON.stringify(response.data.response.contributors).replace(/@attributes/g, "attributes"));
        if (parsed.attributes) {
            output["attributes"] = parsed.attributes;
        }
        if (response.data.response.contributors.contributor) {
            output["contributors"] = parsed.contributor;
        }
        return output;
    }
    return null;
}

async function getAllCandidateData(candidate: Candidate): Promise<CandidateData> {
    const [summary, contributors] = await Promise.all([
        getCandidateSummary(candidate.cid),
        getCandidateContributors(candidate.cid),
    ]);
    return buildCandidateData(candidate, summary, contributors);
}

function buildCandidateData(candidate: Candidate, summary: any, contributors: any) {
    const data: CandidateData = {};

    data.name = candidate.crpName;
    data.party = parseCandidateParty(candidate.party);

    const {state, chamber, district} = parseCandidateLocation(candidate.distIDRunFor);
    data.chamber = chamber;
    data.state = state || undefined;
    data.district = district ? Number(district) : undefined;

    if (summary) {
        data.cashOnHand = summary.cash_on_hand !== "" ? Number(summary.cash_on_hand) : null;
        data.cashSpent = summary.cash_spent !== "" ? Number(summary.spent) : null;
        data.debt = summary.debt !== "" ? Number(summary.debt) : null;
        data.total = summary.total !== "" ? Number(summary.total) : null;
        data.lastUpdated = summary.last_updated || null;
    }
    if (contributors) {
        data.contributors = buildContributors(contributors);
    }
    return data;
}

function buildContributors(contributors: any): Contributor[] {
    if (contributors.contributors && contributors.contributors.length) {
        return contributors.contributors.map((contributor: any): Contributor => {
            return {
				org: contributor.attributes.org_name,
				total: contributor.attributes.total,
			};
        });
    }
    return [];
}

function parseCandidateLocation(loc: string): CandidateLocation {
	const state = loc.slice(0, 2);
    const districtOrSeat = loc.slice(2);
    let chamber;
    if (districtOrSeat === "S1" || districtOrSeat === "S2") {
        chamber = "Senate";
    } else if (loc === "PRES") {
        chamber = "President";
    } else {
        chamber = "House";
    }

	return {
		chamber,
		state: chamber !== "President" ? state : null,
		district: chamber === "House" ? districtOrSeat : null,
	};
}

function parseCandidateParty(party: string): string {
    switch(party) {
        case "D":
            return "Democratic";
        case "R":
            return "Republican";
        case "I":
            return "Independent";
        case "3":
            return "3rd Party";
        case "L":
            return "Libertarian";
        default:
            return "Unknown";
    }
}

interface CandidateLocation {
    chamber: string;
    state: string|null;
    district: string|null;
}

export { getCandidates, getAllCandidateData };