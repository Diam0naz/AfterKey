"use client";

import { usePrivy } from "@privy-io/react-auth";
import { getStarknetAccount } from "@/lib/wallet";
import { useAppStore } from "@/lib/store";
import NotificationBell from "./NotificationBell";
import MobileSidebar from "./MobileSidebar";
import { LogOut, Menu } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { logout, user, ready } = usePrivy();
  const { toggleSidebar } = useAppStore();
  const [starknetAddress, setStarknetAddress] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (ready && user?.id) {
      const { address } = getStarknetAccount(user.id);
      setStarknetAddress(address);
    }
  }, [ready, user?.id]);

  const handleLogout = async () => {
    await logout();
    router.push("/auth");
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Toggle sidebar">
          <Menu className="text-slate-300" size={24} />
        </button>
        <div className="hidden md:flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-400">
            Vault:{" "}
            <span className="text-slate-200 font-mono">
              {starknetAddress
                ? `${starknetAddress.slice(0, 6)}…${starknetAddress.slice(-4)}`
                : "Initializing..."} 
            </span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <NotificationBell />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all">
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
      <MobileSidebar />
    </>
  );
}
