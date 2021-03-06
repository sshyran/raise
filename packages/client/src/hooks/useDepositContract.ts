import { useState } from 'react';
import useWallet from './useWallet';
import useAsyncEffect from './useAsyncEffect';
import { useRootContext } from '../contexts/RootContext';

const useDepositContract = () => {
  const [activeContract, setActiveContract]: any = useState(null);
  const { followTx }: any = useRootContext();

  const wallet = useWallet();

  useAsyncEffect(async () => {
    if (wallet && followTx) {
      try {
        const contract = await wallet.addContract('Deposit');

        setActiveContract({
          address: contract.options.address,
          hasDeposited: async (address) => {
            const resp = await contract.methods.hasDeposited(address).call();
            return resp;
          },
          deposit: (address) =>
            followTx.watchTx(
              contract.methods.depositFor(address).send({ from: address }),
              { id: 'deposit' },
              'deposit'
            ),
          depositWithReferral: (address, referralAddress) =>
            followTx.watchTx(
              contract.methods
                .depositForWithReferral(address, referralAddress)
                .send({ from: address }),
              { id: 'depositReferal' },
              'depositReferal'
            ),
          withdraw: (address) =>
            followTx.watchTx(
              contract.methods.withdraw(address).send({ from: address }),
              { id: 'withdrawDeposit' },
              'withdrawDeposit'
            )
        });
      } catch (error) {
        console.error('Contract Deposit not found in current network.', error);
      }
    }
  }, [wallet, followTx]);

  return activeContract;
};

export default useDepositContract;
