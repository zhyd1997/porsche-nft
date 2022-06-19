import { gql } from '@apollo/client';

export const queryDistribution = gql`
  query Distribution($subscriber: String!, $updatedAtTimestamp: String!) {
    indexSubscriptions(where: { subscriber: $subscriber, updatedAtTimestamp: $updatedAtTimestamp }) {
      totalAmountReceivedUntilUpdatedAt
      index {
        totalAmountDistributedUntilUpdatedAt
        token {
          id
          symbol
        }
        indexId
        indexValue
      }
      units
      indexValueUntilUpdatedAt
    }
  }
`;
