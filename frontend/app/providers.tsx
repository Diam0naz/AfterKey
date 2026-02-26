"use client";
import { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { StarknetConfig, publicProvider, argent, braavos, useInjectedConnectors, jsonRpcProvider } from "@starknet-react/core";
import { sepolia, mainnet } from "@starknet-react/chains";

export default function Providers({ children }: { children: ReactNode }) {
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors", 
  });

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#6366f1",
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      <StarknetConfig
  chains={[sepolia]}
  provider={jsonRpcProvider({
    rpc: () => ({
      nodeUrl: process.env.NEXT_PUBLIC_STARKNET_RPC!,
    }),
  })}
  connectors={connectors}
  autoConnect
>
  {children}
</StarknetConfig>
    </PrivyProvider>
  );
}
