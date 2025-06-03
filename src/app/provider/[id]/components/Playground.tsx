import useExecuteProvider from "@/libs/hooks/apis/useExecuteProvider";
import { MethodItem } from "@/types/provider-type";
import Button from "@/views/components/Button";
import { Box, Tr, Table, Thead, Th, Tbody, Td } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactJson from "react-json-view";

interface PlaygroundProps {
  methods: MethodItem[];
}

export default function Playground({ methods }: PlaygroundProps) {
  const [selectedMethod, setSelectedMethod] = useState<MethodItem>();
  const [dataExecute, setDataExecute] = useState<unknown>();
  const { mutateAsync, isPending } = useExecuteProvider();

  const onHandleExecute = async (method: MethodItem) => {
    setSelectedMethod(method);
    const response = await mutateAsync(method);
    setDataExecute(response);
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
        <Table variant="unstyled">
          <Thead borderBottom="1px solid #23262E">
            <Tr>
              <Th border="none">Name</Th>
              <Th border="none">Description</Th>
              <Th border="none"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {methods.map((method) => (
              <Tr key={method.name} borderBottom="1px solid #23262E">
                <Td border="none">{method.name}</Td>
                <Td border="none">{method.description}</Td>
                <Td border="none">
                  <Button
                    onClick={() => onHandleExecute(method)}
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
                    my={"4"}
                    bgColor="transparent"
                    isDisabled={isPending}
                    isLoading={
                      selectedMethod?.name === method.name && isPending
                    }
                  >
                    Execute
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {dataExecute && (
        <Box bg={"#0C0E12"} padding={"20px"} borderRadius={"10px"}>
          <Box bg={"#13161b"} borderRadius={"10px"} padding={"5px"}>
            {dataExecute && (
              <ReactJson
                theme={{
                  base00: "#13161b", // Background color
                  base01: "#1c1f26", // Lighter background
                  base02: "#2e323c", // Selection background
                  base03: "#3e4451", // Comments, invisibles, line highlighting
                  base04: "#4b5263", // Darker foreground
                  base05: "#FFFFFF", // Default foreground
                  base06: "#d3dae3", // Light foreground
                  base07: "#e6e9ef", // Light background
                  base08: "#f2777a", // Variables, XML tags, markup link text, markup lists, diff deleted
                  base09: "#F9C981", // Integers, booleans, constants, XML attributes, markup link URLs
                  base0A: "#ffcc66", // Classes, markup bold, search text background
                  base0B: "#F9C981", // Strings, inherited class, markup code, diff inserted
                  base0C: "#99cc99", // Support, regular expressions, escape characters, markup quotes
                  base0D: "#94979C", // Functions, methods, attribute IDs, headings
                  base0E: "#cc99cc", // Keywords, storage, selector, markup italic, diff changed
                  base0F: "#d27b53", // Deprecated, opening/closing embedded language tags, e.g. <?php ?>
                }}
                src={dataExecute}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
