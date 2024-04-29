import type { Token } from '@/types';

const tokens: Token[] = [
    {
        tokenId: '0x0cc751f65D02344e7daE254c8cCe35538321377c',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        image: '/images/eth.png'
    },
    {
        tokenId: '0x9904E2fd3304f953cD650f20A11Ec7Ba335D010a',
        name: 'Chainlink',
        symbol: 'LINK',
        image: '/images/link.png'
    },
    {
        tokenId: '0x1F7Aa4bE1C357Cd6c40D521ACf99a6a1a7CF2463',
        name: 'Tether USD',
        symbol: 'USDT',
        image: '/images/usdt.png'
    },
    {
        tokenId: '0x890e22930B4e6a3888ffee7CACF0Ca7841779828',
        name: 'Circle USD',
        symbol: 'USDC',
        image: '/images/usdc.png'
    }
];

export function getTokens(): Token[] {
    return tokens;
}


export function getToken(tokenId: `0x${string}`): Token | undefined {
    return tokens.find((token) => token.tokenId.toLowerCase() == tokenId.toLowerCase());
}
