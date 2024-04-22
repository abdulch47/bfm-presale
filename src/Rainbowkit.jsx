import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([bsc], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "rexx_presale_app",
  projectId: "bb584e1ceffc1bf58f8ec61540791bc6",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const Rainbowkit = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact" //wide,compact
        chains={chains}
        theme={darkTheme({
          accentColor: "rgba(255, 255, 255, 0.2)",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Rainbowkit;
