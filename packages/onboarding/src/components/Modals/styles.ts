import styled from 'styled-components';
import { Modal, Button } from 'semantic-ui-react';

export const OnboardingCloseButton = styled(Button)`
  &&& {
    background: none;
    border: none;
    position: absolute;
    top: 0;
    right: -10px;
    color: rgba(255, 255, 255, 0.7);

    i {
      font-size: 20px;
    }

    &:hover {
      background: none;
      color: #fff;
    }
  }
`;

export const OnboardingModal: any = styled(Modal)`
  display: flex;
  flex-direction: row;
  min-width: 700px;
`;

export const OnboardingHeader: any = styled.div`
  display: flex;
  height: 100px;
  border-bottom: 1px solid #dfe3e9;
  margin: 0 5px 0 5px;

  img {
    margin-left: 4%;
  }
`;

export const OnboardingContentWrapper: any = styled.div`
  display: flex;
  flex-direction: row;
  
`;

export const OnboardingImageWrapper: any = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 45%;
  justify-content: space-between;
`;

export const OnboardingFormContent: any = styled.div`
  flex: 0 1 55%;
  padding: 5%;
  border-left: 1px solid #dfe3e9;
`;

export const OnboardingImage: any = styled.img`
  max-width: 100%;
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
`;
export const OnboardingTitleWrapper: any = styled.div`
  padding: 15%;
`;
