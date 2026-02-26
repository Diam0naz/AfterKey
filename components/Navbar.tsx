"use client";

import Link from "next/link";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center py-6 px-8 md:px-16 bg-transparent fixed w-full z-50">
      <Image
        src={"/ChatGPT Image Feb 26, 2026, 04_07_13 AM.png"}
        alt="Hero Image"
        width={250}
        height={30}
        className="lg:block hidden"
      />

      <button
        type="button"
        onClick={() => router.back()}
        className="size-10 border-purple-600 border-2 rounded-full relative w-8 h-8 
             flex items-center justify-center
             active:scale-95 transition-transform duration-150 ease-out
             hover:bg-purple-600/10">
        <IoIosArrowBack
          className="text-2xl text-white 
               transition-transform duration-200 ease-out
               active:-translate-x-1"
        />
      </button>

      <div className="space-x-6 hidden md:flex">
        <Link
          href="/signup"
          className="text-white px-4 py-2 rounded-lg hover:shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-300">
          Sign Up
        </Link>

        <Link
          href="/login"
          className="inline-block bg-linear-to-br from-indigo-600 to-purple-600 px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(99,102,241,0.5)] text-sm sm:text-base font-semibold">
          Login
        </Link>
      </div>
    </nav>
  );
}
