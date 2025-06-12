"use client";
import useAdaptor from "@/libs/hooks/apis/adaptors/useAdaptor";
import useCreateAdapter from "@/libs/hooks/apis/adaptors/useCreateAdapter";
import useDeleteAdapter from "@/libs/hooks/apis/adaptors/useDeleteAdapter";
import useUpdateAdapter from "@/libs/hooks/apis/adaptors/useUpdateAdapter";
import useGetCategories from "@/libs/hooks/apis/useGetCategories";
import useGetOutPutTypes from "@/libs/hooks/apis/useGetOutPutTypes";
import ProtectedPage from "@/libs/utls/ProtectedPage";
import {
  AdapterModel,
  AdaptorCreateModel,
  GraphFlow,
} from "@/types/adapter-type";
import CheckBoxCustom from "@/views/components/CheckBox";
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
import React, { useEffect, useMemo, useState, useRef } from "react";
import { FaArrowLeft, FaCheckDouble, FaSave, FaTrash } from "react-icons/fa";
import InputOutput, {
  InputOutputRef,
} from "@/views/adaptors/components/InputOutput";
import ProvidersCom from "@/views/components/ProvidersCom";
import AdaptorsCom from "@/views/components/AdaptorsCom";
import useGetAiModel from "@/libs/hooks/apis/useGetAiModel";
import { CommonItem } from "@/types/common-type";
import PopoverComp from "@/views/PopoverComp";
import { useRouter } from "next/navigation";
import useMyAdaptors from "@/libs/hooks/apis/adaptors/useMyAdaptors";
import { useAccount } from "wagmi";

const Option = [
  {
    label: "Provider",
    value: "provider",
  },
  {
    label: "Adaptor",
    value: "adaptor",
  },
];

export default function CreateProviderPage({
  params,
}: {
  params: { adaptorId: string };
}) {
  const toast = useToast();
  const router = useRouter();

  const inputRef = useRef<InputOutputRef>(null);
  const outputRef = useRef<InputOutputRef>(null);

  const { address } = useAccount();

  //States
  const [option, setOption] = useState<string>("provider");
  const [providerMethods, setProviderMethods] = useState<CommonItem[]>([]);

  //Queries
  const { refetchAdaptors } = useMyAdaptors(address || "");
  const { outputData } = useGetOutPutTypes();
  const { categories } = useGetCategories();
  const { data: aiModels } = useGetAiModel();

  //Mutations
  const { isLoading: isLoadingCreateAdaptor, createAdaptor } =
    useCreateAdapter();

  const [adaptor, setAdaptor] = useState<AdaptorCreateModel>({
    id: "",
    name: "",
    description: "",
    outputTypeId: 0,
    adaptorId: "",
    categoryId: 0,
    aiPrompt: "decision should buy or sell BTC at this time",
    icon: "",
  });

  //Clear adaptor, provider when user change option
  useEffect(() => {
    setAdaptor({ ...adaptor, providerId: "", method: "", adaptorId: "" });
  }, [option]);

  const onToast = (description: string) => {
    toast({
      title: "Validation Error",
      description: description,
      status: "warning",
    });
  };

  /**
   * Validate data
   * @returns true if valid, false otherwise
   */
  const onValidate = () => {
    if (!adaptor.name) {
      onToast("Please fill the adaptor name");
      return false;
    }
    if (!adaptor.description) {
      onToast("Please fill the adaptor description");
      return false;
    }
    if (!adaptor.icon) {
      onToast("Please fill the adaptor icon");
      return false;
    }
    if (!adaptor.categoryId) {
      onToast("Please select the category");
      return false;
    }
    if (!adaptor.adaptorId && !adaptor.providerId) {
      onToast("Please select the adaptor or provider");
      return false;
    }

    if (!adaptor.outputTypeId) {
      onToast("Please select the output type");
      return false;
    }

    if (adaptor.aiModelId && !adaptor.aiPrompt) {
      onToast("Please fill the ai prompt");
      return false;
    }

    const inputData = inputRef.current?.getData() || [];
    const outputData = outputRef.current?.getData() || [];

    if (inputData.length === 0 || outputData.length === 0) {
      onToast("Please fill the input and output");
      return false;
    }

    return true;
  };

  const convertDataToModel = () => {
    const inputData = inputRef.current?.getData() || [];
    const outputData = outputRef.current?.getData() || [];
    const inputSchema: Record<string, string> = {};
    const outputSchema: Record<string, string> = {};

    inputData.forEach((item) => {
      const key = Object.keys(item)[0];
      const value = Object.values(item)[0] as string;
      inputSchema[key] = value;
    });

    outputData.forEach((item) => {
      const key = Object.keys(item)[0];
      const value = Object.values(item)[0] as string;
      outputSchema[key] = value;
    });

    const nodes: Record<string, string> = {};
    if (adaptor.adaptorId) {
      nodes["A1"] = adaptor.adaptorId;
    } else if (adaptor.providerId) {
      nodes["P1"] = adaptor.providerId;
    }

    const graphFlow: GraphFlow = {
      id: Object.keys(nodes)[0],
      input: Object.keys(inputSchema).map((item) => `IR.${item}`),
      input_method: adaptor.method || "",
      output: "OA1",
    };

    const model: AdapterModel = {
      name: adaptor.name,
      description: adaptor.description,
      icon: adaptor.icon,
      core_llm: adaptor.aiModelId || "",
      static_context: adaptor.aiPrompt,

      category_id: adaptor.categoryId,
      output_type_id: adaptor.outputTypeId,

      input_schema: inputSchema,
      output_schema: outputSchema,
      nodes: nodes,
      graph_flow: [graphFlow],
    };
    return model;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onValidate()) {
      return;
    }

    if (!onValidate()) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "warning",
      });
    }

    const model = convertDataToModel();

    try {
      await createAdaptor(model);
      refetchAdaptors();
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

  const outputDataRender = useMemo(() => {
    return outputData.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: "",
      };
    });
  }, [outputData]);

  const categoriesRender = useMemo(() => {
    return categories.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: "",
      };
    });
  }, [categories]);

  const aiModelsRender = useMemo(() => {
    return (
      aiModels?.map((item) => {
        return {
          label: item.name,
          value: item.name,
          subLabel: "",
        };
      }) || []
    );
  }, [aiModels]);

  return (
    <ProtectedPage>
      <Flex
        flex={1}
        flexDir="column"
        gap="30px"
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
            Create Adaptor
          </Text>

          <Text
            color="#94979C"
            fontSize="xl"
            maxW="59rem"
            lineHeight="tight"
            textAlign="center"
          >
            Description of the Adapter, general information.
          </Text>
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
                  Icon:
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
                  placeholder="ex: https://example.com/icon.png"
                  border="1px solid #272637"
                  borderRadius={"10px"}
                  bgColor="#13161B"
                  color="#94979C"
                  _placeholder={{ color: "#94979C", fontSize: "12px" }}
                  value={adaptor.icon}
                  onChange={(e) =>
                    setAdaptor({ ...adaptor, icon: e.target.value })
                  }
                />
              </Flex>
            </Flex>
            <Flex
              gap={{ base: "10px", lg: "20px" }}
              alignItems="center"
              flexWrap={"wrap"}
              borderBottom="1px solid #282828"
              py="14px"
            >
              {Option.map((item) => (
                <div
                  className="flex gap-2 cursor-pointer items-center"
                  key={item.value}
                  onClick={() => setOption(item.value)}
                >
                  <div className="size-6 border border-[#94979C] rounded-full flex justify-center items-center">
                    {option === item.value && (
                      <div className="size-3 bg-[#94979C] rounded-full"></div>
                    )}
                  </div>
                  <div className="text-[#94979C] text-lg">{item.label}</div>
                </div>
              ))}
            </Flex>
            {option === "provider" && (
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

                <Flex gap="20px" w="fit-content" flex={1.7}>
                  <ProvidersCom
                    isShowValue
                    selectedProviders={
                      adaptor.providerId ? [adaptor.providerId] : []
                    }
                    setSelectedProviders={(value) => {
                      setAdaptor({ ...adaptor, providerId: value.toString() });
                    }}
                    onGetMethods={(value) => {
                      setProviderMethods(value);
                    }}
                  />

                  <PopoverComp
                    isShowValue={true}
                    lable="Methods"
                    data={providerMethods}
                    values={adaptor.method ? [adaptor.method] : []}
                    onSelected={(value) => {
                      setAdaptor({ ...adaptor, method: value.toString() });
                    }}
                  />
                </Flex>
              </Flex>
            )}

            {option === "adaptor" && (
              <Flex
                gap={{ base: "10px", lg: "20px" }}
                alignItems="center"
                flexWrap={"wrap"}
                borderBottom="1px solid #282828"
                py="14px"
              >
                <Flex flex={1}>
                  <Text color="white" fontSize="18px" fontWeight="semibold">
                    Adaptor:
                  </Text>
                </Flex>

                <Flex gap="20px" w="fit-content" flex={1.7}>
                  <AdaptorsCom
                    isShowValue
                    selectedAdaptors={
                      adaptor.adaptorId ? [adaptor.adaptorId] : []
                    }
                    setSelectedAdaptors={(value) => {
                      setAdaptor({ ...adaptor, adaptorId: value.toString() });
                    }}
                  />
                </Flex>
              </Flex>
            )}

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
              >
                <Flex flex={1}>
                  <Text color="white" fontSize="18px" fontWeight="semibold">
                    Category:
                  </Text>
                </Flex>

                <Flex gap="20px" flexWrap={"wrap"} flex={1.7}>
                  {categoriesRender.map((item, index) => (
                    <CheckBoxCustom
                      item={item}
                      isChecked={adaptor.categoryId === item.value}
                      onSelected={(value) => {
                        setAdaptor((prev: AdaptorCreateModel) => ({
                          ...prev,
                          categoryId:
                            prev.categoryId === Number(value)
                              ? 0
                              : Number(value),
                        }));
                      }}
                      key={index}
                    />
                  ))}
                </Flex>
              </Flex>
            </Flex>

            <Flex
              gap={{ base: "10px", lg: "20px" }}
              alignItems={{ base: "start", lg: "center" }}
              flexDirection={{ base: "column", lg: "row" }}
              borderBottom="1px solid #282828"
              py="26px"
            >
              <Flex flex={1}>
                <Text color="white" fontSize="18px" fontWeight="semibold">
                  Output&nbsp;Types:
                </Text>
              </Flex>

              <Flex gap="20px" flexWrap={"wrap"} flex={1.7}>
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
              py="20px"
              flexDirection={"column"}
              gap="20px"
              borderBottom="1px solid #282828"
            >
              <Flex
                gap={{ base: "10px", lg: "20px" }}
                alignItems={{ base: "start", lg: "center" }}
                flexDirection={{ base: "column", lg: "row" }}
              >
                <Flex flex={1}>
                  <Text color="white" fontSize="18px" fontWeight="semibold">
                    Ai Model:
                  </Text>
                </Flex>

                <Flex gap="20px" flexWrap={"wrap"} flex={1.7}>
                  {aiModelsRender.map((item, index) => (
                    <CheckBoxCustom
                      item={item}
                      isChecked={adaptor.aiModelId === item.value}
                      onSelected={(value) => {
                        setAdaptor((prev: AdaptorCreateModel) => ({
                          ...prev,
                          aiModelId:
                            prev.aiModelId === value.toString()
                              ? ""
                              : value.toString(),
                        }));
                      }}
                      key={index}
                    />
                  ))}
                </Flex>
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

            <InputOutput
              ref={inputRef}
              title="Input:"
              keyPlaceholder="Input Key (e.g. price, volume, etc.)"
              valuePlaceholder="Select Data Type"
            />

            <InputOutput
              ref={outputRef}
              title="Output:"
              keyPlaceholder="Output Key (e.g. price, volume, etc.)"
              valuePlaceholder="Select Data Type"
            />

            <Flex
              gap="20px"
              alignItems="center"
              py="20px"
              justifyContent="flex-end"
            >
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
                type="submit"
                isLoading={isLoadingCreateAdaptor}
              >
                Create Adaptor
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </ProtectedPage>
  );
}
