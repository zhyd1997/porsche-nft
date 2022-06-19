# Porsche-NFT

Highlight your **latest** two way market stream with Porsche model.

> Disclaimer: the 911 model is copied from [react-three](https://docs.pmnd.rs/react-three-fiber/getting-started/examples) example.

# Getting Started

```bash
# install dependencies
yarn
# setup environment variables
cp .env.example .env.local
# run in development mode
yarn dev
# run in production mode
yarn build
```
# Usage
> Currently only support on `Polygon Mainnet`.

0. wrap some `USDC` to `USDCx` on [SuperFluid Dashboard](https://app.superfluid.finance/):

![wrap operation](https://ik.imagekit.io/1winv85cn8g/Porsche/wrap_yPbJhrDTa.png)

1. start a `USDCx > RIC` market on [Ricochet Exchange](https://staging.ricochet.exchange/):

![start a stream](https://ik.imagekit.io/1winv85cn8g/Porsche/stream_wKUwfwuRK.png)

> if you can not find the feature above, try this beta app: [Ricochet Trade History Beta Page](https://ricochet-frontend-git-fork-zhyd1997-feat-trade-history-mikeghen.vercel.app/).

2. connect your wallet with this app:

![mobile](https://ik.imagekit.io/1winv85cn8g/Porsche/mobile_ptfAli28y.png)

![web](https://ik.imagekit.io/1winv85cn8g/Porsche/web_zFaBAxYjv.png)

3. you can also setup your own two way market contract if you have some Solidity experiences(optional):

- use this `stream-in-distribute-out` template: [Superfluid official example](https://github.com/superfluid-finance/protocol-monorepo/tree/dev/examples/stream-in-distribute-out).
- and then replace `./constants/exchangeAddress.ts` with your own tokens:

```js
export const exchangeAddress = {
  // stream-in-token
  input: {
    id: '0xcaa7349cea390f89641fe306d93591f87595dc1f',
    symbol: 'USDCx',
  },
  // contract address
  exchange: {
    id: '0x86c2b55bf5d3e9dac2747389b38d41c6b1f34179',
  },
  // distribute-out-token
  output: {
    id: '0x263026e7e53dbfdce5ae55ade22493f828922965',
    symbol: 'RIC',
  },
};

```

