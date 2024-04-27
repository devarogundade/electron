const USDT = artifacts.require('USDT');
const USDC = artifacts.require('USDC');
const WETH = artifacts.require('WETH');
const LINK = artifacts.require('LINK');

const DataFeed = artifacts.require('DataFeed');

contract('DataFeed', async accounts => {
    it('Set USDT feed address', async () => {
        const dataFeed = await DataFeed.deployed();

        const trx = await dataFeed.addDataFeed(
            USDT.address, "0xb84a700192A78103B2dA2530D99718A2a954cE86",
            { from: accounts[1] }
        );

        console.log(trx.tx);
    });

    it('Set USDC feed address', async () => {
        const dataFeed = await DataFeed.deployed();

        const trx = await dataFeed.addDataFeed(
            USDC.address, "0xFadA8b0737D4A3AE7118918B7E69E689034c0127",
            { from: accounts[1] }
        );

        console.log(trx.tx);
    });

    it('Set WETH feed address', async () => {
        const dataFeed = await DataFeed.deployed();

        const trx = await dataFeed.addDataFeed(
            WETH.address, "0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41",
            { from: accounts[1] }
        );

        console.log(trx.tx);
    });

    it('Set LINK feed address', async () => {
        const dataFeed = await DataFeed.deployed();

        const trx = await dataFeed.addDataFeed(
            LINK.address, "0xaC3E04999aEfE44D508cB3f9B972b0Ecd07c1efb",
            { from: accounts[1] }
        );

        console.log(trx.tx);
    });

    it('Set USD feed address', async () => {
        const dataFeed = await DataFeed.deployed();

        const trx = await dataFeed.addUsdFeed(
            "0x9388954B816B2030B003c81A779316394b3f3f11",
            { from: accounts[1] }
        );

        console.log(trx.tx);
    });
});