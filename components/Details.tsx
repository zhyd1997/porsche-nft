import { useQuery } from '@apollo/client';
import React, { FC } from 'react';
import styles from '../styles/Details.module.css';
import { exchangeAddress } from '../constant/exchangeAddress';
import { queryDistribution } from '../queries/queryDistribution';
import { queryStream } from '../queries/queryStream';
import { Distance } from './Distance';
import { GasFee } from './GasFee';
import { GasLeft } from './GasLeft';
import { GasUsed } from './GasUsed';
import { Speed } from './Speed';

type DetailsProps = {
  account: string;
  activeChain: any;
};

export const Details: FC<DetailsProps> = ({ account, activeChain }) => {
  const {
    loading: loadingStream,
    error: loadedStreamError,
    data: latestActiveStream,
  } = useQuery(queryStream, {
    skip: !account || activeChain?.network !== 'matic',
    variables: {
      sender: account.toLowerCase(),
      receiver: exchangeAddress.exchange.id,
    },
  });

  const {
    loading: loadingDistribution,
    error: loadedDistributionError,
    data: distribution,
  } = useQuery(queryDistribution, {
    skip: !latestActiveStream?.streams.length,
    variables: {
      subscriber: account.toLowerCase(),
      updatedAtTimestamp: latestActiveStream?.streams.length ? latestActiveStream.streams[0].updatedAtTimestamp : '',
    },
  });

  if (!activeChain) {
    return null;
  }

  if (activeChain.network !== 'matic') {
    return (
      <div className={styles.details}>
        This is an option to display networks, and nothing info to show, try to switch to <b>Polygon Mainnet</b> network to see your market
        stream.
      </div>
    );
  }

  const loading = loadingStream || loadingDistribution;
  const error = loadedStreamError || loadedDistributionError;

  if (loading) {
    return <div className={styles.details}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.details}>{JSON.stringify(error)}</div>;
  }

  if (!distribution || !distribution.indexSubscriptions.length) {
    return (
      <div className={styles.details} style={{ display: 'block' }}>
        Start your 1st <b>USDC&nbsp;&gt;&gt;&nbsp;RIC</b> market stream at{' '}
        <a href="https://staging.ricochet.exchange/" target={'_blank'} rel="noreferrer">
          Ricochet Exchange
        </a>
        .
      </div>
    );
  }

  const distributionWithOutputToken = distribution.indexSubscriptions.find(
    (d: any) => d.index.token.symbol === exchangeAddress.output.symbol
  );

  if (!distributionWithOutputToken) {
    return <div className={styles.details}>Error: distribution is not found.</div>;
  }

  return (
    <div className={styles.details}>
      <GasLeft account={account} token={exchangeAddress.input} />
      <GasUsed
        streamedUntilUpdatedAt={latestActiveStream.streams[0].streamedUntilUpdatedAt}
        updatedAtTimestamp={latestActiveStream.streams[0].updatedAtTimestamp}
        currentFlowRate={latestActiveStream.streams[0].currentFlowRate}
        symbol={latestActiveStream.streams[0].token.symbol}
      />
      <GasFee
        transactionHash={latestActiveStream.streams[0].flowUpdatedEvents[0].transactionHash}
        nativeCurrency={activeChain.nativeCurrency}
      />
      <Speed currentFlowrate={latestActiveStream.streams[0].currentFlowRate} symbol={latestActiveStream.streams[0].token.symbol} />
      <Distance distribution={distributionWithOutputToken} account={account} />
    </div>
  );
};
