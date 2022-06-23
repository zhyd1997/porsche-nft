export const exchangeAddress = {
  // stream-in-token
  input: {
    id:
      process.env.NEXT_PUBLIC_TOKEN_A_ADDRESS?.toLowerCase() ||
      "0xcaa7349cea390f89641fe306d93591f87595dc1f",
    symbol: process.env.NEXT_PUBLIC_TOKEN_A_SYMBOL || "USDCx",
  },
  // contract address
  exchange: {
    id:
      process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS?.toLowerCase() ||
      "0x86c2b55bf5d3e9dac2747389b38d41c6b1f34179",
  },
  // distribute-out-token
  output: {
    id:
      process.env.NEXT_PUBLIC_TOKEN_B_ADDRESS?.toLowerCase() ||
      "0x263026e7e53dbfdce5ae55ade22493f828922965",
    symbol: process.env.NEXT_PUBLIC_TOKEN_B_SYMBOL || "RIC",
  },
};
