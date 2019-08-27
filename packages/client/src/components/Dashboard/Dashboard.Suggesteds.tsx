import React from 'react';
import Suggested from './Dashboard.Suggested';
import useAuctionState from './Dashboard.useAuctionState';
import { SuggestedContainer, NoResults } from './Dashboard.styles';
import { InvestModal } from '../InvestModal';

const Suggesteds = ({ auctions }) => {
  const auctionsState: any = useAuctionState(auctions, ['all']);

  return auctionsState.cata({
    Loading: () => <SuggestedContainer>loading</SuggestedContainer>,
    Success: () => (
      <SuggestedContainer>
        {auctions.slice(0, 3).map(auction => (
          <Suggested key={auction.id} auction={auction} cta={<InvestModal loan={auction} />} />
        ))}
      </SuggestedContainer>
    ),
    Empty: () => (
      <SuggestedContainer>
        <NoResults>No results</NoResults>
      </SuggestedContainer>
    )
  });
};

export default Suggesteds;