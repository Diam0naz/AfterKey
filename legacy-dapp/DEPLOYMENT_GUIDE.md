# 🚀 AfterKey Legacy Contract Deployment Guide

## Prerequisites

Before deploying, you need:

1. **RPC Endpoint** - A working Starknet Sepolia RPC endpoint
   - Options:
     - **Alchemy** (Recommended): https://www.alchemy.com/
     - **Infura**: https://www.infura.io/
     - **Public Endpoints**: May have rate limits

2. **Account Funds** - ETH on Sepolia testnet for gas fees
   - Get testnet ETH from: https://www.alchemy.com/faucets/starknet-sepolia

3. **Account Details** (Already provided):
   - Account Address: `0x02687b5825116aA5DA97c48db82A3Aa9ADC5A12eD81027161c647CD37FD06209`
   - Private Key: `0x00142f1bb820049803e332d347aeaf783aaf67f95f054bf7f9f965b95882b50f`

## ⚠️ SECURITY WARNING

Your private key has been exposed in the deployment script. After deployment, you should:
1. ✅ Complete the deployment
2. 🔄 **IMMEDIATELY rotate the private key**
3. 🔐 Create a new account for production use

## Deployment Steps

### Step 1: Get RPC Endpoint

Visit one of the RPC providers above and get an API key for Starknet Sepolia

### Step 2: Update RPC in Script

Edit `deploy.js` and update the RPC_ENDPOINTS array:

```javascript
const RPC_ENDPOINTS = [
  'https://starknet-sepolia.alchemy.com/v2/YOUR_ALCHEMY_KEY', // Add your Alchemy key
  'https://sepolia.rpc.starknet.rs', 
];
```

### Step 3: Run Deployment

```bash
npm run deploy
```

## Expected Output

```
🚀 Deploying AfterKey Legacy Contract
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Account: 0x02687b5825116aA5DA97c48db82A3Aa9ADC5A12eD81027161c647CD37FD06209
🔗 Network: sepolia
📑 RPC: <your-rpc-endpoint>

📋 Class Hash: 0x26bb15f83c73dd86a7702e09fbbb030af08cf8063bc3d531742116827be054f

✅ Deployment successful!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Contract Address: 0x...
📋 Class Hash: 0x26bb15f83c73dd86a7702e09fbbb030af08cf8063bc3d531742116827be054f
🔗 TX Hash: 0x...
⏱️  Timestamp: 2026-02-27T...

💾 Deployment info saved to deployment.json

🔍 View on Explorer: https://sepolia.starkscan.co/contract/0x...
```

## Contract Details

**Compiled Contract Class Hash:**
```
0x26bb15f83c73dd86a7702e09fbbb030af08cf8063bc3d531742116827be054f
```

**Constructor Parameters:**
- `owner`: Your account address
- `required_approvals`: 1

## Verification

Once deployed, verify on [StarkscanExplorer](https://sepolia.starkscan.co/)

## Next Steps (After Deployment)

1. **Update Frontend**
   - Copy the contract address from `deployment.json`
   - Update `frontend/lib/contract.ts` with the new address

2. **Save Deployment Info**
   - The `deployment.json` file contains all deployment details
   - Commit this to version control (without private key)

3. **Integration**
   - Test contract calls from the frontend
   - Update environment variables with the contract address

## Manual Deployment (Alternative)

If the Node.js script fails, use Starkli CLI:

```bash
# Declare contract
starkli declare target/dev/afterkey_Legacy.contract_class.json \
  --account-address 0x02687b5825116aA5DA97c48db82A3Aa9ADC5A12eD81027161c647CD37FD06209 \
  --private-key 0x00142f1bb820049803e332d347aeaf783aaf67f95f054bf7f9f965b95882b50f \
  --network sepolia

# Deploy contract
starkli deploy <CLASS_HASH> \
  0x02687b5825116aA5DA97c48db82A3Aa9ADC5A12eD81027161c647CD37FD06209 1 \
  --account-address 0x02687b5825116aA5DA97c48db82A3Aa9ADC5A12eD81027161c647CD37FD06209 \
  --private-key 0x00142f1bb820049803e332d347aeaf783aaf67f95f054bf7f9f965b95882b50f \
  --network sepolia
```

## Troubleshooting

**Error: "No working RPC endpoints available"**
- Check your RPC endpoint URL
- Verify API key is valid
- Try a different RPC provider

**Error: "Insufficient balance"**
- Get testnet ETH from faucet
- Wait for transaction to confirm

**Error: "Invalid private key"**
- Double-check the private key format
- Ensure it starts with `0x`
