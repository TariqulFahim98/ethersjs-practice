/**
 * provider.js
 * 
 * Quick Ethers.js v6 refresher:
 * - Connect to a JSON-RPC provider (Sepolia testnet via Alchemy)
 * - Read current block number
 * - Read account balance
 * - Convert between BigNumber and ETH
 * - Check transaction count (nonce)
 */
require("dotenv").config(); // Load .env variables
const { ethers } = require("ethers"); // Import Ethers.js library

// -----------------------------
// 1️⃣ Connect to a provider
// -----------------------------
// JSON-RPC provider in .env file from Alchemy (Sepolia testnet)
const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);

// -----------------------------
// 2️⃣ Main async function
// -----------------------------
async function main() {
    // Example wallet address (replace with any address you want to inspect)
    const add = "0xDB257DC850e80575D8959f39FAB50F25A10B2a83";

    // -----------------------------
    // 2a. Get current block number
    // -----------------------------
    const currentBlock = await provider.getBlockNumber();
    console.log("🟢 Current Sepolia block number:", currentBlock);

    // -----------------------------
    // 2b. Get account balance
    // -----------------------------
    const balanceBig = await provider.getBalance(add); // returns BigNumber in wei
    console.log("Balance (wei):", balanceBig.toString()); // raw wei

    // Convert BigNumber (wei) to human-readable ETH
    const balanceEth = ethers.formatEther(balanceBig);
    console.log("Balance (ETH):", balanceEth);

    // -----------------------------
    // 2c. Convert ETH to BigNumber (wei)
    // -----------------------------
    const valueInEth = "1.5"; // 1.5 ETH
    const valueBig = ethers.parseEther(valueInEth); // convert to BigNumber in wei
    console.log(`1️⃣ 5 ETH as BigNumber (wei):`, valueBig.toString());

    // -----------------------------
    // 2d. Get transaction count (nonce)
    // -----------------------------
    const txCount = await provider.getTransactionCount(add);
    console.log("Transaction count (nonce):", txCount);
}

// -----------------------------
// 3️⃣ Execute main function
// -----------------------------
main();
