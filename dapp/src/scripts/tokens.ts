import type { Token } from '@/types';

const tokens: Token[] = [
    {
        tokenId: '0x123C02cAabfd1c16f50Ea41Ca3AeB87e496340D8',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        image: '/images/eth.png'
    },
    {
        tokenId: '0xB14A93E639e33fc073E5D579B20473d5FfBEE42a',
        name: 'Chainlink',
        symbol: 'LINK',
        image: '/images/link.png'
    },
    {
        tokenId: '0x55dED2680BcBcB5a7b26caE8F516a9Ec36eaAbAE',
        name: 'Tether USD',
        symbol: 'USDT',
        image: '/images/usdt.png'
    },
    {
        tokenId: '0xfaF21d390349872CFA58B2FCbabd637b63B253c8',
        name: 'Circle USD',
        symbol: 'USDC',
        image: '/images/usdc.png'
    }
];

export function getToken(tokenId: `0x${string}`): Token | undefined {
    return tokens.find((token) => token.tokenId.toLowerCase() == tokenId.toLowerCase());
}
