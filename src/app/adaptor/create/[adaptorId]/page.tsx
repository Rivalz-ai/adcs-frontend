/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import useAdaptor from "@/libs/hooks/apis/adaptors/useAdaptor";
import useCreateAdapter from "@/libs/hooks/apis/adaptors/useCreateAdapter";
import useDeleteAdapter from "@/libs/hooks/apis/adaptors/useDeleteAdapter";
import useUpdateAdapter from "@/libs/hooks/apis/adaptors/useUpdateAdapter";
import useAllChain from "@/libs/hooks/apis/useAllChain";
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
import { FaArrowLeft, FaPlus, FaSave, FaTrash } from "react-icons/fa";
import ExcuteAiInferenceProvider from "@/views/ExcuteAiInferenceProvider";

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
    description: "",
    variables: "",
    categoryId: 0,
    outputTypeId: 0,
    dataProviderId: 0,
    chainId: 0,
    aiPrompt: "decision should buy or sell BTC at this time",
  });

  useEffect(() => {
    if (item) {
      setAdaptor(item);
    }
  }, [item]);

  const { outputData } = useGetOutPutTypes();
  const { categories } = useGetCategories();
  const { chains } = useAllChain();

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

  const chainsRender = useMemo(() => {
    return chains.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: item.name,
      };
    });
  }, [chains]);

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
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
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

  return (
    <ProtectedPage>
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
            {isEdit ? "Adaptor Detail" : "Create Adaptor"}
          </Text>
        </Flex>
        <Flex w="80%" mx="auto">
          <Link href="/adaptor/me">
            <Button leftIcon={<FaArrowLeft />} variant="link" color="gray.400">
              Adaptor List
            </Button>
          </Link>
        </Flex>
        <form onSubmit={onSubmit}>
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
                {chainsRender.map((item, index) => (
                  <CheckBoxCustom
                    item={item}
                    isChecked={adaptor.chainId === item.value}
                    onSelected={(value) => {
                      setAdaptor({ ...adaptor, chainId: Number(value) });
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
              gap="20px"
              alignItems="center"
              borderBottom="1px solid #282828"
              py="10px"
            >
              <Flex flex={1}>
                <Text color="gray.400" fontSize="18px" fontWeight="semibold">
                  Adaptor Name
                </Text>
              </Flex>

              <Flex
                gap="20px"
                justifyContent="flex-end"
                w="fit-content"
                flex={1.5}
              >
                <Input
                  name="value"
                  placeholder="Adaptor Name"
                  border="1px solid #949191"
                  bgColor="#282828"
                  color="gray.400"
                  _placeholder={{ color: "gray.400", fontSize: "12px" }}
                  value={adaptor.name}
                  onChange={(e) =>
                    setAdaptor({ ...adaptor, name: e.target.value })
                  }
                />
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
                  Description
                </Text>
              </Flex>

              <Flex
                gap="20px"
                justifyContent="flex-end"
                w="fit-content"
                flex={1.5}
              >
                <Textarea
                  name="value"
                  placeholder="Description"
                  border="1px solid #949191"
                  bgColor="#282828"
                  color="gray.400"
                  _placeholder={{ color: "gray.400", fontSize: "12px" }}
                  value={adaptor.description}
                  onChange={(e) =>
                    setAdaptor({ ...adaptor, description: e.target.value })
                  }
                />
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
                  Prompt
                </Text>
              </Flex>

              <Flex
                gap="20px"
                justifyContent="flex-end"
                w="fit-content"
                flex={1.5}
              >
                <Input
                  name="value"
                  placeholder="Prompt"
                  border="1px solid #949191"
                  bgColor="#282828"
                  color="gray.400"
                  _placeholder={{ color: "gray.400", fontSize: "12px" }}
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
                leftIcon={!isEdit ? <FaPlus /> : <FaSave />}
                bg="rgba(255,255,255, 0.5)"
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
