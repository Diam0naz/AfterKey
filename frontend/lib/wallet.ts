import { Account, RpcProvider, ec, hash, CallData, Signer } from "starknet";

const OZ_CLASS_HASH = "0x00e29443051402219b56827ac05950ad17435f3365ad07f4661415664bc354fb";

export function getStarknetAccount(privyId: string) {
  const safeId = privyId || "fallback_id";
  const NODE_URL = process.env.NEXT_PUBLIC_STARKNET_RPC || "https://sepolia.rpc.starknet.rs";
  const provider = new RpcProvider({ nodeUrl: NODE_URL });
  
  const privateKey = hash.computeHashOnElements([hash.starknetKeccak(safeId)]);
  const publicKey = ec.starkCurve.getStarkKey(privateKey);
  
  const constructorCalldata = CallData.compile({ public_key: publicKey });
  const addressSalt = publicKey;

  const address = hash.calculateContractAddressFromHash(
    addressSalt,
    OZ_CLASS_HASH,
    constructorCalldata,
    0
  );

  const signer = new Signer(privateKey);

const account = new Account({
  provider,
  address,
  signer,
});

  (account as any).deployPayload = {
    classHash: OZ_CLASS_HASH,
    constructorCalldata: constructorCalldata,
    addressSalt: addressSalt,
  };

  return {
    address,
    privateKey,
    account,
  };
}

export async function isAccountDeployed(account: any): Promise<boolean> {
  try {
    if (!account || !account.address) return false;
    await account.provider.getClassAt(account.address);
    return true;
  } catch {
    return false;
  }
}
