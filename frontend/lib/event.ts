import { RpcProvider, num } from "starknet";
import { LEGACY_CONTRACT_ADDRESS } from "./contract";

export async function fetchEvents() {
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });

  if (!LEGACY_CONTRACT_ADDRESS) {
    console.warn("No contract address found for event fetching.");
    return [];
  }

  try {
    const events = await provider.getEvents({
      address: LEGACY_CONTRACT_ADDRESS,
      from_block: { block_number: 0 },
      to_block: "pending",
      keys: [], 
      chunk_size: 10,
    });

    return events.events;
  } catch (error) {
    console.error("Failed to fetch Starknet events:", error);
    return [];
  }
}
