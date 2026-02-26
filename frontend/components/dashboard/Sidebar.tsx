"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, Users, Settings, LogOut } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = usePrivy();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { name: "Trustees", href: "/dashboard/trustees", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col bg-slate-950 border-r border-slate-800/50 p-6 transition-all">
        <Link href="/dashboard">
            <Image src={"/fullLogo.png"} alt="Hero Image" width={200} height={30} className="md:block hidden" />
        </Link>

      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5" 
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-slate-800/50">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
