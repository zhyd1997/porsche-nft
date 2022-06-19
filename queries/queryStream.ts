import { gql } from '@apollo/client';

export const queryStream = gql`
  query LatestActiveStream($sender: String!, $receiver: String!) {
    streams(
      first: 1
      orderBy: createdAtTimestamp
      orderDirection: desc
      where: { sender: $sender, receiver: $receiver, currentFlowRate_gt: "0" }
    ) {
      token {
        id
        symbol
      }
      currentFlowRate
      streamedUntilUpdatedAt
      flowUpdatedEvents {
        transactionHash
      }
      updatedAtTimestamp
    }
  }
`;
