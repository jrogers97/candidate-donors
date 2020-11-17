import React, { useContext } from 'react';
import CandidatesContext from '../context/CandidatesContext';
import styled from 'styled-components';
import loader from '../assets/loading.gif';

const SelectedCandidateInfo = () => {
    const { 
        selectedCandidate,
        selectedCandidateData,
    } = useContext(CandidatesContext);

    return (
		<StyledSelectedCandidateInfo>
			{selectedCandidateData
				? <p>{JSON.stringify(selectedCandidateData)}</p>
				: (selectedCandidate && <Loader src={loader} alt="Loading" />)}
		</StyledSelectedCandidateInfo>
	);
};

const StyledSelectedCandidateInfo = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Loader = styled.img`
    height: 50px;
    width: 50px;
`;

export default SelectedCandidateInfo;