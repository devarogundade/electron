// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Data} from "../core/libraries/Data.sol";

import {IVerifier} from "./interfaces/IVerifier.sol";
import {IUltraVerifier} from "./interfaces/IUltraVerifier.sol";

import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";

contract Verifier is IVerifier, Ownable2Step {
    mapping(bytes32 => Data.Verifier) private _verifiers;

    constructor() Ownable2Step() {}

    function verify(
        Data.Proof calldata proof
    ) external view override returns (bool, uint8) {
        IUltraVerifier verifier = IUltraVerifier(
            _verifiers[proof.proofId].verifierId
        );

        bool verified = verifier.verify(proof.data, proof.pubInputs);
        uint8 points = _verifiers[proof.proofId].points;

        return (verified, points);
    }

    function addProof(
        bytes32 proofId,
        address verifierId,
        uint8 points
    ) external onlyOwner {
        _verifiers[proofId] = Data.Verifier({
            verifierId: verifierId,
            points: points
        });
    }
}
