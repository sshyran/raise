import { useState } from 'react';
import useMetaMask from './useMetaMask';
import useAsyncEffect from './useAsyncEffect';

const useLoanDispatcher = () => {
  const [activeContract, setActiveContract]: any = useState(null);
  const metamask = useMetaMask();
  useAsyncEffect(async () => {
    if (metamask) {
      try {
        const contract = await metamask.addContract('LoanDispatcher');
        const account = await metamask.getAccounts();
        setActiveContract({
          deploy: async (minAmount, amount, maxInterestRate, termMonthsLength, acceptMinimum) => {
            const auctionSecondsLength = (1 * 30 * 24 * 60 * 60).toString();
            const termSecondsLength = termMonthsLength.toString();
            const params = [
              metamask.utils.toWei(
                acceptMinimum ? minAmount.toString() : amount.toString(),
                'ether'
              ),
              metamask.utils.toWei(amount.toString(), 'ether'),
              metamask.utils.toWei(maxInterestRate.toString()),
              termSecondsLength,
              auctionSecondsLength
            ];

            return contract.methods.deploy(...params).send({ from: account[0] });
          }
        });
      } catch (error) {
        console.error('Contract LoanDispatcher not found in current network.');
      }
    }
  }, [metamask]);

  return activeContract;
};

export default useLoanDispatcher;
