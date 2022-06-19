import { ethers } from 'ethers';
import React, { FC, useEffect, useState } from 'react';
import { Balance } from './Balance';
import { LoadingSpinner } from './LoadingSpinner';

type GasFeeProps = {
  transactionHash: string;
  nativeCurrency: any;
};

export const GasFee: FC<GasFeeProps> = ({ transactionHash, nativeCurrency }) => {
  const [gasFee, setGasFee] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const provider = ethers.getDefaultProvider(
        {
          name: 'matic',
          chainId: 137,
        },
        {
          infura: process.env.NEXT_PUBLIC_INFURA_ID,
        }
      );

      const receipt = await provider.getTransactionReceipt(transactionHash);

      if (isMounted && receipt?.gasUsed !== undefined && receipt?.effectiveGasPrice) {
        const { gasUsed, effectiveGasPrice } = receipt;

        const _gasFee = ethers.utils.formatEther(gasUsed.mul(effectiveGasPrice));
        setGasFee(_gasFee);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [transactionHash]);

  return <div>Gas Fee: {gasFee ? <Balance balance={gasFee} symbol={nativeCurrency.symbol} /> : <LoadingSpinner />}</div>;
};
