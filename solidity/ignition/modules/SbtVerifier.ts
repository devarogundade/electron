import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";

const SbtVerifierModule = buildModule("SbtVerifierModule", (m) => {
  const account = m.getAccount(0);

  const sbtVerifier = m.contract("SbtVerifier", [], { from: account });

  return { sbtVerifier };
});

export default SbtVerifierModule;
