const Pools = artifacts.require('Pools');
const DataFeed = artifacts.require('DataFeed');
const Verifier = artifacts.require('Verifier');
const Electron = artifacts.require('Electron');

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(DataFeed, { from: accounts[1] });
    await deployer.deploy(Verifier, { from: accounts[1] });
    await deployer.deploy(Pools, { from: accounts[1] });
    await deployer.deploy(Electron, Pools.address, DataFeed.address, Verifier.address, { from: accounts[1] });
};