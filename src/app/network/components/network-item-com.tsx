import { Box, Flex, Image, Spacer, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { NetworkItem } from "../hooks/api";
import { ExternalLinkIcon } from "@chakra-ui/icons/ExternalLink";
import { openInNewTab, shortAddress } from "@/libs/utls";
import { Copy } from "lucide-react";

export default function NetworkItemCom({ network }: { network: NetworkItem }) {
  const toast = useToast();
  return (
    <Box
      borderRadius="10px"
      borderWidth="1px"
      borderColor="#272637"
      padding="20px"
      bgGradient="radial-gradient(70.61% 50% at 50% 50%, rgba(31, 31, 31, 0.5) 0%, rgba(19, 22, 27, 0.5) 100%)"
      backdropFilter="blur(10px)"
      _hover={{ borderColor: "#2D7D44", cursor: "pointer" }}
      display="flex"
      flexDirection="column"
      gap="20px"
      overflow="hidden"
    >
      <Flex alignItems="flex-start">
        <Box width="100px" height="100px" borderRadius="10px" mr="10px">
          <Image
            src={network.iconUrl || ""}
            alt={network.name}
            width="100%"
            height="100%"
            fallbackSrc="/logo.png"
            objectFit="cover"
          />
        </Box>
        <Flex direction="column" flex="1">
          <Flex alignItems="start" justifyContent="space-between">
            <Text
              color="white"
              fontWeight="bold"
              fontSize="20px"
              lineHeight="24px"
            >
              {network.name}
            </Text>

            <ExternalLinkIcon
              color="#94979C"
              _hover={{ color: "#2D7D44" }}
              w={"20px"}
              h={"20px"}
              onClick={() => {
                if (network.docsUrl) {
                  openInNewTab(network.docsUrl);
                }
              }}
            />
          </Flex>
          <div className="flex px-2 py-1 bg-[#272637] rounded-md w-fit mt-4">
            <Text fontSize={"12px"} color="#94979C">
              {network.type}
            </Text>
          </div>
        </Flex>
      </Flex>

      <Flex gap="10px" justifyContent="space-between" alignItems="center">
        <Text color="#94979C" fontSize="10px" mt={"20px"}>
          Coordinator Address:
        </Text>
        <Text color="#94979C" fontSize="16px" mt={"20px"}>
          {shortAddress(network.coordinatorAddress)}
        </Text>

        <Spacer />

        <Copy
          className="w-4 h-4 cursor-pointer text-[#94979C] mt-4"
          onClick={() => {
            navigator.clipboard.writeText(network.coordinatorAddress);
            toast({
              title: "Copied to clipboard",
              description: "Coordinator address copied to clipboard",
              status: "success",
            });
          }}
        />
      </Flex>
    </Box>
  );
}
