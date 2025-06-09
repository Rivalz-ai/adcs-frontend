import CurlPlayground from "@/components/share-component/playground";
import {
  useCurlGenerator,
  UseCurlGeneratorProps,
  MethodType,
} from "@/libs/hooks/common/useCurlGenerator";
import { VerifySubmissionMethod } from "../hooks/type";
import React from "react";

interface SubmissionPlaygroundProps {
  method: VerifySubmissionMethod;
  baseUrl: string;
  apiKey: Record<string, string>;
}

export default function SubmissionPlayground({
  baseUrl,
  method,
  apiKey,
}: SubmissionPlaygroundProps) {
  const apiConfig: UseCurlGeneratorProps = {
    baseUrl,
    endpoint: method.method_name,
    method: method.type as MethodType,
    additionalHeaders: {
      ...apiKey,
    },
  } as const;

  const { generateCurlCommand } = useCurlGenerator(apiConfig);

  const curlCommand = generateCurlCommand(method.input_schema);

  return (
    <CurlPlayground
      initialCurlCommand={curlCommand}
      className="min-h-[30vh]  px-0"
      direction="vertical"
      hideResponseWhenExcuseError={true}
      isShowDescription={false}
    />
  );
}
