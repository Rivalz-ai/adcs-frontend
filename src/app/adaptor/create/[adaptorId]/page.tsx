"use client";
import useAdaptor from "@/libs/hooks/apis/adaptors/useAdaptor";
import useCreateAdapter from "@/libs/hooks/apis/adaptors/useCreateAdapter";
import useDeleteAdapter from "@/libs/hooks/apis/adaptors/useDeleteAdapter";
import useUpdateAdapter from "@/libs/hooks/apis/adaptors/useUpdateAdapter";
// import useAllChain from "@/libs/hooks/apis/useAllChain";
import useGetCategories from "@/libs/hooks/apis/useGetCategories";
import useGetOutPutTypes from "@/libs/hooks/apis/useGetOutPutTypes";
import ProtectedPage from "@/libs/utls/ProtectedPage";
import { AdaptorCreateModel } from "@/types/adapter-type";
import CheckBoxCustom from "@/views/components/CheckBox";
import ProvidersCom from "@/views/components/ProvidersCom";
import {
  Button,
  Flex,
  Input,
  Spacer,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaCheckDouble, FaSave, FaTrash } from "react-icons/fa";
import ExcuteAiInferenceProvider from "@/views/ExcuteAiInferenceProvider";
// import ChainType from "@/views/components/ChainType";
// import { Plus } from "lucide-react";

export default function CreateProviderPage({
  params,
}: {
  params: { adaptorId: string };
}) {
  const isEdit = params.adaptorId !== "new-adapter";
  const router = useRouter();
  const toast = useToast();

  const { data: item } = useAdaptor(isEdit ? params.adaptorId : undefined);

  const { createAdaptor, isLoading: isLoadingCreateAdaptor } =
    useCreateAdapter();
  const { updateAdaptor, isLoading: isLoadingUpdateAdaptor } =
    useUpdateAdapter();
  const { deleteAdaptor, isLoading: isLoadingDeleteAdaptor } =
    useDeleteAdapter();

  const [adaptor, setAdaptor] = useState<AdaptorCreateModel>({
    id: 0,
    name: "",
    chainType: "",
    description: "",
    variables: "",
    categoryId: 0,
    outputTypeId: 0,
    dataProviderId: 0,
    chainId: 1,
    aiPrompt: "decision should buy or sell BTC at this time",
  });
  const [network, setnetwork] = useState<AdaptorCreateModel>({
    id: 0,
    name: "",
    chainType: "",
    description: "",
    variables: "",
    categoryId: 0,
    outputTypeId: 0,
    dataProviderId: 0,
    chainId: 1,
    aiPrompt: "decision should buy or sell BTC at this time",
  });

  console.log(adaptor);

  useEffect(() => {
    if (item) {
      setAdaptor(item);
    }
  }, [item]);

  const { outputData } = useGetOutPutTypes();
  const { categories } = useGetCategories();
  // const { chains } = useAllChain();

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

  // const chainsRender = useMemo(() => {
  //   return chains.map((item) => {
  //     return {
  //       label: item.name,
  //       value: item.id,
  //       subLabel: item.name,
  //     };
  //   });
  // }, [chains]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !adaptor.name ||
      !adaptor.description ||
      !adaptor.aiPrompt ||
      !adaptor.categoryId ||
      !adaptor.outputTypeId ||
      !adaptor.dataProviderId ||
      !adaptor.chainId
    ) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "warning",
      });
      return;
    }
    try {
      if (isEdit) {
        await updateAdaptor(adaptor);
      } else {
        await createAdaptor(adaptor);
      }
      toast({
        title: "Success",
        description: "Adaptor created successfully",
        status: "success",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/adaptor/me");
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: (error as string) || "Something went wrong",
        status: "error",
      });
    }
  };

  const onDeleteAdaptor = async () => {
    try {
      await deleteAdaptor(adaptor.id);
      toast({
        title: "Success",
        description: "Adaptor deleted successfully",
        status: "success",
      });
      router.push("/adaptor/me");
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
      });
    }
  };

  console.log(categoriesRender, "------------");

  return (
    <ProtectedPage>
      <Flex
        flex={1}
        flexDir="column"
        gap="30px"
        // px={{ base: "20px", lg: "unset" }}
        mx="auto"
        maxW="1250px"
        w="full"
      >
        <Flex
          w="full"
          flexDir="column"
          gap="8px"
          justifyContent="center"
          alignItems="center"
          mb="32px"
          pt={{ base: "20px", lg: "50px" }}
        >
          <Text
            color="white"
            as="h1"
            fontSize={{ base: "20px", lg: "48px" }}
            fontWeight="bold"
          >
            {isEdit ? "Adaptor Detail" : "Create Adaptor"}
          </Text>
          {isEdit ? (
            ""
          ) : (
            <Text
              color="#94979C"
              fontSize="xl"
              maxW="59rem"
              lineHeight="tight"
              textAlign="center"
            >
              Description of the Adapter, general information.
            </Text>
          )}
        </Flex>

        <Flex w={{ base: "100%", lg: "80%" }} mx="auto">
          <Link href="/adaptor/me">
            <Button
              leftIcon={<FaArrowLeft />}
              variant="link"
              color="#94979C"
              border={"1px solid #94979C"}
              px="20px"
              py="16px"
              borderRadius={"10px"}
              _hover={{ bg: "white", color: "black" }}
            >
              Adaptor List
            </Button>
          </Link>
        </Flex>

        <form onSubmit={onSubmit}>
          <Flex
            w={{ base: "100%", lg: "80%" }}
            flexDir="column"
            // gap="20px"
            mb={"40px"}
            rounded="xl"
            border="1px solid"
            borderColor="#2d2f34"
            backgroundColor={"#111419"}
            boxShadow="lg"
            py="6px"
            px="20px"
            borderRadius="10px"
            mx="auto"
          >
            <Flex
              gap={{ base: "10px", lg: "20px" }}
              alignItems="center"
              flexWrap={"wrap"}
              borderBottom="1px solid #282828"
              py="14px"
            >
              <Flex flex={1}>
                <Text color="white" fontSize="18px" fontWeight="semibold">
                  Provider:
                </Text>
              </Flex>

              <Flex gap="20px" justifyContent="flex-end" w="fit-content">
                <ProvidersCom
                  isShowValue
                  selectedProviders={
                    adaptor.dataProviderId ? [adaptor.dataProviderId] : []
                  }
                  setSelectedProviders={(value) => {
                    setAdaptor({ ...adaptor, dataProviderId: Number(value) });
                  }}
                />
              </Flex>
            </Flex>

            {/* <Flex
               gap={{ base: "10px", lg: "20px" }}
              alignItems="center"
              flexWrap={"wrap"}
              borderBottom="1px solid #282828"
              py="17px"
            >
              <Flex flex={1}>
                <Text color="white" fontSize="18px" fontWeight="semibold">
                  Chain&nbsp;Type:
                </Text>
              </Flex>

              <Flex gap="20px" justifyContent="flex-end">
               
                <ChainType
                  isShowValue
                  selectedChainType={adaptor.chainType}
                  setselectedchaintype={(value) => {
                    setAdaptor({ ...adaptor, chainType: value });
                  }}
                />
              </Flex>
            </Flex> */}
            {/* <Flex
              gap={{ base: "10px", lg: "20px" }}
              alignItems= {{ base: "start", lg: "center" }}
              flexDirection={{ base: "column", lg: "row" }}
              borderBottom="1px solid #282828"
              py="17px"
            >
              <Flex flex={1}>
                <Text color="white" fontSize="18px" fontWeight="semibold">
                  Supported Chain:
                </Text>
              </Flex>

              <Flex gap={{base:"10px", lg:"20px"}}  flexWrap={"wrap"}>
                {chainsRender.map((item, index) => (
                  <Text
                    key={index}
                    fontSize="12px"
                    p={1}
                    bg="rgba(255,255,255, 0.08)"
                    borderRadius="md"
                    px="5px"
                    fontWeight={500}
                    textTransform="uppercase"
                    color="rgba(255,255,255, 0.5)"
                    onClick={() =>
                      setAdaptor({ ...adaptor, chainId: Number(item.value) })
                    }
                  >
                    {item.label}
                  </Text>
                ))}
              </Flex>
            </Flex> */}

            <Flex
              gap={{ base: "10px", lg: "20px" }}
              alignItems={{ base: "start", lg: "center" }}
              flexDirection={{ base: "column", lg: "row" }}
              borderBottom="1px solid #282828"
              py="26px"
            >
              <Flex flex={1}>
                <Text color="white" fontSize="18px" fontWeight="semibold">
                  Network:
                </Text>
              </Flex>

              <Flex gap="24px" flexWrap={"wrap"}>
                {[
                  {
                    label: "Rivalz",
                    subLabel: "Rivalz",
                    value: 12,
                  },
                  {
                    label: "Arbitrum",
                    subLabel: "Arbitrum",
                    value: 14,
                  },
                  {
                    label: "Base",
                    subLabel: "Base",
                    value: 51,
                  },
                ].map((item, index) => (
                  <CheckBoxCustom
                    item={item}
                    isChecked={network.categoryId === item.value}
                    onSelected={(value) => {
                      setnetwork({ ...network, categoryId: Number(value) });
                    }}
                    key={index}
                  />
                ))}
              </Flex>
            </Flex>

            <Flex
              py="20px"
              flexDirection={"column"}
              gap="20px"
              borderBottom="1px solid #282828"
            >
              <Flex
                gap={{ base: "10px", lg: "20px" }}
                alignItems={{ base: "start", lg: "center" }}
                flexDirection={{ base: "column", lg: "row" }}
                // borderBottom="1px solid #282828"
              >
                <Flex flex={1}>
                  <Text color="white" fontSize="18px" fontWeight="semibold">
                    Category:
                  </Text>
                </Flex>

                <Flex gap="20px" flexWrap={"wrap"}>
                  {categoriesRender.map((item, index) => (
                    <CheckBoxCustom
                      item={item}
                      isChecked={adaptor.categoryId === item.value}
                      onSelected={(value) => {
                        setAdaptor({ ...adaptor, categoryId: Number(value) });
                      }}
                      key={index}
                    />
                  ))}
                </Flex>
              </Flex>

              <Flex
                gap={{ base: "10px", lg: "20px" }}
                alignItems={{ base: "start", lg: "center" }}
                flexDirection={{ base: "column", sm: "row" }}
              >
                <Flex flex={1}>
                  <Text color="white" fontSize="16px" fontWeight="400">
                    Add Your Own Category:
                  </Text>
                </Flex>

                <Flex
                  gap="20px"
                  justifyContent="flex-end"
                  w={{ base: "100%", sm: "fit-content" }}
                  flex={1.7}
                >
                  <Input
                    name="value"
                    placeholder="Category Name"
                    border="1px solid #272637"
                    borderRadius={"10px"}
                    bgColor="#13161B"
                    color="#94979C"
                    py={"22px"}
                    _placeholder={{ color: "#94979C", fontSize: "16px" }}
                    value={adaptor.name}
                    onChange={(e) =>
                      setAdaptor({ ...adaptor, name: e.target.value })
                    }
                  />
                </Flex>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <div>&nbsp;</div>
                <Button
                  // leftIcon={<FaPlus />}
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
                  +&nbsp;Add Category
                </Button>
              </Flex>
            </Flex>

            <Flex
              gap={{ base: "10px", lg: "20px" }}
              alignItems={{ base: "start", lg: "center" }}
              flexDirection={{ base: "column", lg: "row" }}
              borderBottom="1px solid #282828"
              py="26px"
            >
              <Flex>
                <Text color="white" fontSize="18px" fontWeight="semibold">
                  Output&nbsp;Types:
                </Text>
              </Flex>
              <Spacer />
              <Flex gap="20px" flexWrap={"wrap"}>
                {outputDataRender.map((item, index) => (
                  <CheckBoxCustom
                    item={item}
                    isChecked={adaptor.outputTypeId === item.value}
                    onSelected={(value) => {
                      setAdaptor({ ...adaptor, outputTypeId: Number(value) });
                    }}
                    key={index}
                  />
                ))}
              </Flex>
            </Flex>

            <Flex
              gap={{ base: "10px", lg: "20px" }}
              alignItems={{ base: "start", lg: "center" }}
              flexDirection={{ base: "column", sm: "row" }}
              borderBottom="1px solid #282828"
              py="17px"
            >
              <Flex flex={1}>
                <Text color="white" fontSize="18px" fontWeight="semibold">
                  Adaptor Name:
                </Text>
              </Flex>

              <Flex
                gap="20px"
                justifyContent="flex-end"
                w={{ base: "100%", sm: "fit-content" }}
                flex={1.7}
              >
                <Input
                  name="value"
                  placeholder="Adaptor Name"
                  border="1px solid #272637"
                  borderRadius={"10px"}
                  bgColor="#13161B"
                  color="#94979C"
                  py={"22px"}
                  _placeholder={{ color: "#94979C", fontSize: "16px" }}
                  value={adaptor.name}
                  onChange={(e) =>
                    setAdaptor({ ...adaptor, name: e.target.value })
                  }
                />
              </Flex>
            </Flex>

            <Flex
              gap={{ base: "10px", lg: "20px" }}
              alignItems={{ base: "start", lg: "center" }}
              flexDirection={{ base: "column", sm: "row" }}
              borderBottom="1px solid #282828"
              py="17px"
            >
              <Flex flex={1}>
                <Text color="white" fontSize="18px" fontWeight="semibold">
                  Description:
                </Text>
              </Flex>

              <Flex
                gap="20px"
                justifyContent="flex-end"
                w={{ base: "100%", sm: "fit-content" }}
                flex={1.7}
              >
                <Textarea
                  name="value"
                  placeholder="Description"
                  border="1px solid #272637"
                  borderRadius={"10px"}
                  bgColor="#13161B"
                  color="#94979C"
                  _placeholder={{ color: "#94979C", fontSize: "12px" }}
                  value={adaptor.description}
                  onChange={(e) =>
                    setAdaptor({ ...adaptor, description: e.target.value })
                  }
                />
              </Flex>
            </Flex>

            <Flex
              gap={{ base: "10px", lg: "20px" }}
              alignItems={{ base: "start", lg: "center" }}
              flexDirection={{ base: "column", sm: "row" }}
              borderBottom="1px solid #282828"
              py="17px"
            >
              <Flex flex={1}>
                <Text color="white" fontSize="18px" fontWeight="semibold">
                  Prompt:
                </Text>
              </Flex>

              <Flex
                gap="20px"
                justifyContent="flex-end"
                w={{ base: "100%", sm: "fit-content" }}
                flex={1.7}
              >
                <Input
                  name="value"
                  placeholder="Prompt"
                  border="1px solid #272637"
                  borderRadius={"10px"}
                  bgColor="#13161B"
                  color="#94979C"
                  py={"22px"}
                  _placeholder={{ color: "#94979C", fontSize: "12px" }}
                  value={adaptor.aiPrompt}
                  onChange={(e) =>
                    setAdaptor({ ...adaptor, aiPrompt: e.target.value })
                  }
                />
              </Flex>
            </Flex>

            <Flex
              gap="20px"
              alignItems="center"
              py="20px"
              justifyContent="flex-end"
            >
              {isEdit && (
                <Button
                  bg="red.500"
                  color="white"
                  leftIcon={<FaTrash />}
                  onClick={onDeleteAdaptor}
                  isLoading={isLoadingDeleteAdaptor}
                  isDisabled={isLoadingDeleteAdaptor}
                >
                  Delete
                </Button>
              )}
              <Button
                leftIcon={!isEdit ? <FaCheckDouble /> : <FaSave />}
                bg="rgb(15,18,22)"
                border={"1px solid #2D7D44"}
                color={"#3BB25D"}
                borderRadius={"10px"}
                py={"21px"}
                _hover={{
                  bg: "#69FF93",
                  color: "black",
                }}
                type="submit"
                isLoading={isLoadingCreateAdaptor || isLoadingUpdateAdaptor}
              >
                {isEdit ? "Update Adaptor" : "Create Adaptor"}
              </Button>
            </Flex>
          </Flex>
        </form>

        <ExcuteAiInferenceProvider
          providerId={adaptor.dataProviderId}
          content={adaptor.aiPrompt}
          dataTypeId={adaptor.outputTypeId}
          categoryId={adaptor.categoryId}
        />
      </Flex>
    </ProtectedPage>
  );
}
