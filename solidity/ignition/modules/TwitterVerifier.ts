import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";

const TwitterVerifierModule = buildModule("TwitterVerifierModule", (m) => {
  const account = m.getAccount(0);

  const twitterVerifier = m.contract("TwitterVerifier", [], { from: account });

  return { twitterVerifier };
});

export default TwitterVerifierModule;
