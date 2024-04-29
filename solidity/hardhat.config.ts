import { vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const MNEMONIC = vars.get("MNEMONIC");
const SCAN_API_KEY = vars.get("SCAN_API_KEY");

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    scrollSepolia: {
      url: `https://sepolia-rpc.scroll.io`,
      chainId: 534351,
      accounts: {
        mnemonic: MNEMONIC,
        initialIndex: 1,
      },
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: SCAN_API_KEY,
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      },
    ],
  },
};