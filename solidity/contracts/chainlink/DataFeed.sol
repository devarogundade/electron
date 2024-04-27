// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IDataFeed} from "./interfaces/IDataFeed.sol";

import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/// @title DataFeed powered by chainlink datafeeds
/// @author Arogundade Ibrahim
contract DataFeed is IDataFeed, Ownable2Step {
    address private _usdId;
    mapping(address => address) _priceFeeds;

    constructor() Ownable2Step() {}

    function addDataFeed(
        address tokenId,
        address priceFeed
    ) external override onlyOwner {
        // Set price feed
        _priceFeeds[tokenId] = priceFeed;

        emit NewPriceFeed(tokenId, priceFeed);
    }

    function addUsdFeed(address usdId) external onlyOwner {
        // Set usdc price feed
        _usdId = usdId;
        _priceFeeds[usdId] = usdId;
    }

    function getPriceData(
        address tokenId
    ) public view override returns (int256, uint80) {
        // Check if the price feed was added
        if (_priceFeeds[tokenId] == address(0)) {
            revert InvalidTokenId(tokenId);
        }

        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            _priceFeeds[tokenId]
        );

        (, int256 answer, , , uint80 decimal) = priceFeed.latestRoundData();

        // Check if the answer is non-zero
        if (answer == 0) {
            revert InvalidFeed();
        }

        return (answer, decimal);
    }

    function amountInUsd(
        address tokenId,
        uint256 amount
    ) external view override returns (uint256) {
        return convertFromTo(tokenId, _usdId, amount);
    }

    function getUsdId() external view override returns (address) {
        return _usdId;
    }

    function convertFromTo(
        address _base,
        address _quote,
        uint256 _amount
    ) public view override returns (uint256) {
        (int256 basePrice, ) = getPriceData(_base);
        (int256 quotePrice, ) = getPriceData(_quote);

        return ((uint256(basePrice) * _amount) / uint256(quotePrice));
    }
}
