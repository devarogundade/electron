import axios from 'axios';
import type { Loan, Pool, Position } from "@/types";

const endPoint = 'https://api.thegraph.com/subgraphs/name/devarogundade/electron';

export async function getPools(): Promise<Pool[]> {
    try {
        const response = await axios.post(endPoint,
            {
                query: `{
                    newPools {
                        id
                    }
                }`
            }
        );

        return response.data.data.newPools;
    } catch (error) {
        console.error(error);

        return [];
    }
}

export async function getPool(poolId: number): Promise<Pool | null> {
    try {
        const response = await axios.post(endPoint,
            {
                query: `{
                    newPool(id: ${poolId}) {
                        id
                    }
                }`
            }
        );

        return response.data.data.newPool;
    } catch (error) {
        return null;
    }
}

export async function getLoans(account: `0x${string}`): Promise<Loan[]> {
    try {
        const response = await axios.post(endPoint,
            {
                query: `{
                    newLoans(where: {account: "${account}"}) {
                        id
                    }
                }`
            }
        );

        return response.data.data.newLoans;
    } catch (error) {
        console.error(error);

        return [];
    }
}

export async function getLoan(poolId: number, account: `0x${string}`): Promise<Loan | null> {
    try {
        const response = await axios.post(endPoint,
            {
                query: `{
                    newLoan(id: ${account + poolId.toString()}) {
                        id
                    }
                }`
            }
        );

        return response.data.data.newLoan;
    } catch (error) {
        return null;
    }
}

export async function getPositions(account: `0x${string}`): Promise<Position[]> {
    try {
        const response = await axios.post(endPoint,
            {
                query: `{
                    newPositions(where: {account: "${account}"}) {
                        id
                    }
                }`
            }
        );

        return response.data.data.newPositions;
    } catch (error) {
        console.error(error);

        return [];
    }
}

export async function getPosition(poolId: number, account: `0x${string}`): Promise<Position | null> {
    try {
        const response = await axios.post(endPoint,
            {
                query: `{
                    newPosition(id: ${account + poolId.toString()}) {
                        id
                    }
                }`
            }
        );

        return response.data.data.newPosition;
    } catch (error) {
        return null;
    }
}