import React from 'react';
import { Header, ConfirmButton } from '../../InvestModal/InvestModal.styles';

const Processing = () => {
  return (
    <>
      <Header>Claim Refund</Header>
      <ConfirmButton disabled>Loading...</ConfirmButton>
    </>
  );
};

export default Processing;