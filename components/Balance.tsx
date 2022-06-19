import React, { FC } from 'react';

type BalanceProps = {
  balance: string;
  symbol: string;
  suffix?: string;
};

export const Balance: FC<BalanceProps> = ({ balance, symbol, suffix = '' }) => {
  return (
    <>
      <span style={{ color: 'deeppink' }}>{balance}</span> <span>{symbol}</span>
      {suffix ? <span> {suffix}</span> : ''}
    </>
  );
};
