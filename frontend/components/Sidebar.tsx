"use client";
import Link from "next/link";
const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Trustees", href: "/dashboard/trustees" },
  { name: "Rules", href: "/dashboard/rules" },
  { name: "Activity", href: "/dashboard/activity" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 hidden md:flex flex-col bg-[#050816] border-r border-white/10">
      <div className="p-6 font-bold text-xl">🧬 Legacy</div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block px-4 py-2 rounded-lg hover:bg-white/10"
          >
            {l.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}