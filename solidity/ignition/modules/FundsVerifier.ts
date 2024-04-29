import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";

const FundsVerifierModule = buildModule("FundsVerifierModule", (m) => {
  const account = m.getAccount(0);

  const fundsVerifier = m.contract("FundsVerifier", [], { from: account });

  return { fundsVerifier };
});

export default FundsVerifierModule;
