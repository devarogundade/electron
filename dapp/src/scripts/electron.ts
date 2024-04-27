import { config } from './config';
import { abi } from '../contracts/electron_abi';

import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import type { Proof } from '@/types';

const electronId: `0x${string}` = '0x392CedECa0e6AA0fe45cc70d5d6BC4844C7E4121';

export async function supply(poolId: number, principal: string) {
    try {
        const result = await writeContract(config, {
            abi: abi,
            address: electronId,
            functionName: 'supply',
            args: [poolId, principal]
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function withdraw(poolId: number) {
    try {
        const result = await writeContract(config, {
            abi: abi,
            address: electronId,
            functionName: 'withdraw',
            args: [poolId]
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function borrow(poolId: number, proofs: Proof[]) {
    try {
        const result = await writeContract(config, {
            abi: abi,
            address: electronId,
            functionName: 'repay',
            args: [poolId, proofs]
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function repay(poolId: number) {
    try {
        const result = await writeContract(config, {
            abi: abi,
            address: electronId,
            functionName: 'repay',
            args: [poolId]
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}