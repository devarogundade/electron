import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";
// import ElectronModule from "./Electron";

const PoolsModule = buildModule("PoolsModule", (m) => {
  const account = m.getAccount(0);

  const pools = m.contract("Pools", [], { from: account });

  // const { electron } = m.useModule(ElectronModule);

  // Make sure you don't have a circular dependency of modules.
  // m.call(pools, "newElectronId", [electron], { from: account });

  return { pools };
});

export default PoolsModule;
