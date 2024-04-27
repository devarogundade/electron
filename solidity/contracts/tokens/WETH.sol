// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20 {
    constructor() ERC20("Ethereum", "WETH") {
        _mint(_msgSender(), 1_000_000 * 1e18);
    }

    function faucet() external {
        _mint(_msgSender(), 100 * 1e18);
    }
}
