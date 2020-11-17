import React, { ReactNode, useState } from 'react';
import CandidatesContext from './CandidatesContext';
import { Candidate, CandidateData } from '../interfaces';

const CandidatesProvider = ({ children }: CandidatesProviderProps) => {
    const [searchedCandidates, setSearchedCandidates] = useState<Candidate[]|null>(null);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate|null>(null);
    const [selectedCandidateData, setSelectedCandidateData] = useState<CandidateData|null>(null);
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    return (
		<CandidatesContext.Provider
			value={{
				searchedCandidates,
				selectedCandidate,
				selectedCandidateData,
				searchResultsVisible,
				inputFocused,
				setSearchedCandidates,
				setSelectedCandidate,
				setSelectedCandidateData,
				setSearchResultsVisible,
				setInputFocused,
			}}
		>
			{children}
		</CandidatesContext.Provider>
	);
};

interface CandidatesProviderProps {
    children: ReactNode
}

export default CandidatesProvider;