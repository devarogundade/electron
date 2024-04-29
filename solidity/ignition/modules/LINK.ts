import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";

const LINKModule = buildModule("LINKModule", (m) => {
  const account = m.getAccount(0);

  const link = m.contract("LINK", [], { from: account });

  return { link };
});

export default LINKModule;
