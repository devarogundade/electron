import type { Token } from '@/types';

const tokens: Token[] = [
    {
        tokenId: '0x',
        name: 'Ethereum',
        symbol: 'ETH',
        image: '/images/eth.png'
    },
    {
        tokenId: '0x',
        name: 'Link',
        symbol: 'LINK',
        image: '/images/link.png'
    },
    {
        tokenId: '0x',
        name: 'Tether USD',
        symbol: 'USDT',
        image: '/images/usdt.png'
    },
    {
        tokenId: '0x',
        name: 'Circle USD',
        symbol: 'USDC',
        image: '/images/usdc.png'
    }
];

export function getToken(tokenId: `0x${string}`): Token | undefined {
    return tokens.find((token) => token.tokenId.toLowerCase() == tokenId.toLowerCase());
}
