import celoGroups from "@celo/rainbowkit-celo/lists";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { Roboto_Mono } from "next/font/google";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "../styles/custom.css";
import "../styles/globals.css";

// Import known recommended wallets

// Import CELO chain information
import { Alfajores, Cannoli, Celo } from "@celo/rainbowkit-celo/chains";

import { GlobalContextProvider } from "@/context/GlobalContext";
import { CAPTCH_SITEKEY } from "@/data/constant";
import Head from "next/head";
import { useRouter } from "next/router";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Layout from "../components/Layout";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;
const { chains, publicClient } = configureChains(
  [Alfajores, Celo, Cannoli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const connectors = celoGroups({
  chains,
  projectId,
  appName: "Mint Toast",
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient,
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getApp = () => {
    return (
      <main className={roboto_mono.className}>
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
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
        </Head>

        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} coolMode={true}>
            <GlobalContextProvider>
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
            </GlobalContextProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </main>
    );
  };

  if (router.pathname.includes("/mint")) {
    return (
      <GoogleReCaptchaProvider
        reCaptchaKey={CAPTCH_SITEKEY as string}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        {getApp()}
      </GoogleReCaptchaProvider>
    );
  }

  return <>{getApp()}</>;
}

export default App;
