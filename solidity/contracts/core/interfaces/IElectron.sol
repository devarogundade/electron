// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";

interface IElectron {
    error HasPendingLoan();

    event NewPool(
        uint256 poolId,
        address principalId,
        address collateralId,
        uint256 totalSupplied,
        uint256 totalBorrowed,
        uint256 interest
    );

    event NewLoan(
        uint256 poolId,
        address account,
        uint256 principal,
        uint256 collateral,
        Data.State state,
        uint256 startDate
    );

    event NewPosition(
        uint256 poolId,
        address account,
        uint256 collateral,
        uint256 startDate
    );

    event CloseLoan(
        uint256 poolId,
        address account,
        Data.State state,
        uint256 repaidDate
    );

    event ClosePosition(uint256 poolId, address account);

    function supply(uint256 poolId, uint256 collateral) external;

    function borrow(uint256 poolId, Data.Proof[] memory proofs) external;

    function withdraw(uint256 poolId) external;

    function repay(uint256 poolId) external;
}
