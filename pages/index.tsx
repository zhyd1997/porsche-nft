import type { NextPage } from "next";
import Head from "next/head";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "../styles/Home.module.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Account } from "../components/Account";
import { PorscheModel } from "../components/PorscheModel";
import { Suspense } from "react";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-matic",
  cache: new InMemoryCache(),
});

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const { chains, provider } = configureChains(
  [chain.polygon, chain.optimism],
  [infuraProvider({ infuraId })]
);

const { connectors } = getDefaultWallets({
  appName: "Porsche NFT",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const AUTHOR_ADDRESS = "0xe073B0fb1554390a47aBeCBDD42599a64c7D45DF";

const Home: NextPage = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{
          appName: "Porsche NFT",
          learnMoreUrl: "https://github.com/zhyd1997/porsche-nft.git",
        }}
        coolMode
      >
        <ApolloProvider client={client}>
          <div className={styles.container}>
            <Head>
              <title>Porsche NFT</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
              <div className={styles.github_link_wrapper}>
                <a
                  href="https://github.com/zhyd1997/porsche-nft.git"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon sx={{ fontSize: 40 }} />
                </a>
              </div>
              <div className={styles.connect_button_wrapper}>
                <ConnectButton />
              </div>
              <Account />
            </main>
            <Suspense fallback={null}>
              <PorscheModel />
            </Suspense>

            <footer className={styles.footer}>
              <div>
                Considering donate to me ❤️{" "}
                <a
                  href={`https://polygonscan.com/address/${AUTHOR_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {AUTHOR_ADDRESS}
                </a>
              </div>
            </footer>
          </div>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Home;
