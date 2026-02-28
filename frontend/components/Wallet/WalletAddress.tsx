"use client";
import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount } from "@/lib/wallet"; 
import { Copy, Check, Wallet } from "lucide-react";

export default function WalletAddress() {
  const { user, ready } = usePrivy();
  const [starknetAddress, setStarknetAddress] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ready && user) {
      const { address } = getStarknetAccount(user.id);
      setStarknetAddress(address);
    }
  }, [user, ready]);

  if (!ready || !starknetAddress) {
    return <div className="animate-pulse text-slate-500 text-sm">Generating Vault...</div>;
  }

  const displayAddr = `${starknetAddress.slice(0, 6)}...${starknetAddress.slice(-4)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(starknetAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-md flex items-center justify-between group min-w-[240px]">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <Wallet size={18} className="text-indigo-400" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Starknet Vault</p>
          <p className="font-mono text-sm text-slate-200">{displayAddr}</p>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="p-2 hover:bg-slate-900 rounded-md transition-colors text-slate-500 hover:text-indigo-400 ml-4"
        title="Copy Address"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
    </div>
  );
}
