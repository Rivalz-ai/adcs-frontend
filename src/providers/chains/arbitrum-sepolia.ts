import { defineChain } from 'viem';

export const ArbitrumSepolia = defineChain({
  id: 421614,
  name: 'Arbitrum Sepolia',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://endpoints.omniatech.io/v1/arbitrum/sepolia/public'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arbitrum Sepolia',
      url: 'https://sepolia-explorer.arbitrum.io',
    },
  },
  testnet: true,
});
