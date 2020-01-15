import React from 'react';
import {
  CardTitle,
  CardSubTitle,
  SelectYourWalletTitle,
  Web3CheckWalletWrapper,
  SelectYourWalletContainer,
  GoBack
} from './Web3Check.styles';

import OnboardingProgressBar from '../OnboardingProgressBar';
import { isMobile } from 'react-device-detect';

const WalletSetUp = ({ onBack }: any) => {
  return (
    <Web3CheckWalletWrapper>
      <OnboardingProgressBar step={1} isMobile={isMobile} />
      <SelectYourWalletContainer>
        <SelectYourWalletTitle>
          <CardTitle>Select your wallet</CardTitle>
          <CardSubTitle>Get started by connecting one of the wallets below</CardSubTitle>
        </SelectYourWalletTitle>
      </SelectYourWalletContainer>
      <GoBack />
    </Web3CheckWalletWrapper>
  );
};

export default WalletSetUp;
