import React from 'react';
import styled from 'styled-components';
import { ReactLink } from '../Links';
import { useRootContext } from '../../contexts/RootContext';
import Web3Address from '../Web3Address/Web3Address';
import MyAccountButton from '../DesktopHeader/MyAccountButton';
import { Balance as HeaderBalance } from '../HeaderBalance';

const LinkReactButton = styled(ReactLink)`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 12px 16px;
  border: 1px solid #b1b3b9;
  box-sizing: border-box;
  border-radius: 3px;
  font-size: 16px;
  color: #3c4251;
  font-weight: bold;
`;

const UsersMenu = () => {
  const {
    store: {
      user: {
        details: { accounttype_id }
      }
    }
  }: any = useRootContext();

  const CreateLoanButton = accounttype_id === 1 && (
    <LinkReactButton to="/create-loan" title="Create loan" />
  );
  return (
    <>
      {CreateLoanButton}
      <div>
        <Web3Address border={false} />
      </div>
      <HeaderBalance />
      <MyAccountButton />
    </>
  );
};

export default UsersMenu;
