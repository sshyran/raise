import React from 'react';
import {
  KycSuccessWrapper,
  KycSuccessHeader,
  KycSuccessTitle,
  KycSuccessDescription,
  GreenActionButton,
  MainImage,
  GreenActionTitleText
} from './Kyc.styles';
import useRouter from '../../hooks/useRouter';
import { IMAGES_PATH } from '../../commons/constants';

const KycSuccess = () => {
  const { history }: any = useRouter();
  return (
    <KycSuccessWrapper>
      <KycSuccessHeader>
        <MainImage src={`${IMAGES_PATH}check.svg`} />
        <KycSuccessTitle>You are ready!</KycSuccessTitle>
        <KycSuccessDescription>
          Now that you complete all the steps, you can start investing with Raise. You can access
          the marketplace and check all the great opportunities waiting for you.
        </KycSuccessDescription>
      </KycSuccessHeader>
      <GreenActionButton onClick={() => history.push('/')}>
        <GreenActionTitleText>Check loan offers</GreenActionTitleText>
      </GreenActionButton>
    </KycSuccessWrapper>
  );
};

export default KycSuccess;
