"use client";
import { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { StarknetConfig, publicProvider, argent, braavos, useInjectedConnectors } from "@starknet-react/core";
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
        chains={[sepolia, mainnet]} 
        provider={publicProvider()} 
        connectors={connectors}
        autoConnect
      >
        {children}
      </StarknetConfig>
    </PrivyProvider>
  );
}
