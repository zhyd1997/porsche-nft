import { BigNumber, ethers } from "ethers";

export const calculateReceivedSoFar = (
  publisherIndexValue: string,
  subscriberIndexValueUntilUpdatedAt: string,
  subscriberUnits: string
) => {
  const publisherIndexValueBN = BigNumber.from(publisherIndexValue);
  const subscriberIndexValueUntilUpdatedAtBN = BigNumber.from(
    subscriberIndexValueUntilUpdatedAt
  );
  const subscriberUnitsBN = BigNumber.from(subscriberUnits);

  const publisherSubscriberDifference = publisherIndexValueBN
    .sub(subscriberIndexValueUntilUpdatedAtBN)
    .mul(subscriberUnitsBN);

  const receivedSoFar = ethers.utils.formatEther(publisherSubscriberDifference);

  return receivedSoFar;
};
