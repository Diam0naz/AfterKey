"use client";

import { ReactNode } from "react";
import { StarknetConfig, publicProvider } from "@starknet-react/core";
import { sepolia, mainnet } from "@starknet-react/chains";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <StarknetConfig 
      chains={[sepolia, mainnet]} 
      provider={publicProvider()} 
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
