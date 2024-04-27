import type { Loan, Pool, Position } from "@/types";

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

export async function getLoan(poolId: number, account: `0x${string}`): Promise<Loan | null> {
    return null;
}

export async function getPositions(account: `0x${string}`): Promise<Position[]> {
    return [];
}

export async function getPosition(poolId: number, account: `0x${string}`): Promise<Position | null> {
    return null;
}