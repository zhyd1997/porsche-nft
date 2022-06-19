import { BigNumber, ethers } from 'ethers';

export const calculateReceivedSoFar = (
  publisherIndexValue: string,
  subscriberTotalAmountReceivedUntilUpdatedAt: string,
  subscriberIndexValueUntilUpdatedAt: string,
  subscriberUnits: string
) => {
  const publisherIndexValueBN = BigNumber.from(publisherIndexValue);
  const subscriberTotalAmountReceivedUntilUpdatedAtBN = BigNumber.from(subscriberTotalAmountReceivedUntilUpdatedAt);
  const subscriberIndexValueUntilUpdatedAtBN = BigNumber.from(subscriberIndexValueUntilUpdatedAt);
  const subscriberUnitsBN = BigNumber.from(subscriberUnits);

  const publisherSubscriberDifference = publisherIndexValueBN.sub(subscriberIndexValueUntilUpdatedAtBN).mul(subscriberUnitsBN);

  const totalAmountReceived = subscriberTotalAmountReceivedUntilUpdatedAtBN.add(publisherSubscriberDifference);

  const receivedSoFar = ethers.utils.formatEther(totalAmountReceived);

  return receivedSoFar;
};
