import React from "react";
import CurlPlayground from "@/components/share-component/playground";
import { AdaptorItem } from "@/types/adapter-type";
import { useCurlGenerator } from "@/libs/hooks/common/useCurlGenerator";

export interface PlaygroundContainerProps {
  adaptorId: string;
  inputEntity?: Pick<AdaptorItem, "inputEntity">;
}

export default function PlaygroundContainer({
  adaptorId,
  inputEntity,
}: PlaygroundContainerProps) {
  const apiConfig = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
    endpoint: `v2/adapter/run/${adaptorId}`,
    method: "POST" as const,
    // additionalHeaders: {
    //   Accept: "*/*",
    //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    // },
  };

  const { generateCurlCommand } = useCurlGenerator(apiConfig);
  const curlCommand = generateCurlCommand(inputEntity, { input: "string" });

  if (!inputEntity || Object.keys(inputEntity).length === 0) {
    return <></>;
  }

  return (
    <CurlPlayground initialCurlCommand={curlCommand} direction="vertical" />
  );
}
