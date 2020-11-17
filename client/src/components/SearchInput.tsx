import React, { useEffect, useState, useContext } from 'react';
import { getCandidates } from '../api';
import CandidatesContext from '../context/CandidatesContext';
import styled from 'styled-components';

const SearchInput = () => {
    const { 
        selectedCandidate,
        searchedCandidates,
        searchResultsVisible,
        setSearchedCandidates,
        setSearchResultsVisible,
        setInputFocused,
     } = useContext(CandidatesContext);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let timeout: any = null;
        const fetchCandidates = async () => {
            // timeout to limit API calls
            timeout = window.setTimeout(async () => {
                setSearchedCandidates(await getCandidates(searchQuery.trim()));
            }, 300);
        };

        fetchCandidates();

        // cancel timeout if new search query changes
        return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
    }, [searchQuery, setSearchedCandidates]);

    useEffect(() => {
        if (selectedCandidate) {
            setSearchQuery(selectedCandidate.crpName);
        }
    }, [selectedCandidate]);

    const handleFocus = () => {
        setSearchResultsVisible(true);
        setInputFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => setSearchResultsVisible(false), 200);
        setInputFocused(false);
    };

    return (
		<div>
            <Label htmlFor="search-input">Search for a 2020 candidate</Label>
			<Input
                id="search-input"
                autoComplete="off"
                spellCheck="false"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Enter a candidate's name"
                type="text"
                focusStyle={!!searchedCandidates && !!searchedCandidates.length && searchResultsVisible}
			/>
		</div>
	);
};

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #bbb;
    outline: none;
    font-size: 16px;
    margin-top: 10px;
    border-radius: ${(props: StyledInputProps) => props.focusStyle ? "8px 8px 0 0 " : "8px"};
    &:focus {
        border-color: rgb(0, 0, 255);
    }
`;

const Label = styled.label`
    font-weight: bold;
`;

interface StyledInputProps {
    focusStyle?: boolean;
}

export default SearchInput;