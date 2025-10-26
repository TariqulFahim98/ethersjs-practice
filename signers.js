/**
 * signers.js
 * 
 * This script demonstrates:
 * 1. Loading environment variables securely (.env)
 * 2. Connecting to a JSON-RPC provider (Alchemy Sepolia)
 * 3. Creating a wallet from a private key
 * 4. Reading ETH balances
 * 5. Sending ETH to another address
 * 6. Logging transaction details (hash, confirmation, gas)
 * 
 * Safe for testnet usage.
 */

require("dotenv").config(); // Load .env variables
const { ethers } = require("ethers");

// -----------------------------
// Load RPC provider & private key
// -----------------------------
const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
const privateKey = process.env.PRIVATE_KEY;

// Safety check for missing private key
if (!privateKey) {
    console.error("❌ No PRIVATE_KEY found in .env file!");
    process.exit(1);
}

// Create wallet connected to provider
const wallet = new ethers.Wallet(privateKey, provider);

// Target address to send ETH (iceCream example)
const iceCream = "0xF6bFa82a6024Bcdb4873d979ad646e2b1c765ebF";

// -----------------------------
// Main async function
// -----------------------------
async function main() {
    try {
        console.log("💼 Wallet address:", wallet.address);

        // Get balance of target address before sending
        const balanceBefore = await provider.getBalance(iceCream);
        console.log("🍦 iceCream balance (wei):", balanceBefore.toString());
        console.log("🍦 iceCream balance (ETH):", ethers.formatEther(balanceBefore));

        // Amount to send (0.01 ETH)
        const amount = ethers.parseEther("0.01");
        console.log(`🚀 Sending ${ethers.formatEther(amount)} ETH to ${iceCream}...`);

        // Send transaction
        const tx = await wallet.sendTransaction({
            to: iceCream,
            value: amount
        });

        // Log transaction hash immediately
        console.log("🔗 Transaction hash:", tx.hash);

        // Wait for confirmation
        const receipt = await tx.wait();
        console.log("✅ Transaction confirmed in block:", receipt.blockNumber);
        console.log("⛽ Gas used:", receipt.gasUsed.toString());

        // Get balance of target address after sending
        const balanceAfter = await provider.getBalance(iceCream);
        console.log("🍦 iceCream balance after (ETH):", ethers.formatEther(balanceAfter));

    } catch (err) {
        console.error("❌ Transaction failed:", err);
    }
}

// Run the main function
main();
