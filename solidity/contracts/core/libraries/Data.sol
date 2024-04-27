// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Data {
    struct Verifier {
        address verifierId;
        uint8 points;
    }

    struct Proof {
        bytes32 proofId;
        bytes32[] pubInputs;
        bytes data;
    }

    struct Position {
        uint256 poolId;
        uint256 collateral;
        uint256 startDate;
    }

    struct Pool {
        address principalId;
        address collateralId;
        uint256 totalSupplied;
        uint256 totalBorrowed;
        uint256 interest;
    }

    enum State {
        NONE,
        ACTIVE,
        REPAID,
        DEFAULTED
    }

    struct Loan {
        uint256 poolId;
        State state;
        uint256 principal;
        uint256 collateral;
        uint256 startDate;
        uint256 repaidDate;
    }
}
