import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import WETHModule from "./WETH";
import USDTModule from "./USDT";
import USDCModule from "./USDC";
import LINKModule from "./LINK";
import PoolsModule from "./Pools";
import DataFeedModule from "./DataFeed";
import VerifierModule from "./Verifier";

const ElectronModule = buildModule("ElectronModule", (m) => {
  const account = m.getAccount(0);

  const { pools } = m.useModule(PoolsModule);
  const { dataFeed } = m.useModule(DataFeedModule);
  const { verifier } = m.useModule(VerifierModule);

  const electron = m.contract("Electron", [pools, dataFeed, verifier], { from: account });

  const { usdt } = m.useModule(USDTModule);
  const { usdc } = m.useModule(USDCModule);

  const { weth } = m.useModule(WETHModule);
  const { link } = m.useModule(LINKModule);

  m.call(pools, "newElectronId", [electron], { from: account });

  m.call(electron, "newPool",
    [{
      principalId: usdt,
      collateralId: weth,
      totalSupplied: 0,
      totalBorrowed: 0,
      interest: "2340000000000000000"
    }],
    { id: 'first_pool', from: account }
  );

  m.call(electron, "newPool",
    [{
      principalId: usdc,
      collateralId: link,
      totalSupplied: 0,
      totalBorrowed: 0,
      interest: "3750000000000000000"
    }],
    { id: 'second_pool', from: account }
  );

  return { electron };
});

export default ElectronModule;
