import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import * as Sentry from '@sentry/nextjs';
import { Details } from './Details';

export const Account = () => {
  const { data, isError, isLoading } = useAccount();
  const { activeChain } = useNetwork();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (data?.address) {
      Sentry.setUser({ account: data.address });
    }
  }, [data]);

  if (!isInitialized) return null;

  if (isLoading) return <div>Loading account…</div>;
  if (isError) return <div>Error loading account</div>;
  return <Details account={data?.address || ''} activeChain={activeChain} />;
};
