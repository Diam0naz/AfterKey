"use client";
import React, { useState } from "react";
import { useWallets } from "@privy-io/react-auth";
import { Copy, Check, Wallet } from "lucide-react";

export default function WalletAddress() {
  const { wallets, ready } = useWallets();
  const [copied, setCopied] = useState(false);

  if (!ready) return <div className="animate-pulse text-slate-500 text-sm">Syncing wallets...</div>;

  const primaryWallet = wallets[0];
  if (!primaryWallet) return null;

  const addr = primaryWallet.address;
  const displayAddr = `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-md flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <Wallet size={18} className="text-indigo-400" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Your Wallet</p>
          <p className="font-mono text-sm text-slate-200">{displayAddr}</p>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-500 hover:text-indigo-400"
        title="Copy Address"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
    </div>
  );
}
