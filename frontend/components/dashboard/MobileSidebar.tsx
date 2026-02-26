"use client";

import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, LayoutDashboard, Wallet, Users, Settings } from "lucide-react";

export default function MobileSidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { name: "Trustees", href: "/dashboard/trustees", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];
  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm md:hidden"
          />

          {}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-101 h-full w-72 bg-slate-950 border-r border-slate-800 p-6 md:hidden shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <span className="text-xl font-bold text-white">AfterKey</span>
              <button
                onClick={toggleSidebar}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={toggleSidebar}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-medium transition-all ${
                    pathname === item.href
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "text-slate-400 hover:bg-slate-900"
                  }`}>
                  <item.icon size={22} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
