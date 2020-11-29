export interface Candidate {
	cid: string;
	crpName: string;
	party: string;
	distIDRunFor: string;
	feccAndId: string;
}

export interface CandidateData {
	name?: string;
	party?: string;
	state?: string;
	chamber?: string;
	district?: number;
	lastUpdated?: string | null;
	cashOnHand?: number | null;
	cashSpent?: number | null;
	debt?: number | null;
	total?: number | null;
	contributors?: Contributor[];
}

export interface Contributor {
    org: string;
    total: number;
}
