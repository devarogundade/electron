// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "./libraries/Data.sol";
import {IPools} from "./interfaces/IPools.sol";
import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";

contract Pools is IPools, Ownable2Step {
    /// @dev The units of precision equal to the minimum interestRate.
    uint256 public constant INTEREST_RATE_DENOMINATOR = 1e18;
    uint16 public constant PERCENT = 100;

    mapping(uint256 => Data.Pool) private _pools;

    mapping(address => mapping(uint256 => Data.Loan)) private _loans;

    mapping(address => mapping(uint256 => Data.Position)) private _positions;

    uint256 private _poolIdTracker = 1;

    address private _electronId;

    constructor() Ownable2Step() {}

    function createPool(
        Data.Pool memory pool
    ) external override onlyElectron returns (uint256) {
        uint256 poolId = _poolIdTracker;

        _pools[poolId] = pool;

        _poolIdTracker++;

        return poolId;
    }

    function getPool(
        uint256 poolId
    ) external view override returns (Data.Pool memory) {
        return _pools[poolId];
    }

    function hasPendingLoan(
        uint256 poolId,
        address account
    ) external view override returns (bool) {
        return _loans[account][poolId].state == Data.State.ACTIVE;
    }

    function calculateRewards(
        uint256 principal,
        uint256 startDate,
        uint256 interest
    ) external view override returns (uint256) {
        uint256 durationSecs = (block.timestamp - startDate);
        return getInterest(principal, durationSecs, interest);
    }

    function getPosition(
        uint256 poolId,
        address account
    ) external view override returns (Data.Position memory) {
        return _positions[account][poolId];
    }

    function getLoan(
        uint256 poolId,
        address account
    ) external view override returns (Data.Loan memory) {
        return _loans[account][poolId];
    }

    function createPosition(
        uint256 poolId,
        uint256 collateral,
        address account
    ) external override onlyElectron {
        _positions[account][poolId] = Data.Position({
            poolId: poolId,
            collateral: collateral,
            startDate: block.timestamp
        });

        _pools[poolId].totalSupplied += collateral;
    }

    function createLoan(
        uint256 poolId,
        uint256 principal,
        uint256 collateral,
        address account
    ) external override onlyElectron {
        _loans[account][poolId] = Data.Loan({
            poolId: poolId,
            state: Data.State.ACTIVE,
            principal: principal,
            collateral: collateral,
            startDate: block.timestamp,
            repaidDate: 0
        });

        _pools[poolId].totalBorrowed += principal;
    }

    function closePosition(
        uint256 poolId,
        address account
    ) external override onlyElectron {
        uint256 collateral = _positions[account][poolId].collateral;

        delete _positions[account][poolId];

        _pools[poolId].totalSupplied -= collateral;
    }

    function closeLoan(
        uint256 poolId,
        address account
    ) external override onlyElectron {
        Data.Loan storage loan = _loans[account][poolId];

        if (loan.state != Data.State.ACTIVE) {
            revert();
        }

        loan.repaidDate = block.timestamp;
        loan.state = Data.State.REPAID;

        _pools[poolId].totalBorrowed -= loan.principal;
    }

    function getPrincipalInUsd(
        uint256 collateralInUsd,
        uint8 totalLtv
    ) external pure override returns (uint256) {
        return percentageOf(collateralInUsd, totalLtv);
    }

    function getInterest(
        uint256 principal,
        uint256 durationSecs,
        uint256 interestRate
    ) internal pure virtual returns (uint256) {
        uint256 accrued = (principal * interestRate * durationSecs) /
            INTEREST_RATE_DENOMINATOR /
            PERCENT;

        return principal + accrued;
    }

    function percentageOf(
        uint256 total,
        uint8 percent
    ) internal pure virtual returns (uint256) {
        if (percent == 0) return total;
        return (total * percent) / PERCENT;
    }

    function newElectronId(address electronId) external onlyOwner {
        _electronId = electronId;
    }

    modifier onlyElectron() {
        require(_msgSender() == _electronId, "Only Owner");
        _;
    }
}
