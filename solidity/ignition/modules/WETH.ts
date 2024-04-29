import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";

const WETHModule = buildModule("WETHModule", (m) => {
  const account = m.getAccount(0);

  const weth = m.contract("WETH", [], { from: account });

  return { weth };
});

export default WETHModule;
