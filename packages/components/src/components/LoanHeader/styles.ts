import styled from 'styled-components';

interface RaisedSofarFillerProps {
  width: number;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: #ffffff;
  box-shadow: 0px 8px 20px rgba(60, 66, 81, 0.15);
  border-radius: 4px;
  max-width: 648px;
  padding: 25px 18px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  min-height: 40px;
  padding: 5px 0;
`;

export const Logo = styled.div`
  width: 40%;
`;

export const Timer = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;

  text-align: center;

  color: #f9bc2e;
`;

export const TimerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TimerUnity = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;

  text-align: center;

  color: #f9bc2e;
`;

export const TimerLabel = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;

  text-align: center;

  color: #b1b3b9;
`;

export const Label = styled.div`
  display: flex;

  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;

  color: #8a8e97;
`;

export const RightLabel = styled(Label)`
  display: flex;

  justify-content: flex-end;
  align-items: flex-end;
`;

export const Value = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;

  color: #3c4251;
`;

export const ImageLogo = styled.img`
  height: 31px;
  padding-right: 5px;
`;

export const ProgressBar = styled.div`
  text-align: center;
  width: 100%;
  height: 7px;
  background: #ecedee;
  border-radius: 4px;
  margin: 10px 5px;
`;

export const RaisedSofarFiller = styled.div<RaisedSofarFillerProps>`
  background: #00da9e;
  height: 7px;
  border-radius: 4px;
  width: ${(props) => props.width}%;

  display: initial;
`;

export const WrapperFiller = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const TextRaiseFiller = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: #eb3f93;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  margin-top: -30px;
`;

export const RaiseFiller: any = styled.div`
  width: 10%;
  background: #eb3f93;
  height: 7px;
  border-radius: 4px;
  position: relative;
  top: -7px;
`;

export const TextRaisedSofarFiller = styled.div<RaisedSofarFillerProps>`
  color: #00da9e;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  margin-top: 7px;
`;

export const Percentage = styled.span`
  width: 100%;
`;
