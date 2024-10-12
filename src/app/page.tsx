"use client";
import AdapterCard from "@/views/AdapterCard";
import SearchBar from "@/views/SearchBar";
import { Flex, SimpleGrid, Skeleton, Spacer, Text } from "@chakra-ui/react";
import PopoverComp from "@/views/PopoverComp";
import useGetAllAdaptor from "@/libs/hooks/apis/useGetAllAdaptor";
import { useSearchAdaptorState } from "@/libs/hooks/stores/useSearchAdaptor";
import { useMemo, useState } from "react";
import useGetCategories from "@/libs/hooks/apis/useGetCategories";
import useGetOutPutTypes from "@/libs/hooks/apis/useGetOutPutTypes";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<
    Array<string | number>
  >([]);

  const [selectedOutputType, setSelectedOutputType] = useState<
    Array<string | number>
  >([]);

  const { data, isLoading } = useGetAllAdaptor();
  const { categories } = useGetCategories();

  const { outputData } = useGetOutPutTypes();

  const [search] = useSearchAdaptorState();

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

  const categoriesData = useMemo(() => {
    return categories.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: item.name,
      };
    });
  }, [categories]);

  const outputDataRender = useMemo(() => {
    return outputData.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: item.name,
      };
    });
  }, [outputData]);

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
        borderBottom="1px solid"
        borderColor="rgba(255,255,255, 0.08)"
        pb="20px"
      >
        <PopoverComp
          lable="Categories"
          data={categoriesData}
          values={selectedCategories}
          onSelected={(value) => {
            setSelectedCategories((prev) => {
              if (prev.includes(value)) {
                return prev.filter((item) => item !== value);
              }
              return [...prev, value];
            });
          }}
        />
        <Spacer />
        <PopoverComp
          lable="Output Types"
          data={outputDataRender}
          values={selectedOutputType}
          onSelected={(value) => {
            setSelectedOutputType((prev) => {
              if (prev.includes(value)) {
                return prev.filter((item) => item !== value);
              }
              return [...prev, value];
            });
          }}
        />
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
