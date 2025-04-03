"use client";
import AdapterCard from "@/views/AdapterCard";
import SearchBar from "@/views/SearchBar";
import { Flex, SimpleGrid, Skeleton, Spacer, Text } from "@chakra-ui/react";
import useGetAllAdaptor from "@/libs/hooks/apis/useGetAllAdaptor";
import { useSearchAdaptorState } from "@/libs/hooks/stores/useSearchAdaptor";
import { useMemo, useState } from "react";
import OutputTypes from "@/views/components/OutputTypes";
import Categories from "@/views/components/Categories";
import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";


export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<
    Array<string | number>
  >([]);

  const [selectedOutputType, setSelectedOutputType] = useState<
    Array<string | number>
  >([]);

  const { data, isLoading } = useGetAllAdaptor();
  const [search, setSearch] = useSearchAdaptorState();
  const dataRender = useMemo(() => {
    if (data.length === 0) return [];

    let output = [...data];
    if (selectedCategories.length > 0) {
      output = output.filter((item) =>
        selectedCategories.includes(item.categoryId)
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
        item.id.toString().includes(value) ||
        item.jobId.toLowerCase().includes(value)
      );
    });
  }, [search.keySearch, data, selectedCategories, selectedOutputType]);

  return (
    <Flex
      flex={1}
      flexDir="column"
      gap="30px"
      px={{ base: "20px", lg: "unset" }}
    >
      <SearchBar />
      <Flex
        w="full"
        borderColor="rgba(255,255,255, 0.08)"
        pt="22px"
        justify="space-between"
        align="center"
        // border={"1px solid #272637"}
      >
        <Flex
          backgroundColor={"#111419"}
          rounded="xl"
          border="1px solid"
          borderColor="#2d2f34"
          opacity={"0.7"}
          boxShadow="lg"
          w={{ base: "60%" }}
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

        <Flex gap={"20px"}>
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

          {/* <Spacer /> */}
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
      </Flex>
      <SimpleGrid w="full" columns={{ base: 1, lg: 5 }} gap="20px">
        {dataRender.map((item, i) => (
          <AdapterCard item={item} key={i} />
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
        {dataRender.length === 0 && !isLoading && (
          <Text textAlign="center" color="rgba(255,255,255, 0.5)">
            No data found
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
