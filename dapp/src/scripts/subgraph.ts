import type { Loan, Pool } from "@/types";

const endPoint = 'https://api.thegraph.com/subgraphs/name/devarogundade/electron';

export async function getPools(): Promise<Pool[]> {
    return [];
}

export async function getPool(poolId: number): Promise<Pool | null> {
    return null;
}

export async function getLoans(account: `0x${string}`): Promise<Loan[]> {
    return [];
}