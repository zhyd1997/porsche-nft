import { BigNumber, ethers } from 'ethers';
import React, { FC } from 'react';
import { Balance } from './Balance';
import { LoadingSpinner } from './LoadingSpinner';

type SpeedProps = {
  currentFlowrate: string;
  symbol: string;
};

export const Speed: FC<SpeedProps> = ({ currentFlowrate, symbol }) => {
  const flowRateInHour = ethers.utils.formatEther(BigNumber.from(currentFlowrate).mul(60 * 60));

  return <div>Speed: {flowRateInHour ? <Balance balance={flowRateInHour} symbol={symbol} suffix={'/ hour'} /> : <LoadingSpinner />}</div>;
};
