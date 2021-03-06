import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';
import {
  TokenBalance as TokenBalanceNotStyled,
  TokenLayout as TokenLayoutNotStyled
} from '../HeaderBalance';

import { device } from '../../commons/breakpoints';

export const TokenBalance = styled(TokenBalanceNotStyled)`
  width: 100%;
`;
export const TokenLayout = styled(TokenLayoutNotStyled)`
  width: 100%;
`;
export const BalanceDropdown = styled(Dropdown)`
  &&& {
    padding: 12px 18px;
    border: 1px solid #c5c7cb;
    border-radius: 3px;
    max-width: 148px;
    font-size: 12px;
    display: flex;
    align-items: center;
  }

  &&&& .dropdown.icon {
    font-size: 24px;
  }

  &&&.active {
    border: 1px solid #eb3f93;
    box-shadow: 0px 8px 15px rgba(60, 66, 81, 0.25);

    .dropdown.icon {
      color: #eb3f93;
    }
  }
`;

export const BalanceMenu = styled(Dropdown.Menu)`
  &&&&& {
    margin-top: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 24px;
    margin-left: auto;
    margin-right: auto;
    width: 280px;
    border-radius: 3px;
    box-shadow: 0px 8px 15px rgba(60, 66, 81, 0.25);
    @media screen and ${device.tablet} {
      right: 0px;
      left: unset;
      transform: unset;
    }
  }
  & ${TokenBalance}:not(:last-child) {
    margin-bottom: 10px;
  }
  & ${TokenLayout}:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const Value = styled.div`
  margin-left: 8px;
`;

export const Title = styled.div`
  font-weight: bold;
`;
