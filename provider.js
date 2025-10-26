const {ethers} = require("ethers");

const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/vdLFhb2yj2KebcytF5iSY");
async function main(){
    const add = "0xDB257DC850e80575D8959f39FAB50F25A10B2a83";
console.log(await provider.getBlockNumber());
const readable = ethers.formatEther(await provider.getBalance(add)); //formatEther => big number to eth value
console.log(readable);
console.log(ethers.parseEther("1.5")); //parseEther => eth value to big number
console.log(await provider.getTransactionCount(add));
}
main();