import useDeleteAdapter from "@/libs/hooks/apis/adaptors/useDeleteAdapter";
import { AdaptorItem } from "@/types/adapter-type";
import { Box, Flex, Image, Text, Tooltip, useToast } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ConfirmModal from "../components/ConfirmModal";

interface AdapterCardProps {
  item: AdaptorItem;
  isMe?: boolean;
}

export default function AdapterCard({ item, isMe }: AdapterCardProps) {
  const url = !isMe ? `/adaptor/detail/${item.id}` : `#`;

  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const { deleteAdaptor, isLoading } = useDeleteAdapter();

  const onDeleteAdaptor = async () => {
    try {
      await deleteAdaptor(item.id);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : (error as string),
        status: "error",
      });
    }
  };

  return (
    <>
      <Link href={url}>
        <Flex
          backgroundColor={"rgba(17,20,25,0.5)"}
          padding="20px"
          rounded="xl"
          border="1px solid"
          borderColor="#272637"
          _hover={{ borderColor: "#2D7D44" }}
          boxShadow="lg"
          gap="10px"
          w="full"
          flexDir="column"
          cursor="pointer"
        >
          <Flex
            alignItems="flex-start"
            mb="4"
            flexDir="column"
            position="relative"
          >
            <Image
              src={item.iconUrl || "/cat.jpeg"}
              alt={item.name}
              boxSize="80px"
              borderRadius="md"
              fallbackSrc="/logo.png"
            />
            <Box mt="10px">
              <Tooltip label={item.id}>
                <Flex gap={"10px"} alignItems={"center"}>
                  <div
                    style={{
                      height: "22px",
                      width: "22px",
                      backgroundColor: "#49B267",
                      borderRadius: "100%",
                    }}
                  >
                    &nbsp;
                  </div>
                  <Text color="#94979C" fontSize="16px">
                    {`${item.id}`.substring(0, 10)}...
                  </Text>
                </Flex>
              </Tooltip>
              <Text
                fontSize="20px"
                fontWeight="700"
                color="#fff"
                lineHeight="28px"
                mt="10px"
              >
                {item.name}
              </Text>
              <Text
                pt={"10px"}
                fontSize="16px"
                color="#94979C"
                h={"58px"}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.description}
              </Text>
            </Box>
            {isMe && (
              <Flex
                position="absolute"
                top="0"
                right="0"
                backgroundColor="rgba(17,20,25,0.5)"
              >
                <Trash2
                  size={20}
                  onClick={() => setIsOpen(true)}
                  cursor="pointer"
                  color="#49B267"
                />
              </Flex>
            )}
          </Flex>

          <Flex mt="4" flexDir="column" gap="5px">
            <Flex w="full" h="1px" bg="rgba(255, 255, 255, 0.08)" />
            <Flex justifyContent="space-between">
              <Text color="rgba(255, 255, 255, 0.48)" fontSize="14px">
                REQUESTS
              </Text>
              <Text color="rgba(255, 255, 255, 0.48)" fontSize="14px">
                {item.requestCount || 0}
              </Text>
            </Flex>

            <Flex justifyContent="space-between" mt="2">
              <Text
                color="rgba(255, 255, 255, 0.48)"
                fontSize="14px"
                textTransform="uppercase"
              >
                Category
              </Text>
              <Text
                color="rgba(255, 255, 255, 0.48)"
                fontSize="14px"
                fontWeight="500"
                textTransform="uppercase"
              >
                {item.categoryName || "----"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Link>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDeleteAdaptor}
        isLoading={isLoading}
        description="Are you sure you want to delete this adaptor?"
      />
    </>
  );
}
