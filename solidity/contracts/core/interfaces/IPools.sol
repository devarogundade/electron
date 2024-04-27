// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";

interface IPools {
    function createPool(Data.Pool memory pool) external returns (uint256);

    function getPool(uint256 poolId) external view returns (Data.Pool memory);

    function hasPendingLoan(
        uint256 poolId,
        address account
    ) external view returns (bool);

    function calculateRewards(
        uint256 principal,
        uint256 startDate,
        uint256 interest
    ) external view returns (uint256);

    function getPosition(
        uint256 poolId,
        address account
    ) external view returns (Data.Position memory);

    function getLoan(
        uint256 poolId,
        address account
    ) external view returns (Data.Loan memory);

    function createPosition(
        uint256 poolId,
        uint256 principal,
        address account
    ) external;

    function createLoan(
        uint256 poolId,
        uint256 principal,
        uint256 collateral,
        address account
    ) external;

    function getPrincipalInUsd(
        uint256 collateralInUsd,
        uint8 totalLtv
    ) external view returns (uint256);

    function closePosition(uint256 poolId, address account) external;

    function closeLoan(uint256 poolId, address account) external;
}
