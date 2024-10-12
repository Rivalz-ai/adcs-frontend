import { defineChain } from "viem";

export const Rivalz2 = defineChain({
  id: 6966,
  name: "Rivalz2",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rivalz2.rpc.caldera.xyz/http"],
    },
  },
  blockExplorers: {
    default: {
      name: "Rivalz2",
      url: "https://rivalz2.explorer.caldera.xyz/",
    },
  },
  testnet: true,
});
