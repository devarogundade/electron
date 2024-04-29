export type Verifier = {
    circuitId: string,
    proofId: `0x${string}`;
    description: string;
    tag: string;
    points: number;
};

export type Proof = {
    proofId: `0x${string}`;
    pubInputs: `0x${string}`[];
    data: string;
};

export type Pool = {
    poolId: number;
    principalId: `0x${string}`;
    collateralId: `0x${string}`;
    totalSupplied: string;
    totalBorrowed: string;
    interest: string;
};

export type Position = {
    poolId: number;
    collateral: string;
    startDate: number;
};

export enum State {
    ACTIVE,
    REPAID,
    DEFAULTED
}

export type Loan = {
    poolId: number;
    state: State;
    principal: string;
    collateral: string;
    startDate: number;
    repaidDate: number;
};

export type Token = {
    tokenId: `0x${string}`;
    name: string;
    symbol: string;
    image: string;
};

export interface Message {
    title: string;
    description: string;
    category: string;
    linkTitle?: string;
    linkUrl?: string;
}
