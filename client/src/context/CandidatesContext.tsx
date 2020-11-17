import { createContext, Context } from "react";
import { Candidate, CandidateData } from "../interfaces";

// default context, no data yet
const CandidatesContext: Context<ICandidatesContext> = createContext<ICandidatesContext>({
	searchedCandidates: null,
	selectedCandidate: null,
	selectedCandidateData: null,
    searchResultsVisible: false,
    inputFocused: false,
    setSearchedCandidates: () => {},
    setSelectedCandidate: () => {},
    setSelectedCandidateData: () => {},
    setSearchResultsVisible: () => {},
    setInputFocused: () => {},
});

interface ICandidatesContext {
	searchedCandidates: Candidate[] | null;
	selectedCandidate: Candidate | null;
	selectedCandidateData: CandidateData | null;
	searchResultsVisible: boolean;
	inputFocused: boolean;
	setSearchedCandidates: (candidates: Candidate[] | null) => void;
	setSelectedCandidate: (candidates: Candidate | null) => void;
	setSelectedCandidateData: (data: CandidateData | null) => void;
	setSearchResultsVisible: (visible: boolean) => void;
	setInputFocused: (focused: boolean) => void;
}

export default CandidatesContext;
