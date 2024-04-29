import type { Token } from './../types';
import { config } from './config';
import { waitForTransactionReceipt, writeContract, readContract } from '@wagmi/core';
import { dataFeedAbi } from "@/contracts/datafeed_abi";
import { tokenAbi } from '@/contracts/token_abi';

const dataFeedId: `0x${string}` = "0x9a8D0EC997764d76eD6CaA2e5afcb8be2D4E7560";

export async function getAllowance(tokenId: `0x${string}`, address: `0x${string}`, spender: `0x${string}`) {
    try {
        return await readContract(config, {
            abi: tokenAbi,
            address: tokenId,
            functionName: 'allowance',
            args: [address, spender]
        });
    } catch (error) {
        console.log(error);

        return 0;
    }
}

export async function approve(tokenId: `0x${string}`, spender: `0x${string}`, amount: string) {
    try {
        const result = await writeContract(config, {
            abi: tokenAbi,
            address: tokenId,
            functionName: 'approve',
            args: [spender, BigInt(amount)]
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function convertFromTo(baseTokenId: `0x${string}`, quoteTokenId: `0x${string}`, amount: string): Promise<any> {
    try {
        return await readContract(config, {
            abi: dataFeedAbi,
            address: dataFeedId,
            functionName: 'convertFromTo',
            args: [baseTokenId, quoteTokenId, BigInt(amount)]
        });
    } catch (error) {
        console.log(error);

        return 0;
    }
}

export async function faucet(tokenId: `0x${string}`): Promise<any> {
    try {
        const result = await writeContract(config, {
            abi: tokenAbi,
            address: tokenId,
            functionName: 'faucet'
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function addToWallet(token: Token) {
    try {
        // @ts-ignore
        await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: token.tokenId,
                    symbol: token.symbol,
                    decimals: '18',
                    image: 'https://zk-electron.netlify.app/images/' + token.image + '.png',
                },
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}