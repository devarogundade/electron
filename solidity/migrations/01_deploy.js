const DataFeed = artifacts.require('DataFeed');
const Verifier = artifacts.require('Verifier');
const Pools = artifacts.require('Pools');
const Electron = artifacts.require('Electron');

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(DataFeed);
    await deployer.deploy(Verifier);
    await deployer.deploy(Pools);
    await deployer.deploy(Electron, Pools.address, DataFeed.address, Verifier.address);
};