export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-16 bg-[#11141f] text-gray-400 text-center">
      <p>&copy; {new Date().getFullYear()} AfterKey. All rights reserved.</p>
      <p className="mt-2">Built on StarkNet | Powered by Web3 Technology</p>
    </footer>
  );
}