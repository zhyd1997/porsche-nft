import { BigNumber, ethers } from "ethers";

export const calculateStreamedSoFar = (
  streamedUntilUpdatedAt: string,
  balanceTimestamp: string,
  flowRate: string
) => {
  const streamedUntilUpdatedAtBN = BigNumber.from(streamedUntilUpdatedAt);
  const balanceTimestampBN = BigNumber.from(balanceTimestamp).mul(1e3);
  const currentTimestampBN = BigNumber.from(new Date().getTime());
  const flowRateBN = BigNumber.from(flowRate);

  let streamedSoFar;

  if (flowRateBN.isZero()) {
    streamedSoFar = ethers.utils.formatEther(streamedUntilUpdatedAtBN);
  } else {
    streamedSoFar = ethers.utils.formatEther(
      currentTimestampBN.sub(balanceTimestampBN).mul(flowRateBN).div(1e3)
    );
  }

  return streamedSoFar;
};
