"use client";

import useLogin from "@/libs/hooks/apis/auths/useLogin";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function WalletListener() {
  const { address } = useAccount();
  const { login } = useLogin();

  useEffect(() => {
    login();
  }, [address]);

  return <></>;
}
