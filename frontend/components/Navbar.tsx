"use client";

import Link from "next/link";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex justify-between sm:h-20 items-center px-8 md:px-16 backdrop-blur-lg fixed w-full z-50">
      <Link href="/">
        <Image
        src={"/fullLogo.png"}
        alt="Hero Image"
        width={200}
        height={30}
        className="lg:block hidden"
      />
      </Link>

      <button
        type="button"
        onClick={() => router.back()}
        className="lg:hidden size-10 border-purple-600 my-6 border-2 rounded-full relative w-8 h-8 
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
          href="/login"
          className="rounded-lg border border-white/10 text-gray-300 hover:border-indigo-500/50 hover:text-white px-6 py-2.5 text-sm sm:text-base font-medium transition-colors">
          Login
        </Link>

        <Link
          href="/signup"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all shadow-lg shadow-indigo-500/20">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
