import styled from 'styled-components';
import { Modal, Button } from 'semantic-ui-react';

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  signUp: '860px',
  desktop: '950px'
};

export const OnboardingCloseButton = styled(Button)`
  &&& {
    background: none;
    color: #fff;
    border: none;

    color: rgba(255, 255, 255, 0.7);

    i {
      font-size: 15px;
      color: black;
    }

    &:hover, &:focus {
      background: none;
      color: #fff;
    }
  }
`;

export const OnboardingModal: any = styled(Modal)`
  display: flex;
  flex-direction: row;
`;

export const OnboardingHeaderItemWrapper: any = styled.div`
  display: flex;
  align-items: stretch;
`;

export const OnboardingHeader: any = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  height: 100px;
  border-bottom: 1px solid #dfe3e9;
  margin: 0 5px 0 5px;

  div img {
    padding: 12%;
  }

  @media (max-width: ${size.mobileL}) {
    border-bottom: none;
  }
`;

export const OnboardingContentWrapper: any = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${size.mobileL}) {
    flex-wrap: wrap;
  }
`;

export const OnboardingImageWrapper: any = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 45%;
  justify-content: space-between;

  @media (max-width: ${size.mobileL}) {
    flex: 0 1 100%;
  }
`;

export const OnboardingFormContent: any = styled.div`
  flex: 0 1 55%;
  padding: 5%;
  border-left: 1px solid #dfe3e9;

  @media (max-width: ${size.mobileL}) {
    flex: 0 1 100%;
  }
`;

export const OnboardingImage: any = styled.img`
  max-width: 100%;

  @media (max-width: ${size.mobileL}) {
    display: none;
  }
`;

export const OnboardingTitle: any = styled.div`
  font-size: 50px;
  font-family: Lato;
  line-height: 60px;
  color: #3c4251;
  font-weight: bold;
  height: 60px;
  width: 260px;
  margin: 5%;

  @media (max-width: ${size.mobileL}) {
    font-size: 25px;
    font-family: Lato;
    line-height: 15px;
    height: auto;
    width: auto;
    text-align: center;
  }
`;

export const OnboardingSubTitle: any = styled.div`
  font-size: 23px;
  line-height: 36px;
  opacity: 0.59;
  color: #3c4251;
  font-family: Lato;
  height: 72px;
  width: 290px;
  margin: 5%;

  @media (max-width: ${size.mobileL}) {
    display: none;
  }
`;
export const OnboardingTitleWrapper: any = styled.div`
  padding: 15%;

  @media (max-width: ${size.mobileL}) {
    flex: 0 1 20%;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1%;
  }
`;
