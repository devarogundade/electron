import type { Verifier } from '@/types';

const verifiers: Verifier[] = [
    {
        circuitId: "8ff30374-ecb0-411b-b513-19f951edb34a",
        proofId: "0x66756e6473566572696669657200000000000000000000000000000000000000",
        points: 3,
        description: 'Prove that your have an active wallet on Ethereum, Polygon, and Binance.',
        tag: 'on-chain'
    },
    {
        circuitId: "ce581f06-e8b1-4eb0-8db8-6a46ae9ddfbc",
        proofId: "0x7477697474657256657269666965720000000000000000000000000000000000",
        points: 2,
        description: 'Proof that you have an active twitter account.',
        tag: 'social'
    },
    {
        circuitId: "b604b4f2-ada1-4f37-a19e-ba26f1b40eb3",
        proofId: "0x7362745665726966696572000000000000000000000000000000000000000000",
        points: 2,
        description: 'Proof that you are an Ethereum validator. Or you have a Binance Soul Bound Token.',
        tag: 'social'
    }
];

export function getVerifiers(): Verifier[] {
    return verifiers;
}

export function getVerifier(proofId: `0x${string}`): Verifier | undefined {
    return verifiers.find((verifier) => verifier.proofId.toLowerCase() == proofId.toLowerCase());
}
