import { config } from './config';
import { abi } from '../contracts/electron_abi';
import { waitForTransactionReceipt, writeContract, readContract } from '@wagmi/core';
import type { Proof } from '@/types';

export const electronId: `0x${string}` = '0x7Cd744Bb278ffF3230Ee8446c40bFCF01b050B12';

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
            functionName: 'borrow',
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

export async function calculateLtv(proofs: Proof[]) {
    try {
        return await readContract(config, {
            abi: abi,
            address: electronId,
            functionName: 'calculateLtv',
            args: [proofs]
        });
    } catch (error) {
        console.log(error);

        return null;
    }
}