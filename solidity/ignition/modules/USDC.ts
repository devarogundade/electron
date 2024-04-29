import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";

const USDCModule = buildModule("USDCModule", (m) => {
  const account = m.getAccount(0);

  const usdc = m.contract("USDC", [], { from: account });

  return { usdc };
});

export default USDCModule;
