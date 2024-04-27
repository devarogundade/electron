// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IDataFeed {
    error InvalidFeed();
    error InvalidTokenId(address tokenId);

    event NewPriceFeed(address indexed tokenId, address priceFeed);

    function addDataFeed(address tokenId, address priceFeed) external;

    function addUsdFeed(address priceFeed) external;

    function getPriceData(
        address tokenId
    ) external view returns (int256, uint80);

    function getUsd() external view returns (address);

    function amountInUsd(
        address tokenId,
        uint256 amount
    ) external returns (uint256);

    function convertFromTo(
        address _base,
        address _quote,
        uint256 _amount
    ) external returns (uint256);
}
