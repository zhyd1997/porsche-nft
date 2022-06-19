import { useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import React, { FC } from 'react';
import { queryAccountTokenSnapshot } from '../queries/queryAccountTokenSnapshot';
import { Balance } from './Balance';
import { LoadingSpinner } from './LoadingSpinner';

type GasLeftProps = {
  account: string;
  token: {
    id: string;
    symbol: string;
  };
};

export const GasLeft: FC<GasLeftProps> = ({ account, token }) => {
  const { loading, error, data } = useQuery(queryAccountTokenSnapshot, {
    skip: !account,
    variables: {
      account: account.toLowerCase(),
      token: token.id.toLowerCase(),
    },
  });

  return (
    <div>
      Gas Left:{' '}
      {loading ? (
        <LoadingSpinner />
      ) : data ? (
        <Balance
          balance={ethers.utils.formatEther(data.accountTokenSnapshots[0].balanceUntilUpdatedAt)}
          symbol={data.accountTokenSnapshots[0].token.symbol}
        />
      ) : (
        JSON.stringify(error)
      )}
    </div>
  );
};
