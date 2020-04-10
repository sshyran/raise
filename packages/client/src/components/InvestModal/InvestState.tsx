import React, { useState, useMemo } from 'react';
import BN from 'bn.js';
import styled from 'styled-components';
import { tradeTokensForExactTokens } from '@uniswap/sdk';
import { InvestStateProps } from './types';
import { getCalculations } from '../../utils/loanUtils';
import { useRootContext } from '../../contexts/RootContext';
import { useAppContext } from '../../contexts/AppContext';
import useGoogleTagManager, { TMEvents } from '../../hooks/useGoogleTagManager';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import { useAddressBalance } from '../../contexts/BalancesContext';
import useGetCoinMetadata from '../../hooks/useGetCoinMetadata';
import localeConfig from '../../commons/localeConfig';
import { generateInfo, CoinValue } from './investUtils';
import { toDecimal, fromDecimal } from '../../utils/web3-utils';

import {
  ConfirmButton,
  InvestHeader,
  InvestSection,
  LoanTermsCheckbox,
  CheckContainer,
  ExitButton
} from './InvestModal.styles';
import CollapsedTable, { TableItem } from './components/CollapsedTable';

const InvestBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InvestInput = styled.div`
  padding: 30px 40px 0px;
  overflow-y: auto;
  height: 84%;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  border-top: 1px solid #cfd0d4;
  padding: 0px 40px 30px;
`;

const ContinueButton = styled(ConfirmButton)``;

const InvestState: React.SFC<InvestStateProps> = ({
  loanCoin,
  setStage,
  setInvestment,
  ui,
  selectedCoin,
  setCoin,
  loan,
  setInputTokenAmount,
  inputTokenAmount,
  closeModal
}: InvestStateProps) => {
  const { text: loanCoinName } = loanCoin;
  const {
    store: {
      user: {
        details: { kyc_status }
      },
      user: {
        cryptoAddress: { address: account }
      }
    }
  }: any = useRootContext();
  const {
    web3Status: { walletNetworkId: chainId }
  }: any = useAppContext();
  const inputCoin = useGetCoinMetadata(selectedCoin);
  const calcs = getCalculations(loan, loanCoin.decimals);
  const { maxAmountNum, expectedROI } = calcs;
  const inputCoinImage = `${process.env.REACT_APP_HOST_IMAGES}/images/coins/${inputCoin?.icon}`;
  const loanCoinImage = `${process.env.REACT_APP_HOST_IMAGES}/images/coins/${loanCoin?.icon}`;
  const tagManager = useGoogleTagManager('Card');
  const balanceBN: BN = useAddressBalance(account, inputCoin?.address || '');
  const balance = Number(
    Number(fromDecimal(balanceBN.toString(10), inputCoin?.decimals)).toFixed(2)
  );
  const [value, setValue] = useState<number>(0);
  const expectedInputRoi = Number(expectedROI * value || 0).toLocaleString(...localeConfig);

  const onConfirm = async () => {
    tagManager.sendEvent(TMEvents.Submit, 'invest_attempt');

    setInvestment(value);
    // Change to state confirmation
    setStage(ui.Processing);
  };

  const getSwapOutput = async (): Promise<BN> => {
    const defaultValue = new BN('0');
    if (!value) {
      return defaultValue;
    }
    try {
      if (!inputCoin || !loanCoin) {
        return defaultValue;
      }
      const outputAmount = toDecimal(value, loanCoin.decimals);
      const tradeDetails = await tradeTokensForExactTokens(
        inputCoin.address,
        loanCoin.address,
        outputAmount,
        chainId
      );

      const totalOutput = new BN(tradeDetails.inputAmount.amount.toString());
      return totalOutput;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  };

  useAsyncEffect(async () => {
    if (!value) {
      setInputTokenAmount(new BN('0'));
      return;
    }
    if (inputCoin?.text === loanCoin.text) {
      setInputTokenAmount(new BN(toDecimal(value, loanCoin.decimals)));
      return;
    }
    const outputAmount = await getSwapOutput();
    setInputTokenAmount(outputAmount);
  }, [value, selectedCoin]);

  const loanInfo = useMemo(() => generateInfo({ ...calcs, coin: loanCoin, loan }), [
    calcs,
    loanCoinName,
    loan
  ]);
  const [termsCond, setTermsCond] = useState(false);

  const inputTokenAmountString =
    Number(fromDecimal(inputTokenAmount.toString(10), inputCoin?.decimals)).toLocaleString(
      ...localeConfig
    ) || '0';
  const buttonRules =
    value === 0 ||
    value === undefined ||
    value > balance ||
    value > maxAmountNum ||
    !termsCond ||
    kyc_status !== 3;

  const InvestInputProps = {
    loan,
    value,
    setValue,
    coin: inputCoin,
    loanCoin,
    balance,
    selectedCoin,
    setCoin,
    maxAmountNum
  };

  const onToggleTerms = () => {
    const toggleTerms = !termsCond;
    setTermsCond(toggleTerms);
  };

  return (
    <InvestBody>
      <InvestInput>
        <ExitButton name="close" color="black" onClick={closeModal} />
        <InvestHeader>Loan Information</InvestHeader>
        <CollapsedTable items={loanInfo} />
        <InvestSection {...InvestInputProps} />
        <TableItem
          title={`The equivalent in ${selectedCoin}`}
          content={
            <CoinValue value={inputTokenAmountString} name={inputCoin?.text} src={inputCoinImage} />
          }
        />
        <TableItem
          title="Expected ROI after repayment"
          latest
          content={<CoinValue value={expectedInputRoi} name={loanCoin?.text} src={loanCoinImage} />}
        />
      </InvestInput>
      <ButtonWrapper>
        <CheckContainer>
          <LoanTermsCheckbox id="btn-check-term-condition-invest" onChange={onToggleTerms} />I agree
          to the Terms and Conditions of the Loan Agreement
        </CheckContainer>
        <ContinueButton id="btn-invest-confirm" onClick={onConfirm} disabled={buttonRules}>
          Continue
        </ContinueButton>
      </ButtonWrapper>
    </InvestBody>
  );
};

export default InvestState;
