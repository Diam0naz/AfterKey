"use client";

import { useAppStore } from "@/lib/store";
import Link from "next/link";

export default function MobileSidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();

  if (!sidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/60 md:hidden">
      <aside className="absolute left-0 top-0 h-full w-64 bg-gray-950 p-6">
        <button onClick={toggleSidebar} className="mb-6 text-xl">
          ✕
        </button>

        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" onClick={toggleSidebar}>
            Dashboard
          </Link>
          <Link href="/dashboard/wallet" onClick={toggleSidebar}>
            Wallet
          </Link>
          <Link href="/dashboard/trustees" onClick={toggleSidebar}>
            Trustees
          </Link>
          <Link href="/dashboard/settings" onClick={toggleSidebar}>
            Settings
          </Link>
        </nav>
      </aside>
    </div>
  );
}
