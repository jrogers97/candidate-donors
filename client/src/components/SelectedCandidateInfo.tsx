import React, { useContext } from "react";
import CandidatesContext from "../context/CandidatesContext";
import styled from "styled-components";
import loader from "../assets/loading.gif";
import { CandidateData, Contributor } from "../interfaces";
import { formatMoney } from "../utils/utils";

const CandidateInfoDisplay = ({ data }: { data: CandidateData }) => {
	const hasValue = (val: any) => val !== null && val !== undefined;
	return (
		<StyledCandidateInfoDisplay>
			<SummaryColumn>
				<HeaderText key="name">{data.name}</HeaderText>
				<p key="party">
                    <LabelText>Party: </LabelText>{data.party}
                </p>
				{data.state && 
                    <p key="state">
                        <LabelText>State: </LabelText>{data.state}
                    </p>
                }
				<p key="chamber">
                    <LabelText>Chamber: </LabelText>{data.chamber}</p>
				{hasValue(data.district) && (
					<p key="district">
                        <LabelText>District: </LabelText>{data.district}
                    </p>
				)}
				{hasValue(data.cashSpent) && (
					<p key="cashSpent">
                        <LabelText>Cash Spent: </LabelText>{formatMoney(data.cashSpent)}
                    </p>
				)}
				{hasValue(data.cashOnHand) && (
					<p key="cashOnHand">
                        <LabelText>Cash on Hand: </LabelText>{formatMoney(data.cashOnHand)}
                    </p>
				)}
				{hasValue(data.total) && (
					<p key="total">
                        <LabelText>Total: </LabelText>{formatMoney(data.total)}
                    </p>
				)}
				{hasValue(data.debt) && (
					<p key="debt">
                        <LabelText>Debt: </LabelText>{formatMoney(data.debt)}
                    </p>
				)}
				{data.lastUpdated && (
					<p key="lastUpdated">
                        Last Updated {data.lastUpdated}
                    </p>
				)}
			</SummaryColumn>
			<ContributorsColumn>
				{data.contributors ? (
					<div>
						<HeaderText>Top Contributors:</HeaderText>
						{data.contributors.map((contributor: Contributor) => (
							<p key={contributor.org}>
								{contributor.org}:{" "}
								{formatMoney(contributor.total)}
							</p>
						))}
					</div>
				) : (
					<p>No contribution data available :(</p>
				)}
			</ContributorsColumn>
		</StyledCandidateInfoDisplay>
	);
};

const SelectedCandidateInfo = () => {
	const { selectedCandidate, selectedCandidateData } = useContext(
		CandidatesContext
	);

	console.log(selectedCandidateData, selectedCandidate);

	return (
		<StyledSelectedCandidateInfo>
			{selectedCandidateData ? (
				<CandidateInfoDisplay data={selectedCandidateData} />
			) : (
				selectedCandidate && (
					<LoaderWrapper>
						<Loader src={loader} alt="Loading" />
					</LoaderWrapper>
				)
			)}
		</StyledSelectedCandidateInfo>
	);
};

const StyledSelectedCandidateInfo = styled.div`
	width: 70%;
	max-width: 600px;
	display: flex;
	align-items: center;
	font-size: 14px;
	margin-top: 18px;
	@media (min-width: 400px) {
		width: 80%;
	}
`;

const LoaderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Loader = styled.img`
	height: 50px;
	width: 50px;
`;

const StyledCandidateInfoDisplay = styled.div`
    display: flex;
    flex-direction: column;
	width: 100%;
	justify-content: space-between;
	@media (min-width: 400px) {
		flex-direction: row;
	}
`;

const SummaryColumn = styled.div`
	width: 100%;
	@media (min-width: 400px) {
		width: 45%;
	}
`;

const ContributorsColumn = styled.div`
	width: 100%;
	@media (min-width: 400px) {
		width: 45%;
	}
`;

const HeaderText = styled.p`
    font-weight: bolder;
    font-size: 16px;
`;

const LabelText = styled.span`
    font-size: 15px;
    font-weight: bold;
`;

export default SelectedCandidateInfo;
