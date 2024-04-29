import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";
import FundsVerifierModule from "./FundsVerifier";
import SbtVerifierModule from "./SbtVerifier";
import TwitterVerifierModule from "./TwitterVerifier";

const VerifierModule = buildModule("VerifierModule", (m) => {
  const account = m.getAccount(0);

  const verifier = m.contract("Verifier", [], { from: account });

  const { fundsVerifier } = m.useModule(FundsVerifierModule);
  const { sbtVerifier } = m.useModule(SbtVerifierModule);
  const { twitterVerifier } = m.useModule(TwitterVerifierModule);

  m.call(verifier, "addProof", ["0x66756e6473566572696669657200000000000000000000000000000000000000", fundsVerifier, 3], { id: fundsVerifier.contractName, from: account });
  m.call(verifier, "addProof", ["0x7362745665726966696572000000000000000000000000000000000000000000", sbtVerifier, 2], { id: sbtVerifier.contractName, from: account });
  m.call(verifier, "addProof", ["0x7477697474657256657269666965720000000000000000000000000000000000", twitterVerifier, 2], { id: twitterVerifier.contractName, from: account });

  return { verifier };
});

export default VerifierModule;
