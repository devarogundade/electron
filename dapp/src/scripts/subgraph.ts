import axios from 'axios';
import type { Loan, Pool, Position } from "@/types";

const endPoint = 'https://api.studio.thegraph.com/query/73053/electron/version/latest';

export async function getPools(): Promise<Pool[]> {
    try {
        const response = await axios.post(endPoint,
            {
                query: `{
                    newPools {
                        id
                        poolId
                        interest
                        principalId
                        collateralId
                        totalSupplied
                        totalBorrowed
                        blockTimestamp
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
                        poolId
                        principalId
                        collateralId
                        totalSupplied
                        totalSupplied
                        blockTimestamp
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
                        poolId
                        account
                        principal
                        state
                        collateral
                        startDate
                        repaidDate
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
                        poolId
                        account
                        principal
                        state
                        collateral
                        startDate
                        repaidDate
                        blockTimestamp
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
                        poolId
                        collateral
                        startDate
                        blockTimestamp 
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
                    newPosition(id: "${account.toLowerCase()}${poolId.toString()}") {
                        id
                        poolId
                        collateral
                        startDate
                        blockTimestamp 
                    }
                }`
            }
        );


        console.log(response);

        return response.data.data.newPosition;
    } catch (error) {
        return null;
    }
}