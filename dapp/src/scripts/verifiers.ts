import type { Verifier } from '@/types';

const verifiers: Verifier[] = [
    {
        proofId: "0x66756e64735f6f6e5f6f746865725f636861696e730000000000000000000000",
        points: 3,
        description: 'Proof that you have some funds in a different wallet on scroll.',
        tag: 'on-chain'
    },
    {
        proofId: "0x7477697474657200000000000000000000000000000000000000000000000000",
        points: 2,
        description: 'Proof that you have an active twitter account.',
        tag: 'social'
    },
    {
        proofId: "0x7477697474657200000000000000000000000000000000000000000000000000",
        points: 2,
        description: 'Proof that you are an Ethereum validator.',
        tag: 'social'
    }
];

export function getVerifiers(): Verifier[] {
    return verifiers;
}

export function getVerifier(proofId: `0x${string}`): Verifier | undefined {
    return verifiers.find((verifier) => verifier.proofId.toLowerCase() == proofId.toLowerCase());
}
