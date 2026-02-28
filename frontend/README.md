# 🔐 AfterKey

AfterKey is a non-custodial digital legacy vault built on Starknet.  
It allows users to securely store digital assets and assign trustees who can inherit them after a defined period of inactivity.

Built with:
- Next.js 14
- Starknet (Sepolia)
- OpenZeppelin Account
- Privy Authentication
- TailwindCSS

---

## 🚀 Features

- 🧠 Deterministic Starknet Smart Accounts (derived from Privy ID)
- 🔒 Non-custodial wallet architecture
- 💰 STRK balance tracking
- ⚡ Automatic account deployment when funded
- 👥 Trustee management
- 🛡 Subscription-based legacy execution logic
- 📊 Vault dashboard with status tracking

---

## 🏗 Architecture Overview

Each user:

1. Authenticates using Privy
2. Gets a deterministic Starknet smart account
3. Funds the vault address
4. Account auto-deploys on-chain
5. Can assign trustees and manage legacy rules

Smart accounts are OpenZeppelin-based and deployed on Starknet Sepolia.

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_STARKNET_RPC=https://sepolia.rpc.starknet.rs
NEXT_PUBLIC_OZ_CLASS_HASH=0x00e29443051402219b56827ac05950ad17435f3365ad07f4661415664bc354fb
```

---

## 🛠 Installation

```bash
npm install
```

Run development server:

```bash
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

## 🧪 Starknet Sepolia Setup

1. Copy your generated vault address from Wallet page
2. Go to Starknet Sepolia Faucet:
   https://faucet.starknet.io
3. Request STRK tokens
4. Once funded, the account auto-deploys
5. Deployment status updates in UI

---

## 📂 Project Structure

```
/app
  /dashboard
  /wallet
/lib
  wallet.ts
  contract.ts
/components
```

### Important Files

- `lib/wallet.ts`  
  Handles deterministic account generation and deployment logic.

- `lib/contract.ts`  
  Initializes and interacts with legacy smart contract.

- `app/wallet/page.tsx`  
  Shows vault address, balance, deployment status.

- `app/dashboard/page.tsx`  
  Displays vault status, trustees, subscription plans.

---

## 🔐 Smart Account Logic

Accounts are derived deterministically:

```ts
privateKey = hash(starknetKeccak(privyId))
```

Address is calculated using:

```
calculateContractAddressFromHash(
  addressSalt,
  classHash,
  constructorCalldata,
  0
)
```

Deployment occurs automatically when STRK balance > 0.

---

## 📦 Deployment

For production:

```bash
npm run build
npm start
```

Or deploy to Vercel.

---

## ⚠️ Important Notes

- This project runs on Starknet Sepolia testnet.
- Never expose private keys in production.
- Smart accounts must be funded before deployment.
- Deployment requires valid OpenZeppelin class hash.

---

## 🛡 Security Model

- Non-custodial (keys derived client-side)
- Smart account abstraction
- No server-side key storage
- Trustee execution requires inactivity logic

---

## 📌 Roadmap

- Multi-token support
- Mainnet support
- Gasless deployment
- Advanced trustee approval logic
- Activity heartbeat automation

---

## 🧑‍💻 Author

Built by the AfterKey team.

---

## 📜 License

MIT License