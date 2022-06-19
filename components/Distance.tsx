import React, { FC, useEffect, useState } from 'react';
import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { calculateReceivedSoFar } from '../utils/calculateReceivedSoFar';
import { LoadingSpinner } from './LoadingSpinner';
import { exchangeAddress } from '../constant/exchangeAddress';
import { Balance } from './Balance';

const chainId = 137;
const provider = new ethers.providers.InfuraProvider(chainId, process.env.NEXT_PUBLIC_INFURA_ID);

type DistanceProps = {
  distribution: any;
  account: string;
};

export const Distance: FC<DistanceProps> = ({ distribution, account }) => {
  const [distance, setDistance] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    (async () => {
      const framework = await Framework.create({
        chainId,
        provider,
      });

      const superToken = Web3.utils.toChecksumAddress(exchangeAddress.output.id);
      const publisher = Web3.utils.toChecksumAddress(exchangeAddress.exchange.id);
      const subscriber = Web3.utils.toChecksumAddress(account);

      try {
        const subscriptionDetail = await framework.idaV1.getSubscription({
          superToken,
          publisher,
          indexId: distribution.index.indexId,
          subscriber,
          providerOrSigner: framework.settings.provider,
        });

        if (distribution && isMounted) {
          const receivedSoFar = calculateReceivedSoFar(
            distribution.index.indexValue,
            distribution.totalAmountReceivedUntilUpdatedAt,
            distribution.indexValueUntilUpdatedAt,
            distribution.units || subscriptionDetail.units
          );
          setDistance(receivedSoFar);

          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.error(e);
        setError('SFError: see console for details.');
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [distribution, account]);

  return (
    <div>
      Distance Traveled So Far:{' '}
      {distance ? (
        <Balance balance={distance} symbol={distribution.index.token.symbol} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <span>{error}</span>
      ) : null}
    </div>
  );
};
