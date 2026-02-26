export default function SettingsPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Wallet Details</h1>

      <div className="bg-white/5 p-6 rounded-xl space-y-4">
        <div>
          <p className="text-gray-400 text-sm">Legacy Data</p>
          <p className="text-sm mt-1">Encrypted seed phrase stored off-chain</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Assets</p>
          <ul className="text-sm mt-1 space-y-1">
            <li>• ETH (logical)</li>
            <li>• NFTs (logical)</li>
            <li>• Custom instructions</li>
          </ul>
        </div>

        <p className="text-xs text-gray-500">
          Assets are represented logically for hackathon demonstration.
        </p>
      </div>
    </div>
  );
}
