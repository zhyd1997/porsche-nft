import { gql } from '@apollo/client';

export const queryAccountTokenSnapshot = gql`
  query AccountTokenSnapshot($account: String!, $token: String!) {
    accountTokenSnapshots(where: { account: $account, token: $token }) {
      token {
        id
        symbol
      }
      balanceUntilUpdatedAt
    }
  }
`;
