import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { Rivalz2 } from "./chains/rivalz-testnet";

const projectId = "c8c689289f7b3547fc20222dfa21f7d2";

const chains = [Rivalz2] as const;

export type ValidChainId = (typeof chains)[number]["id"] | undefined;

export const initialChainId = Rivalz2.id;

export const wagmiAppConfig = getDefaultConfig({
  appName: "ADCS",
  projectId,
  chains,
  transports: {
    [initialChainId]: http(),
  },
  ssr: true,
});
