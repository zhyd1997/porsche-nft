import React, { FC } from 'react';
import { calculateStreamedSoFar } from '../utils/calculateStreamedSoFar';
import { Balance } from './Balance';
import { LoadingSpinner } from './LoadingSpinner';

type GasUsedProps = {
  streamedUntilUpdatedAt: string;
  updatedAtTimestamp: string;
  currentFlowRate: string;
  symbol: string;
};

export const GasUsed: FC<GasUsedProps> = ({ streamedUntilUpdatedAt, updatedAtTimestamp, currentFlowRate, symbol }) => {
  const streamedSoFar = calculateStreamedSoFar(streamedUntilUpdatedAt, updatedAtTimestamp, currentFlowRate);

  return <div>Gas Used So Far: {streamedSoFar ? <Balance balance={streamedSoFar} symbol={symbol} /> : <LoadingSpinner />}</div>;
};
