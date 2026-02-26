import { Account, RpcProvider, ec, hash, CallData, Signer } from "starknet";

export function getStarknetAccount(privyId: string) {
  const safeId = privyId || "fallback_id";
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });
  const privateKey = hash.computeHashOnElements([
    hash.starknetKeccak(safeId),
  ]);
  const publicKey = ec.starkCurve.getStarkKey(privateKey);
  const OZ_CLASS_HASH =
    "0x0617306a3500d02b9e67c8708c353e1a8a25c61309e365021e10260212f45f0d";
  const address = hash.calculateContractAddressFromHash(
    publicKey,
    OZ_CLASS_HASH,
    CallData.compile({ public_key: publicKey }),
    0
  );
  const signer = new Signer(privateKey);
  const account = new Account({
    provider,
    address,
    signer,
  });

  return {
    address,
    privateKey,
    account,
  };
}