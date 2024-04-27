const Pools = artifacts.require('Pools');
const Electron = artifacts.require('Electron');

const USDT = artifacts.require('USDT');
const USDC = artifacts.require('USDC');
const WETH = artifacts.require('WETH');
const LINK = artifacts.require('LINK');

contract('Pools & Electron', async accounts => {
    // it('Set Electron', async () => {
    //     const pools = await Pools.deployed();

    //     const trx = await pools.newElectronId(Electron.address, { from: accounts[1] });

    //     console.log(trx.tx);
    // });

    // it('Create Pool 1', async () => {
    //     const electron = await Electron.deployed();

    //     const trx = await electron.newPool({
    //         principalId: USDT.address,
    //         collateralId: WETH.address,
    //         totalSupplied: 0,
    //         totalBorrowed: 0,
    //         interest: 6799278
    //     }, { from: accounts[1] });

    //     console.log(trx.tx);
    // });

    // it('Create Pool 2', async () => {
    //     const electron = await Electron.deployed();

    //     const trx = await electron.newPool({
    //         principalId: USDC.address,
    //         collateralId: LINK.address,
    //         totalSupplied: 0,
    //         totalBorrowed: 0,
    //         interest: 8478384
    //     }, { from: accounts[1] });

    //     console.log(trx.tx);
    // });
});