"use client";
import { useEffect, useState } from "react";
import {
  CurlInput,
  ResponseDisplay,
  ResponseData,
  parseCurl,
  formatJson,
  copyToClipboard,
} from "./components";
import { cn } from "@/lib/utils";

interface CurlPlaygroundProps {
  initialCurlCommand: string;
  direction?: "horizontal" | "vertical";
  className?: string;
}

export default function CurlPlayground({
  initialCurlCommand,
  direction = "vertical",
  className,
}: CurlPlaygroundProps) {
  const [curlCommand, setCurlCommand] = useState(initialCurlCommand);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("response");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurlCommand(initialCurlCommand);
  }, [initialCurlCommand]);

  const executeCurl = async () => {
    setLoading(true);
    setError(null);

    try {
      const { method, url, headers, body } = parseCurl(curlCommand);
      const startTime = Date.now();

      const fetchOptions: RequestInit = {
        method,
        headers,
        ...(body && ["POST", "PUT", "PATCH"].includes(method) && { body }),
      };

      const res = await fetch(url, fetchOptions);
      const endTime = Date.now();

      let responseData: any;
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await res.json();
      } else {
        responseData = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: responseData,
        time: endTime - startTime,
        size: JSON.stringify(responseData).length,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      setResponse(null);
    }

    setLoading(false);
  };

  const exportResponse = () => {
    if (!response) return;

    const exportData = {
      curl: curlCommand,
      response: response,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `curl-response-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await copyToClipboard(text);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className={cn("min-h-screen p-6", className)}>
      <div
        className={cn(
          "flex w-full gap-6 flex-col",
          direction === "horizontal" && "flex-row"
        )}
      >
        <CurlInput
          curlCommand={curlCommand}
          loading={loading}
          error={error}
          setCurlCommand={setCurlCommand}
          onExecute={executeCurl}
          copyToClipboard={handleCopyToClipboard}
        />

        <ResponseDisplay
          response={response}
          activeTab={activeTab}
          loading={loading}
          setActiveTab={setActiveTab}
          onExport={exportResponse}
          copyToClipboard={handleCopyToClipboard}
          formatJson={formatJson}
        />
      </div>
    </div>
  );
}
