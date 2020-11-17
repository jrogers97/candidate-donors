import React, { useContext, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getAllCandidateData } from "../api";
import CandidatesContext from "../context/CandidatesContext";
import { Candidate } from "../interfaces";

const MAX_CANDS = 7;

const SearchResults = () => {
    const { 
        searchedCandidates: cands, 
        searchResultsVisible,
        inputFocused,
        setSearchResultsVisible,
        setSelectedCandidate,
        setSelectedCandidateData
    } = useContext(CandidatesContext);

    const [focusedCandidateIdx, setFocusedCandidateIdx] = useState(0); 

     const handleCandidateClick = useCallback(async (candidate: Candidate) => {
        // remove existing candidate data and await new candidate data
        setSearchResultsVisible(false); 
        setSelectedCandidateData(null);
        setSelectedCandidate(candidate);
        setSelectedCandidateData(await getAllCandidateData(candidate.cid));
    }, [setSelectedCandidate, setSelectedCandidateData, setSearchResultsVisible]);

    useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// bind listener to move up and down search results
			if (searchResultsVisible && cands?.length) {
				if (e.keyCode === 38) {
					// UP ARROW
					e.preventDefault();
					setFocusedCandidateIdx((prev) => Math.max(prev - 1, 0));
				} else if (e.keyCode === 40) {
					// DOWN ARROW
					e.preventDefault();
					setFocusedCandidateIdx((prev) =>
						Math.min(
							prev + 1,
							Math.min(cands.length - 1, MAX_CANDS)
						)
					);
				} else if (e.keyCode === 27) {
					// ESC
					e.preventDefault();
					setSearchResultsVisible(false);
				} else if (e.keyCode === 13) {
					// ENTER
					e.preventDefault();
					handleCandidateClick(cands[focusedCandidateIdx]);
				}
			}

			// re-open results on key press (except ESC)
			if (!searchResultsVisible && inputFocused && e.keyCode !== 27) {
				setSearchResultsVisible(true);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [
		searchResultsVisible,
		setSearchResultsVisible,
		cands,
		focusedCandidateIdx,
		handleCandidateClick,
		inputFocused,
	]);

    useEffect(() => {
        // make sure focused cand idx is in range of shown results
        if (cands && cands.length) {
            setFocusedCandidateIdx(prev => Math.min(prev, Math.min(cands.length - 1, MAX_CANDS)));
        }
    }, [cands]);

	return (
		<div>
			{searchResultsVisible && cands && !!cands.length && (
				<List>
					{Array(Math.min(cands.length, 8))
						.fill(null)
						.map((_, i) => (
							<ListItem
                                key={cands[i].cid}
                                focused={cands[focusedCandidateIdx]?.cid === cands[i].cid}
                                onClick={() => handleCandidateClick(cands[i])}
                                onMouseEnter={() => setFocusedCandidateIdx(i)}
							>
								{`${cands[i].crpName} 
                                 (${cands[i].party}) 
                                 ${cands[i].distIDRunFor}`}
							</ListItem>
						))}
				</List>
			)}
		</div>
	);
};

const List = styled.ul`
    position: absolute;
    background-color: white;
	max-height: 210px;
	overflow-y: scroll;
	list-style: none;
	padding: 16px 10px 10px 10px;
	margin: 0px 0 0 0;
	width: 100%;
	border: 1px solid #bbb;
	border-top: none;
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
`;

const ListItem = styled.li`
	padding: 4px;
	border-radius: 4px;
    cursor: pointer;
    background-color: ${(props: StyledListItemProps) => props.focused ? "#eee" : "#fff"};
`;

interface StyledListItemProps {
    focused?: boolean
}

export default SearchResults;
