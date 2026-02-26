import { Contract, Abi, AccountInterface } from "starknet";
import legacyAbi from "./legacyAbi.json";

export const LEGACY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_LEGACY_CONTRACT_ADDRESS || "";

// Use AccountInterface for better type safety in v8
export function getLegacyContract(account: AccountInterface) {
  if (!account || !LEGACY_CONTRACT_ADDRESS) return null;
  
  // The contract instance will use this account to sign transactions automatically
  return new Contract(legacyAbi as Abi, LEGACY_CONTRACT_ADDRESS, account);
}