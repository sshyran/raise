import styled from 'styled-components';
import { device } from '../../commons/breakpoints';

export const Wrapper = styled.div`
  width: 390px;
  height: 15px;
  position: relative;
  background: #e5e2f1;
  border-radius: 8px;
  & .rc-slider-handle {
    height: 37px;
    width: 37px;
    margin-top: -18px;
    margin-left: -18px;
    border: 10px;
  }
  & .rc-slider-dot {
    display: none;
  }

  @media ${device.laptop} {
    & .rc-slider-handle {
      height: 24px;
      width: 24px;
      margin-top: -9px;
      margin-left: -9px;
    }
    & .rc-slider-dot {
      display: block;
    }
  }
`;

export const LabelLess = styled.div`
  display: none;
  height: 30px;
  width: 88px;
  color: #5a5a5a;
  font-size: 12px;
  font-weight: bold;
  line-height: 15px;
  position: absolute;
  left: 0;
  top: 30px;
  text-transform: uppercase;

  .rc-slider-dot {
    &:nth-child(odd) {
      display: none !important;
    }
  }
  @media ${device.laptop} {
    display: block;
  }
`;

export const LabelMore = styled.div`
  display: none;
  height: 30px;
  width: 88px;
  color: #5a5a5a;
  font-size: 12px;
  font-family: Lato;
  font-weight: bold;
  line-height: 15px;
  position: absolute;
  right: 0;
  top: 30px;
  text-align: right;
  text-transform: uppercase;
  @media ${device.laptop} {
    display: block;
  }
`;

export const handleStyle = [
  {
    backgroundColor: '#3C4251',
    borderColor: '#3C4251',
    boxShadow: 'none'
  }
];

export const railStyle = {
  border: 'none',
  background: 'none'
};

export const trackStyle = [
  {
    backgroundColor: '#21ba45'
  }
];

export const dotStyle = {
  borderColor: '#21ba45',
  border: '0px'
};

export const activeDotStyle = {
  backgroundColor: '#21ba45'
};
