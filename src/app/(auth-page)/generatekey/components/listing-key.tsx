"use client";
import { useGetMyKeys } from "../hooks/api";
import React from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Copy } from "lucide-react";
import { Box, useToast } from "@chakra-ui/react";

export default function ListingKey() {
  const { myKeys } = useGetMyKeys();
  const toast = useToast();

  const handleCopy = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API key copied to clipboard",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div className="space-y-4  bg-[#0C0E12]">
      {myKeys.map((key) => (
        <Box
          sx={{
            border: "1px solid #272637",
            backdropFilter: "blur(10px)",
          }}
          borderRadius="10px"
          px="20px"
          py={"10px"}
          key={key.id}
        >
          <div className="flex items-center justify-between">
            <span className="text-white uppercase">{key.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopy(key.apiKey)}
            >
              <Copy className="h-4 w-4 text-white" />
            </Button>
          </div>
          <div className="w-full h-[1px] bg-gray-700 my-2" />

          <div className="space-y-2 text-xs text-[#94979C]">
            <p>Created: {format(new Date(key.createdAt), "PPp")}</p>
            <p>Expires: {format(new Date(key.expiresAt), "PPp")}</p>
          </div>
        </Box>
      ))}
    </div>
  );
}
