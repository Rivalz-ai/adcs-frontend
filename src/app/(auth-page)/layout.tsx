"use client";

import { getAccessToken } from "@/libs/utls";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const onCheckToken = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const accessToken = getAccessToken();
    if (!accessToken) {
      router.push("/");
    }
  };

  useEffect(() => {
    onCheckToken();
  }, []);

  return <>{children}</>;
}
