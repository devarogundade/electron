// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IUltraVerifier {
    function verify(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) external view returns (bool);
}
