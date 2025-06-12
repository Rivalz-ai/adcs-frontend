"use client";
import {
  Button,
  Flex,
  Input,
  Link,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import useMyAdaptors from "@/libs/hooks/apis/adaptors/useMyAdaptors";
import ProtectedPage from "@/libs/utls/ProtectedPage";
import { FaCheckDouble } from "react-icons/fa";
import OutputTypes from "@/views/components/OutputTypes";
import Categories from "@/views/components/Categories";
import { SearchIcon } from "@chakra-ui/icons";
import { useSearchAdaptorState } from "@/libs/hooks/stores/useSearchAdaptor";
import { AdapterCard, AdapterCardSkeleton } from "@/views/adaptors";
import ConfirmModal from "@/views/components/ConfirmModal";

export default function MyAdaptorPage() {
  const { address } = useAccount();
  const { data, isLoading } = useMyAdaptors(address || "");
  const [search, setSearch] = useSearchAdaptorState();

  const [selectedCategories, setSelectedCategories] = useState<
    Array<string | number>
  >([]);

  const [selectedOutputType, setSelectedOutputType] = useState<
    Array<string | number>
  >([]);

  const dataRender = useMemo(() => {
    if (data.length === 0) return [];

    let output = [...data];
    if (selectedCategories.length > 0) {
      output = output.filter((item) =>
        selectedCategories.includes(item.categoryId || "")
      );
    }
    if (selectedOutputType.length > 0) {
      output = output.filter((item) =>
        selectedOutputType.includes(item.outputTypeId)
      );
    }

    if (!search.keySearch) return output;
    const value = search.keySearch.toLowerCase();
    return output.filter((item) => {
      return (
        item.name.toLowerCase().includes(value) ||
        item.id.toString().includes(value)
      );
    });
  }, [search.keySearch, data, selectedCategories, selectedOutputType]);

  return (
    <ProtectedPage>
      <Flex flex={1} flexDir="column" gap="15px">
        <Flex
          w="full"
          flexDir="column"
          gap="20px"
          mb="40px"
          pt={{ base: "20px", lg: "50px" }}
        >
          <Text
            color="white"
            as="h1"
            fontSize={{ base: "20px", lg: "48px" }}
            fontWeight="bold"
          >
            Your Adaptor
          </Text>
        </Flex>
        <Flex
          w="full"
          borderColor="rgba(255,255,255, 0.08)"
          pt="22px"
          justify="space-between"
          align="center"
          gap={{ base: "10px", lg: "20px" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Flex
            backgroundColor={"#111419"}
            rounded="xl"
            border="1px solid"
            borderColor="#2d2f34"
            opacity={"0.7"}
            boxShadow="lg"
            w={{ base: "full", md: "60%" }}
            minH={{ lg: "44px" }}
            borderRadius="6px"
            overflow="hidden"
            px="5px"
            alignItems="center"
            position="relative"
          >
            <Input
              flex={1}
              border="0px"
              focusBorderColor="transparent"
              placeholder="Search by name, creator or ID"
              _placeholder={{ color: "#94979C" }}
              color="#94979C"
              fontSize={{ base: "14px", lg: "18px" }}
              fontWeight={500}
              pl="10px"
              py="10px"
              value={search.keySearch}
              onChange={(e) => {
                setSearch({ keySearch: e.target.value });
              }}
            />
            <SearchIcon
              color="rgba(255, 255, 255, 0.48)"
              w="20px"
              h="20px"
              position="absolute"
              right="20px"
              zIndex={10}
            />
          </Flex>

          <Flex
            w={{ base: "full", sm: "unset" }}
            gap={{ base: "10px", lg: "20px" }}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <Flex gap={{ base: "10px", lg: "20px" }}>
              <Categories
                selectedCategories={selectedCategories}
                setSelectedCategories={(value) => {
                  setSelectedCategories((prev) => {
                    if (prev.includes(value)) {
                      return prev.filter((item) => item !== value);
                    }
                    return [...prev, value];
                  });
                }}
              />

              <OutputTypes
                selectedOutputType={selectedOutputType}
                setSelectedOutputType={(value) => {
                  setSelectedOutputType((prev) => {
                    if (prev.includes(value)) {
                      return prev.filter((item) => item !== value);
                    }
                    return [...prev, value];
                  });
                }}
              />
            </Flex>
            <Link href="/adaptor/create/new-adapter">
              <Button
                leftIcon={<FaCheckDouble />}
                bg="rgb(15,18,22)"
                border={"1px solid #2D7D44"}
                color={"#3BB25D"}
                borderRadius={"10px"}
                py={{ base: "1px", lg: "21px" }}
                w={{ base: "full", sm: "unset" }}
                _hover={{
                  bg: "#69FF93",
                  color: "black",
                }}
              >
                Create Adaptor
              </Button>
            </Link>
          </Flex>
        </Flex>

        <SimpleGrid w="full" columns={{ base: 1, lg: 5 }} gap="20px">
          {dataRender.map((item, i) => (
            <AdapterCard item={item} key={i} isMe />
          ))}
          {isLoading &&
            new Array(5)
              .fill(0)
              .map((_, index) => <AdapterCardSkeleton key={index} />)}
        </SimpleGrid>
        <Flex w="full" justifyContent="center">
          {data.length === 0 && !isLoading && (
            <Flex flexDir="column" gap="20px" alignItems="center">
              <Text
                textAlign="center"
                color="rgba(255,255,255, 0.8)"
                fontSize="20px"
                textTransform="capitalize"
                fontWeight="bold"
              >
                Oh no, you don&apos;t have any adaptor yet.
              </Text>
              <Link href="/adaptor/create/new-adapter">
                <Button
                  leftIcon={<FaCheckDouble />}
                  bg="rgb(15,18,22)"
                  border={"1px solid #2D7D44"}
                  color={"#3BB25D"}
                  borderRadius={"10px"}
                  py={"21px"}
                  _hover={{
                    bg: "#69FF93",
                    color: "black",
                  }}
                >
                  Click here to create
                </Button>
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
    </ProtectedPage>
  );
}
