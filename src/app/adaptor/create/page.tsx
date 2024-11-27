"use client";
// import useExecuteProvider from "@/libs/hooks/apis/useExecuteProvider";
import useGetAllProvider from "@/libs/hooks/apis/useGetAllProvider";
import useGetCategories from "@/libs/hooks/apis/useGetCategories";
import useGetOutPutTypes from "@/libs/hooks/apis/useGetOutPutTypes";
import CheckBoxCustom from "@/views/components/CheckBox";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
// import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
// import ReactJson from "react-json-view";

export default function CreateProviderPage() {
  //get adaptor id from url by query
  // const searchParams = useSearchParams();
  const adaptorId = "1";

  // const [isTrigger] = useState(false);

  const [selectedProviders, setSelectedProviders] = useState<
    Array<string | number>
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    Array<string | number>
  >([]);
  const [selectedOutputType, setSelectedOutputType] = useState<
    Array<string | number>
  >([]);

  // const { dataExecute } = useExecuteProvider(isTrigger, "");

  const { outputData } = useGetOutPutTypes();
  const { data: providers } = useGetAllProvider();
  const { categories } = useGetCategories();

  const outputDataRender = useMemo(() => {
    return outputData.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: item.name,
      };
    });
  }, [outputData]);

  const categoriesRender = useMemo(() => {
    return categories.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: item.name,
      };
    });
  }, [categories]);

  const providersRender = useMemo(() => {
    return providers.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: "",
      };
    });
  }, [providers]);

  return (
    <Flex
      flex={1}
      flexDir="column"
      gap="30px"
      px={{ base: "20px", lg: "unset" }}
    >
      <Flex
        w="full"
        flexDir="column"
        gap="20px"
        justifyContent="center"
        alignItems="center"
        mb="40px"
        pt={{ base: "20px", lg: "50px" }}
      >
        <Text
          color="white"
          as="h1"
          fontSize={{ base: "20px", lg: "48px" }}
          fontWeight="bold"
        >
          {adaptorId ? "Adaptor Detail" : "Create Adaptor"}
        </Text>
      </Flex>

      <Flex
        w="80%"
        flexDir="column"
        gap="20px"
        bg="gray.800"
        rounded="xl"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.08)"
        boxShadow="lg"
        py="20px"
        px="20px"
        borderRadius="20px"
        mx="auto"
      >
        <Flex
          gap="20px"
          alignItems="center"
          borderBottom="1px solid #282828"
          py="10px"
        >
          <Flex flex={1}>
            <Text color="gray.400" fontSize="18px" fontWeight="semibold">
              Provider
            </Text>
          </Flex>

          <Flex gap="20px" justifyContent="flex-end" w="fit-content">
            {providersRender.map((item, index) => (
              <CheckBoxCustom
                item={item}
                isChecked={selectedProviders.includes(item.value)}
                onSelected={(value) => {
                  setSelectedProviders([value]);
                }}
                key={index}
              />
            ))}
          </Flex>
        </Flex>

        <Flex
          gap="20px"
          alignItems="center"
          borderBottom="1px solid #282828"
          py="10px"
        >
          <Flex flex={1}>
            <Text color="gray.400" fontSize="18px" fontWeight="semibold">
              Network
            </Text>
          </Flex>

          <Flex gap="20px" justifyContent="flex-end">
            {categoriesRender.map((item, index) => (
              <CheckBoxCustom
                item={item}
                isChecked={selectedCategories.includes(item.value)}
                onSelected={(value) => {
                  setSelectedCategories([value]);
                }}
                key={index}
              />
            ))}
          </Flex>
        </Flex>
        <Flex
          gap="20px"
          alignItems="center"
          borderBottom="1px solid #282828"
          py="10px"
        >
          <Flex flex={1}>
            <Text color="gray.400" fontSize="18px" fontWeight="semibold">
              Category
            </Text>
          </Flex>

          <Flex gap="20px" justifyContent="flex-end">
            {categoriesRender.map((item, index) => (
              <CheckBoxCustom
                item={item}
                isChecked={selectedCategories.includes(item.value)}
                onSelected={(value) => {
                  setSelectedCategories([value]);
                }}
                key={index}
              />
            ))}
          </Flex>
        </Flex>

        <Flex
          gap="20px"
          alignItems="center"
          borderBottom="1px solid #282828"
          py="10px"
        >
          <Flex>
            <Text color="gray.400" fontSize="18px" fontWeight="semibold">
              Output Types
            </Text>
          </Flex>
          <Spacer />
          <Flex gap="20px" justifyContent="flex-end">
            {outputDataRender.map((item, index) => (
              <CheckBoxCustom
                item={item}
                isChecked={selectedOutputType.includes(item.value)}
                onSelected={(value) => {
                  setSelectedOutputType([value]);
                }}
                key={index}
              />
            ))}
          </Flex>
        </Flex>

        <Flex
          gap="20px"
          alignItems="center"
          py="20px"
          justifyContent="flex-end"
        >
          <Button bg="rgba(255,255,255, 0.5)">
            {adaptorId ? "Update And Execute" : "Create And Execute"}
          </Button>
        </Flex>
      </Flex>

      {/* {dataExecute && <ReactJson src={dataExecute} theme="railscasts" />} */}
    </Flex>
  );
}
