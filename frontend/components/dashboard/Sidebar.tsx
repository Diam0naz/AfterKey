import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-gray-800 p-6">
      <h2 className="text-xl bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-500 to-indigo-500 font-bold mb-10">
        🧬 AfterKey
      </h2>

      <nav className="flex flex-col text-gray-200 gap-4">
        <Link href="/dashboard" className="hover:text-purple-400">
          Dashboard
        </Link>
        <Link href="/dashboard/wallet" className="hover:text-purple-400">
          Wallet Details
        </Link>
        <Link href="/dashboard/trustees" className="hover:text-purple-400">
          Trustees
        </Link>
        <Link href="/dashboard/settings" className="hover:text-purple-400">
          Settings
        </Link>
      </nav>
    </aside>
  );
}