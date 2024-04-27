// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "./libraries/Data.sol";

import {IPools} from "./interfaces/IPools.sol";
import {IElectron} from "./interfaces/IElectron.sol";
import {IVerifier} from "../zk/interfaces/IVerifier.sol";
import {IDataFeed} from "../chainlink/interfaces/IDataFeed.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";

contract Electron is IElectron, Ownable2Step {
    using SafeERC20 for ERC20;

    uint8 private constant DEFAULT_LTV = 70;

    IPools private _pools;
    IDataFeed private _feed;
    IVerifier private _verifier;

    constructor(
        address pool,
        address dataFeed,
        address verifier
    ) Ownable2Step() {
        _pools = IPools(pool);
        _feed = IDataFeed(dataFeed);
        _verifier = IVerifier(verifier);
    }

    function newPool(Data.Pool memory pool) external onlyOwner {
        uint256 poolId = _pools.createPool(pool);

        emit NewPool(
            poolId,
            pool.principalId,
            pool.collateralId,
            pool.totalSupplied,
            pool.totalBorrowed,
            pool.interest
        );
    }

    /// @notice Explain to an end user what this does
    function supply(uint256 poolId, uint256 principal) external {
        address account = _msgSender();

        // Get the liquidity pool
        Data.Pool memory pool = _pools.getPool(poolId);

        // Extract principal token from account
        ERC20(pool.principalId).safeTransferFrom(
            account,
            address(this),
            principal
        );

        // Create account position in the liquidity pool
        _pools.createPosition(poolId, principal, account);

        emit NewPosition(poolId, account, principal, block.timestamp);
    }

    /// @notice Explain to an end user what this does
    function borrow(
        uint256 poolId,
        uint256 collateral,
        Data.Proof[] memory proofs
    ) external {
        address account = _msgSender();

        // Check if account already has a pending loan
        bool hasPendingLoan = _pools.hasPendingLoan(account);

        if (hasPendingLoan) {
            revert HasPendingLoan();
        }

        // Get the liquidity pool
        Data.Pool memory pool = _pools.getPool(poolId);

        // Extract collateral token from account
        ERC20(pool.collateralId).safeTransferFrom(
            account,
            address(this),
            collateral
        );

        uint8 totalLtv = DEFAULT_LTV;

        for (uint index = 0; index < proofs.length; index++) {
            (bool valid, uint8 points) = _verifier.verify(proofs[index]);
            if (!valid) {
                revert();
            }

            totalLtv += points;
        }

        // Calculate collateral amount in usd
        uint256 collateralInUsd = _feed.amountInUsd(
            pool.collateralId,
            collateral
        );

        // Use collateral worth and overall points to estimate
        // worth of principal account can get
        uint256 principalInUsd = _pools.getPrincipalInUsd(
            collateralInUsd,
            totalLtv
        );

        // Convert worth of principal back to principal
        uint256 principal = _feed.convertFromTo(
            _feed.getUsd(),
            pool.principalId,
            principalInUsd
        );

        // Send principal token to account
        ERC20(pool.principalId).safeTransfer(account, principal);

        // Record account loan
        _pools.createLoan(poolId, principal, collateral, account);

        emit NewLoan(
            poolId,
            account,
            principal,
            collateral,
            Data.State.ACTIVE,
            block.timestamp
        );
    }

    /// @notice Explain to an end user what this does
    function withdraw(uint256 poolId) external {
        address account = _msgSender();

        // Get the account position in the liquidity pool
        Data.Position memory position = _pools.getPosition(poolId, account);

        Data.Pool memory pool = _pools.getPool(poolId);

        // Calculate position rewards in principal token
        uint256 rewards = _pools.calculateRewards(
            position.principal,
            position.startDate,
            pool.interest
        );

        // Sum the rewards and principal
        uint256 principalOut = (position.principal + rewards);

        // Send principal token to account
        ERC20(pool.principalId).safeTransfer(account, principalOut);

        // Close account position in the liquidity pool
        _pools.closePosition(poolId, account);

        emit ClosePosition(poolId, account);
    }

    /// @notice Explain to an end user what this does
    function repay(uint256 poolId) external {
        address account = _msgSender();

        // Get the account loan for pool
        Data.Loan memory loan = _pools.getLoan(poolId, account);

        // Get the liquidity pool
        Data.Pool memory pool = _pools.getPool(poolId);

        // Calculate position rewards in principal token
        uint256 accruedInsterest = _pools.calculateRewards(
            loan.principal,
            loan.startDate,
            pool.interest
        );

        // Sum the rewards and principal
        uint256 principalIn = (loan.principal + accruedInsterest);

        // Extract principal token from account
        ERC20(pool.principalId).safeTransferFrom(
            account,
            address(this),
            principalIn
        );

        // Close account loan
        _pools.closeLoan(poolId, account);

        emit CloseLoan(poolId, account, Data.State.REPAID, block.timestamp);
    }

    /// @notice Emergency token withdraw
    function withdrawTokens(
        address tokenId,
        uint256 amount
    ) external onlyOwner {
        address account = _msgSender();

        // Transfer tokens to account
        ERC20(tokenId).safeTransfer(account, amount);
    }
}
