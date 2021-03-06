import React from 'react';
import daggy from 'daggy';
import { Link } from 'react-router-dom';
import { Loader, Header } from 'semantic-ui-react';
import { Button } from '@raisehq/components';

import {
  LoanConfirmation,
  NewLoanAnchor,
  WaitingButton,
  ButtonContainer
} from './CreateLoan.styles';
import ConfirmLoan from './ConfirmLoan';

export const UI = daggy.taggedSum('UI', {
  Confirm: [],
  Waiting: [],
  Success: ['success'],
  Error: ['error']
});

export const getLoanAction = (stage, values, methods) => {
  const { onSave, onRetry, onToggleTerms, onToggleAuthTerms } = methods;

  return stage.cata({
    Confirm: () => (
      <ConfirmLoan
        values={values}
        onToggleTerms={onToggleTerms}
        onToggleAuthTerms={onToggleAuthTerms}
        onSave={onSave}
      />
    ),
    Waiting: () => (
      <LoanConfirmation>
        <Header as="h2">Please wait</Header>
        <p>Creating loan. Can take several minutes.</p>
        <WaitingButton disabled>
          <Loader active inline />
        </WaitingButton>
      </LoanConfirmation>
    ),
    Success: () => (
      <LoanConfirmation>
        <Header as="h2">Congrats!</Header>
        <p>Your loan request have been created.</p>
        <ButtonContainer>
          <Button
            idAttr="btn-check"
            as={Link}
            to="/"
            text="Check your loans"
            type="secondary"
            size="small"
            disabled={false}
            fullWidth
          />
        </ButtonContainer>
        <NewLoanAnchor onClick={onRetry}>Create a new loan</NewLoanAnchor>
      </LoanConfirmation>
    ),
    Error: () => (
      <LoanConfirmation>
        <Header as="h2">Sorry</Header>
        <p>Something went wrong while creating the loan. Contact support if you need help.</p>
        <ButtonContainer>
          <Button
            idAttr="btn-retry"
            onClick={onRetry}
            text="Retry"
            type="secondary"
            size="large"
            disabled={false}
            fullWidth
          />
        </ButtonContainer>
      </LoanConfirmation>
    )
  });
};
