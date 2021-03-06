import React, { useState, Fragment } from 'react';
import { List, Grid } from 'semantic-ui-react';
import { Button } from '@raisehq/components';
import useAsyncEffect from '../../../hooks/useAsyncEffect';
import useWallet from '../../../hooks/useWallet';
import useWeb3 from '../../../hooks/useWeb3';
import ERC20 from '../../../commons/erc20';
import { MAX_VALUE } from '../../../commons/constants';
import { ProcessingStateProps } from '../types';
import {
  CardCenteredText,
  CardTitle,
  CardSubtitle,
  LabelPaddingLoader,
  IconSuccess,
  MicroLoader,
  LabelPadding,
  SegmentPadded,
  ListItemPadding,
  Explanation,
  Action,
  IconSuccess as IconError,
  BlankSpace,
  ModalFlexWrapper,
  ExitButton,
  ButtonContainerProcessing
} from '../styles';
import { useAppContext } from '../../../contexts/AppContext';
import { useRootContext } from '../../../contexts/RootContext';
import useGoogleTagManager, { TMEvents } from '../../../hooks/useGoogleTagManager';
import useGetCoin from '../../../hooks/useGetCoin';
import useGetCoinMetadata from '../../../hooks/useGetCoinMetadata';
import { toDecimal, fromDecimal } from '../../../utils/web3-utils';

const ProcessingState: React.SFC<ProcessingStateProps> = ({
  loan,
  investment,
  ui,
  setStage,
  selectedCoin,
  inputTokenAmount,
  loanCoin,
  closeModal
}: any) => {
  const {
    web3Status: { walletAccount }
  }: any = useAppContext();
  const { followTx }: any = useRootContext();

  const { web3 } = useWeb3();
  const metamask = useWallet();
  const coin = useGetCoin(loan);

  const [contracts, setContracts]: any = useState();
  const [approved, setAproved]: any = useState(false);
  const [errors, setError]: any = useState();

  const tagManager = useGoogleTagManager('Card');
  const inputCoin = useGetCoinMetadata(selectedCoin);
  const inputTokenString = fromDecimal(inputTokenAmount.toString(10), inputCoin?.decimals);
  const explanation =
    inputCoin?.text === loanCoin.text
      ? `${investment} ${selectedCoin} will be transferred from your wallet to fund the loan`
      : `${inputTokenString} ${selectedCoin} will be converted to ${investment} ${loanCoin.text} and fund the loan`;
  useAsyncEffect(async () => {
    if (metamask) {
      const loanContract = await metamask.addContractByAddress('LoanContract', loan.id);
      let DAIProxy;
      try {
        if (loanContract.methods.proxyAddress) {
          const DaiProxyAddress = await loanContract.methods.proxyAddress().call();
          DAIProxy = await metamask.addContractByAddress('DAIProxy', DaiProxyAddress);
        } else {
          console.error('ERROR: using default proxy address');
          DAIProxy = await metamask.addContract('DAIProxy');
        }
        setContracts({
          loanContract,
          DAIProxy
        });
      } catch (error) {
        console.error('[ProcessingState] Failed to retrieve DAIProxy', error);
      }
    }
  }, [metamask]);

  useAsyncEffect(async () => {
    if (contracts) {
      const { BN } = web3.utils;
      const { DAIProxy } = contracts;
      const tokenAddress = inputCoin?.address || null;
      if (!tokenAddress) {
        throw Error('Input token not set');
      }
      if (tokenAddress === 'ETH') {
        setAproved(true);
        return;
      }
      const valueBN = new BN(toDecimal(investment.toString(), inputCoin?.decimals));
      const ERC20Contract = new web3.eth.Contract(ERC20, tokenAddress);

      const amountApproved = await ERC20Contract.methods
        .allowance(walletAccount, DAIProxy.options.address)
        .call({ from: walletAccount });

      if (valueBN.gt(new BN(amountApproved))) {
        try {
          await followTx.watchTx(
            ERC20Contract.methods
              .approve(DAIProxy.options.address, MAX_VALUE)
              .send({ from: walletAccount }),
            { id: 'approval' },
            'approval'
          );
          setAproved(true);
        } catch (error) {
          console.error(
            '[DAIProxy ERROR ]',
            'approve :',
            DAIProxy.options.address,
            ' stacktrace: ',
            error
          );
          setError({ approvalError: error });
        }
      } else {
        setAproved(true);
      }
    }
  }, [contracts]);

  useAsyncEffect(async () => {
    if (approved) {
      const { DAIProxy } = contracts;
      if (!inputCoin?.address) {
        throw Error('[LoanFund] input coin is null');
      }
      const isSwap = inputCoin?.address.toLowerCase() !== loanCoin?.address.toLowerCase();
      if (isSwap) {
        try {
          if (inputCoin.address === 'ETH') {
            await followTx.watchTx(
              DAIProxy.methods
                .swapEthAndFund(loan.id, toDecimal(investment.toString(), loanCoin?.decimals))
                .send({ value: inputTokenAmount.toString(), from: walletAccount }),
              {
                id: 'investLoan',
                vars: [investment, coin.value]
              },
              'investLoan'
            );
            tagManager.sendEvent(TMEvents.Submit, 'invest_success');
            setStage(ui.Success);
            return;
          }
          await followTx.watchTx(
            DAIProxy.methods
              .swapTokenAndFund(
                loan.id,
                inputCoin.address,
                inputTokenAmount.toString(),
                toDecimal(investment.toString(), loanCoin?.decimals)
              )
              .send({ from: walletAccount }),
            {
              id: 'investLoan',
              vars: [investment, coin.value]
            },
            'investLoan'
          );
          tagManager.sendEvent(TMEvents.Submit, 'invest_success');
          setStage(ui.Success);
          return;
        } catch (error) {
          console.error('[DAIProxy ERROR][Swap]', 'address:', loan.id, ' stacktrace: ', error);
          setError({ transactionError: error });
        }
      } else {
        try {
          await followTx.watchTx(
            DAIProxy.methods
              .fund(loan.id, toDecimal(investment.toString(), inputCoin.decimals))
              .send({ from: walletAccount }),
            {
              id: 'investLoan',
              vars: [investment, coin.value]
            },
            'investLoan'
          );
          tagManager.sendEvent(TMEvents.Submit, 'invest_success');

          setStage(ui.Success);
        } catch (error) {
          console.error('[DAIProxy ERROR][No swap]', 'address:', loan.id, ' stacktrace: ', error);
          setError({ transactionError: error });
        }
      }
    }
  }, [approved]);

  const onRetry = () => {
    tagManager.sendEvent(TMEvents.Click, 'invest_retry');

    setStage(ui.Confirm);
  };

  const printRetry = () => (
    <ButtonContainerProcessing>
      <Button
        onClick={onRetry}
        text="RETRY"
        type="primary"
        size="large"
        disabled={false}
        fullWidth
      />
    </ButtonContainerProcessing>
  );

  const stepNumber = (number, action) => {
    let icon = (
      <LabelPadding circular key="black-02">
        {number}
      </LabelPadding>
    );
    if (action === 'aproval') {
      if (approved) {
        icon = (
          <LabelPaddingLoader circular color="green">
            <IconSuccess name="check" />
          </LabelPaddingLoader>
        );
      } else if (errors && errors.aprovalError) {
        icon = (
          <LabelPaddingLoader circular color="red">
            <IconError name="close" />
          </LabelPaddingLoader>
        );
      } else {
        icon = (
          <LabelPaddingLoader circular key="black-01">
            <MicroLoader active inverted />
          </LabelPaddingLoader>
        );
      }
    }

    if (action === 'fund') {
      if (approved && !errors) {
        icon = (
          <LabelPaddingLoader circular key="black-01">
            <MicroLoader active inverted />
          </LabelPaddingLoader>
        );
      } else if (errors && errors.transactionError) {
        icon = (
          <LabelPaddingLoader circular color="red">
            <IconError name="close" />
          </LabelPaddingLoader>
        );
      }
    }

    return icon;
  };

  return (
    <ModalFlexWrapper>
      <Fragment>
        <ExitButton name="close" color="black" onClick={closeModal} />
        <CardCenteredText>
          <CardTitle>Processing</CardTitle>
          <CardSubtitle>Check your MetaMask wallet to proceed</CardSubtitle>
        </CardCenteredText>
        <CardCenteredText>
          <SegmentPadded textAlign="left">
            <List>
              <ListItemPadding>
                <Grid columns={2}>
                  <Grid.Column width={2}>{stepNumber(1, 'aproval')}</Grid.Column>
                  <Grid.Column width={14}>
                    <Action>{`Allow Raise to interact with your ${selectedCoin}`}</Action>
                    <Explanation>
                      {`Once you give us allowance, you will be able to make investments in ${selectedCoin}`}
                    </Explanation>
                  </Grid.Column>
                </Grid>
              </ListItemPadding>
              <ListItemPadding>
                <Grid columns={2}>
                  <Grid.Column width={2}>{stepNumber(2, 'fund')}</Grid.Column>
                  <Grid.Column width={14}>
                    <Action>Confirm the transaction</Action>
                    <Explanation>{explanation}</Explanation>
                  </Grid.Column>
                </Grid>
              </ListItemPadding>
            </List>
          </SegmentPadded>
        </CardCenteredText>
      </Fragment>
      {errors && (errors.approvalError !== null || errors.transactionError !== null) ? (
        printRetry()
      ) : (
        <BlankSpace />
      )}
    </ModalFlexWrapper>
  );
};

export default ProcessingState;
