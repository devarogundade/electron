// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Data} from "../../core/libraries/Data.sol";

interface IVerifier {
    function verify(
        Data.Proof calldata proof
    ) external view returns (bool, uint8);
}
