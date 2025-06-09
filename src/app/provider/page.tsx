"use client";
import React, { useMemo, useState } from "react";
import ProviderCard from "@/views/ProviderCard";
import { Flex, Input, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useGetAllProvider from "@/libs/hooks/apis/useGetAllProvider";
import Categories from "@/views/components/Categories";
import { SearchIcon } from "@chakra-ui/icons";
import { useSearchAdaptorState } from "@/libs/hooks/stores/useSearchAdaptor";

export default function ProviderPage() {
  const { data, isLoading } = useGetAllProvider();

  const [search, setSearch] = useSearchAdaptorState();

  const [selectedCategories, setSelectedCategories] = useState<
    Array<string | number>
  >([]);

  const dataRender = useMemo(() => {
    if (!data || data.length === 0) return [];

    let output = [...data];

    // Filter by selected categories (if applicable)
    if (selectedCategories.length > 0) {
      output = output.filter((item) =>
        selectedCategories.includes(item.categoryId)
      );
    }

    // Apply search filter
    if (search.keySearch) {
      const value = search.keySearch.toLowerCase();
      output = output.filter((item) => {
        return (
          item?.name.toLowerCase().includes(value) ||
          item?.description.toLowerCase().includes(value) ||
          item?.id.toString().includes(value)
        );
      });
    }

    return output;
  }, [data, selectedCategories, search.keySearch]);

  return (
    <Flex flex={1} flexDir="column" gap="30px">
      <Flex
        w="full"
        flexDir="column"
        gap="2"
        justifyContent="left"
        alignItems="left"
        mb="4"
        pt={{ base: "5", lg: "12" }}
        textAlign="left"
      >
        <Text color="white" as="h1" fontSize="5xl" fontWeight="bold" mb="1">
          Explore Providers
        </Text>
        <Text color="#94979C" fontSize="xl" maxW="59rem" lineHeight="tight">
          Data Providers fuel Adaptors by supplying real-time or structured
          data, enabling AI-powered insights. Verified and monetizable, they
          ensure accurate, scalable, and reliable off-chain inference.
        </Text>
      </Flex>

      <Flex
        w="full"
        borderColor="rgba(255,255,255, 0.08)"
        pt="22px"
        justify="space-between"
        align="center"
        mb={"0px"}
        gap={{ base: "10px", lg: "20px" }}
        flexDirection={{ base: "column", md: "row" }}
        // border={"1px solid #272637"}
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
        >
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
          {/* <OutputTypesProvider
            label="Data Provider"
            selectedOutputType={selectedOutputType}
            setSelectedOutputType={(value) => {
              setSelectedOutputType((prev) => {
                if (prev.includes(value)) {
                  return prev.filter((item) => item !== value);
                }
                return [...prev, value];
              });
            }}
            data={data}
          /> */}
        </Flex>
      </Flex>

      <SimpleGrid w="full" columns={{ base: 1, lg: 3, "2xl": 5 }} gap="20px">
        {dataRender.map((item, i) => (
          <ProviderCard item={item} key={i} />
        ))}
        {isLoading &&
          new Array(5).fill(0).map((_, index) => (
            <Flex
              key={index}
              bgGradient="linear(to-b, #1b103d, #181a37)"
              rounded="xl"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.08)"
              boxShadow="lg"
              h="322px"
              gap="10px"
              w="full"
              flexDir="column"
              cursor="pointer"
            >
              <Skeleton flex={1} color="#280495" />
            </Flex>
          ))}
      </SimpleGrid>
      <Flex w="full" justifyContent="center">
        {data.length === 0 && !isLoading && (
          <Text textAlign="center" color="rgba(255,255,255, 0.5)">
            No data found
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
