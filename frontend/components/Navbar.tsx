"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 px-8 md:px-16 bg-transparent fixed w-full z-50">
      <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-500 to-indigo-500">
        AfterKey
      </div>

      <div className="space-x-6 hidden md:flex">
        <Link href="/signup" className="text-white px-4 py-2 rounded-lg">
          Sign Up
        </Link>
        <Link href="/login" className="px-4 py-2 rounded-lg">
          Login
        </Link>
      </div>
    </nav>
  );
}