import CurlPlayground from "@/components/share-component/playground";
import { useCurlGenerator } from "@/libs/hooks/common/useCurlGenerator";
import { MethodItem } from "@/types/provider-type";
import Button from "@/views/components/Button";
import { Box, Tr, Table, Thead, Th, Tbody, Td, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPlay, FaTrash } from "react-icons/fa";

interface PlaygroundProps {
  methods: MethodItem[];
  providerId: string;
}

export default function Playground({ methods, providerId }: PlaygroundProps) {
  const [indexSelected, setIndexSelected] = useState<number | null>(null);
  const [curlCommand, setCurlCommand] = useState<string>("");

  const apiConfig = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
    endpoint: `v2/providers/executeMethod`,
    method: "POST" as const,
  };

  const { generateCurlCommand } = useCurlGenerator(apiConfig);

  const onHandleExecute = async (method: MethodItem, index: number) => {
    setIndexSelected(index);

    const curlCommand = generateCurlCommand({
      providerId: providerId,
      methodName: method.name,
      input: method.inputSchema.object,
    });

    setCurlCommand(curlCommand);
  };

  return (
    <>
      <Box
        w={"full"}
        minH="30vh"
        borderBottomRadius={"lg"}
        bg={"#0C0E12"}
        color={"#49B267"}
      >
        <Flex overflowX="auto">
          <Table variant="unstyled">
            <Thead borderBottom="1px solid #23262E">
              <Tr>
                <Th border="none">Name</Th>
                <Th border="none">Description</Th>
                <Th border="none"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {methods.map((method, i) => (
                <Tr key={method.name} borderBottom="1px solid #23262E">
                  <Td border="none">{method.name}</Td>
                  <Td border="none">{method.description}</Td>
                  <Td border="none">
                    <div className="flex gap-2 justify-end items-center">
                      <Button
                        onClick={() => onHandleExecute(method, i)}
                        leftIcon={<FaPlay />}
                        bg="rgb(15,18,22)"
                        border={"1px solid #2D7D44"}
                        color={"#3BB25D"}
                        borderRadius={"10px"}
                        _hover={{
                          bg: "#69FF93",
                          color: "black",
                        }}
                        w="fit-content"
                        px={"16px"}
                        py={"10px"}
                        bgColor="transparent"
                      >
                        Try it
                      </Button>
                      {indexSelected === i && (
                        <Button
                          onClick={() => {
                            setCurlCommand("");
                            setIndexSelected(null);
                          }}
                          leftIcon={<FaTrash />}
                          bg="rgb(15,18,22)"
                          border={"1px solid #94979C"}
                          color={"#94979C"}
                          borderRadius={"10px"}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
        {curlCommand && (
          <CurlPlayground
            initialCurlCommand={curlCommand}
            direction="horizontal"
            className="p-0"
            directionClassName="flex-col lg:flex-row"
          />
        )}
      </Box>
    </>
  );
}
