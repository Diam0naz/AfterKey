"use client";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import Notifications from "./Notifications";

export default function TopNav() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
        ☰
      </button>
      <MobileSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <span className="text-sm text-gray-400">
        {address
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : "Not connected"}
      </span>

      <div className="flex items-center gap-4">
        <button className="relative" onClick={() => setOpen(!open)}>
          🔔           
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        {open && <Notifications />}
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}