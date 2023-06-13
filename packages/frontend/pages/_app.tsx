import localFont from "@next/font/local";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  metaMaskWallet,
  omniWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "../styles/custom.css";
import "../styles/globals.css";

// Import known recommended wallets
import { CeloDance, CeloWallet, Valora } from "@celo/rainbowkit-celo/wallets";

// Import CELO chain information
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";

import Head from "next/head";
import Layout from "../components/Layout";

const { chains, provider } = configureChains(
  [Alfajores, Celo],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains }),
      CeloWallet({ chains }),
      CeloDance({ chains }),
      metaMaskWallet({ chains }),
      omniWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const robotoMono = localFont({
  src: [
    {
      path: "../public/fonts/RobotoMono-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/RobotoMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/RobotoMono-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/RobotoMono-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/RobotoMono-Italic.ttf",
      style: "italic",
    },
    {
      path: "../public/fonts/RobotoMono-Light.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/RobotoMono-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/RobotoMono-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/RobotoMono-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/RobotoMono-Regular.ttf",
    },
    {
      path: "../public/fonts/RobotoMono-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/RobotoMono-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/RobotoMono-Thin.ttf",
      weight: "100",
    },
    {
      path: "../public/fonts/RobotoMono-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-robotomono",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#FF84E2"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍞</text></svg>"
        />
      </Head>

      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} coolMode={true}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
