import React from "react";
import SearchInput from "./SearchInput";
import styled from "styled-components";
import SearchResults from "./SearchResults";
import SelectedCandidateInfo from "./SelectedCandidateInfo";
import CandidatesProvider from "../context/CandidatesProvider";

const App = () => {
	return (
		<StyledApp>
			<CandidatesProvider>
				<ComponentContainer>
					<SearchInput />
					<SearchResults />
                    <SelectedCandidateInfo />
				</ComponentContainer>
			</CandidatesProvider>
		</StyledApp>
	);
}

const StyledApp = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ComponentContainer = styled.div`
    position: relative;
    width: 70%;
    max-width: 400px;
    margin-top: 100px;
`;

export default App;
