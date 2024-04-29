import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";

import USDTModule from "./USDT";
import USDCModule from "./USDC";
import WETHModule from "./WETH";
import LINKModule from "./LINK";

const DataFeedModule = buildModule("DataFeedModule", (m) => {
  const account = m.getAccount(0);

  const dataFeed = m.contract("DataFeed", [], { from: account });

  const { usdt } = m.useModule(USDTModule);
  const { usdc } = m.useModule(USDCModule);
  const { weth } = m.useModule(WETHModule);
  const { link } = m.useModule(LINKModule);

  m.call(dataFeed, "addDataFeed", [usdt, "0xb84a700192A78103B2dA2530D99718A2a954cE86"], { id: usdt.contractName, from: account });
  m.call(dataFeed, "addDataFeed", [usdc, "0xFadA8b0737D4A3AE7118918B7E69E689034c0127"], { id: usdc.contractName, from: account });
  m.call(dataFeed, "addDataFeed", [weth, "0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41"], { id: weth.contractName, from: account });
  m.call(dataFeed, "addDataFeed", [link, "0xaC3E04999aEfE44D508cB3f9B972b0Ecd07c1efb"], { id: link.contractName, from: account });
  m.call(dataFeed, "addUsdFeed", ["0x9388954B816B2030B003c81A779316394b3f3f11"], { from: account });

  return { dataFeed };
});

export default DataFeedModule;
