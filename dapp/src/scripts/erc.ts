import { erc20Abi } from "viem";
import { config } from './config';
import { waitForTransactionReceipt, writeContract, readContract } from '@wagmi/core';

export async function allowance(tokenId: `0x${string}`, address: `0x${string}`, spender: `0x${string}`) {
    try {
        return await readContract(config, {
            abi: erc20Abi,
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
            abi: erc20Abi,
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