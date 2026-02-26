"use client";

import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount } from "@/lib/wallet"; 
import { Copy, Check, Wallet } from "lucide-react";

interface WalletAddressProps {
  address?: string; // Optional prop if passed from Dashboard
}

export default function WalletAddress({ address }: WalletAddressProps) {
  const { user, ready } = usePrivy();
  const [starknetAddress, setStarknetAddress] = useState<string>(address || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // If address wasn't passed as a prop, generate it manually using Privy ID
    if (!address && ready && user?.id) {
      try {
        const { address: generatedAddress } = getStarknetAccount(user.id);
        setStarknetAddress(generatedAddress);
      } catch (error) {
        console.error("Failed to generate Starknet address:", error);
      }
    } else if (address) {
      setStarknetAddress(address);
    }
  }, [user, ready, address]);

  const handleCopy = async () => {
    if (!starknetAddress) return;
    await navigator.clipboard.writeText(starknetAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Loading state while Privy or the Generator is working
  if (!ready || !starknetAddress) {
    return (
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-md flex items-center gap-3 min-w-[240px]">
        <div className="p-2 bg-slate-800 animate-pulse rounded-lg">
          <Wallet size={18} className="text-slate-600" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-16 bg-slate-800 animate-pulse rounded"></div>
          <div className="h-3 w-24 bg-slate-800 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  // Format address for display (e.g., 0x1234...abcd)
  const displayAddr = `${starknetAddress.slice(0, 6)}...${starknetAddress.slice(-4)}`;

  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-md flex items-center justify-between group min-w-[240px] hover:border-indigo-500/30 transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
          <Wallet size={18} className="text-indigo-400" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Starknet Vault</p>
          <p className="font-mono text-sm text-slate-200">{displayAddr}</p>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="p-2 hover:bg-slate-800 rounded-md transition-all text-slate-500 hover:text-indigo-400 ml-4 border border-transparent hover:border-slate-700"
        title="Copy Full Address"
      >
        {copied ? (
          <Check size={16} className="text-green-400 animate-in zoom-in" />
        ) : (
          <Copy size={16} className="group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}