import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// import { providers } from "ethers";
// import { Connector, Provider, chain, defaultChains } from "wagmi";
// import { InjectedConnector } from "wagmi/connectors/injected";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import { WalletLinkConnector } from "wagmi/connectors/walletLink";

// Imports
import { chain, createClient, WagmiProvider } from "wagmi";

import "@rainbow-me/rainbowkit/styles.css";

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";

const alchemyId = import.meta.env.VITE_ALCHEMY_ID as string;

const hardhatChain: Chain = {
  id: 31337,
  name: "Hardhat",
  nativeCurrency: {
    decimals: 18,
    name: "Hardhat",
    symbol: "HARD",
  },
  rpcUrls: {
    default: "http://127.0.0.1:8545",
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai, hardhatChain],
  [apiProvider.alchemy(alchemyId), apiProvider.fallback()]
);

const { connectors } = getDefaultWallets({
  appName: "Building Blocks",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// import "./index.css";
// import App from "./App";

// const chains = defaultChains;
// const defaultChain = chain.mainnet;
// const alchemyId = import.meta.env.VITE_ALCHEMY_ID as string;
// const infuraId = import.meta.env.VITE_PROD_INFURA_ID as string;

// // Set up connectors
// type ConnectorsConfig = { chainId?: number };
// const connectors = ({ chainId }: ConnectorsConfig) => {
//   // const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? defaultChain.rpcUrls[0];
//   return [
//     new InjectedConnector({ chains, options: { shimDisconnect: true } }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         infuraId,
//         qrcode: true,
//       },
//     }),
//     // new WalletLinkConnector({
//     //   chains,
//     //   options: {
//     //     appName: 'wagmi',
//     //     jsonRpcUrl: `${rpcUrl}/${infuraId}`,
//     //   },
//     // }),
//   ];
// };

// // Set up providers
// type ProviderConfig = { chainId?: number; connector?: Connector };
// const isChainSupported = (chainId?: number) =>
//   chains.some((x) => x.id === chainId);

// // Set up providers
// const provider = ({ chainId }: ProviderConfig) =>
//   providers.getDefaultProvider(
//     isChainSupported(chainId) ? chainId : defaultChain.id,
//     {
//       alchemy: alchemyId,
//       infura: infuraId,
//     }
//   );
// const webSocketProvider = ({ chainId }: ConnectorsConfig) =>
//   isChainSupported(chainId)
//     ? new providers.InfuraWebSocketProvider(chainId, infuraId)
//     : undefined;

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <HashRouter>
          <App />
        </HashRouter>
      </RainbowKitProvider>
    </WagmiProvider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <WagmiProvider client={wagmiClient}>
//       <RainbowKitProvider coolMode chains={chains}>
//         <HashRouter>
//           <App />
//         </HashRouter>
//       </RainbowKitProvider>
//     </WagmiProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
