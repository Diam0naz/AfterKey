import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { RiDiscordLine } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";

const socials = [
  {
    icon: <BsTwitterX size={18} />,
    href: "https://twitter.com",
    label: "Twitter",
  },
  { icon: <FiGithub size={18} />, href: "https://github.com/Unique-Ikeoluwa/AfterKey", label: "GitHub" },
  {
    icon: <RiDiscordLine size={20} />,
    href: "https://discord.com",
    label: "Discord",
  },
];

export default function Footer() {
  return (
    <footer className="relative flex flex-col items-center py-12 px-6 md:px-16 bg-[#11141f] text-gray-400 text-center">
      {}
      <div className="flex justify-center items-center gap-4">
        {socials.map(({ icon, href, label }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-indigo-500/60 hover:bg-indigo-500/10 hover:shadow-[0_0_12px_rgba(99,102,241,0.35)] transition-all duration-300">
            {icon}
          </Link>
        ))}
      </div>

      <hr className="bg-linear-to-r via-50% via-indigo-700 border-transparent h-0.5 w-44 my-3.5" />

      <p className="text-sm">
        &copy; {new Date().getFullYear()} AfterKey. All rights reserved.
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Built on StarkNet | Powered by Web3 Technology
      </p>
    </footer>
  );
}
