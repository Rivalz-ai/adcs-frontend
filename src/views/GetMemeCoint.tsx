import useGetInference from "@/libs/hooks/apis/getInference";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const FetchingComponent = () => (
  <Flex w="full" justify="center" align="center" gap={2}>
    <Spinner />
    <Text>Loading...</Text>
  </Flex>
);

export default function GetMemeCoint() {
  const [isTrigger, setIsTrigger] = useState(false);
  const { data, isLoading, refetch } = useGetInference(isTrigger);

  const onHandleExecute = () => {
    if (!isTrigger) {
      setIsTrigger(true);
    } else {
      refetch();
    }
  };
  return (
    <Flex w="full" flexDir="column" gap={4}>
      <Accordion
        w="full"
        defaultIndex={[0]}
        allowMultiple={false}
        borderRadius="10px"
        overflow="hidden"
        border="1px solid #23262E"
      >
        <AccordionItem>
          <AccordionButton bg={"rgba(0, 0, 0, 0.3)"} color={"white"}>
            <Text>1. Performing market research result</Text>
            <Spacer />
            <AccordionIcon color="white" />
          </AccordionButton>
          <AccordionPanel
            pb={4}
            borderTop="1px solid #23262E"
            bg={"rgba(0, 0, 0, 0.1)"}
            color={"#49B267"}
          >
            {isLoading ? (
              <FetchingComponent />
            ) : (
              <ReactMarkdown>{data?.market_research}</ReactMarkdown>
            )}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton bg={"rgba(0, 0, 0, 0.3)"} color={"white"}>
            <Text>2. Getting memecoin data result</Text>
            <Spacer />
            <AccordionIcon color="white" />
          </AccordionButton>

          {!isLoading && (
            <AccordionPanel
              pb={4}
              borderTop="1px solid #23262E"
              bg={"rgba(0, 0, 0, 0.1)"}
              color={"#49B267"}
            >
              <Text>{JSON.stringify(data?.memecoins_data)}</Text>
            </AccordionPanel>
          )}
        </AccordionItem>
        <AccordionItem>
          <AccordionButton bg={"rgba(0, 0, 0, 0.3)"} color={"white"}>
            <Text>3. Final decision result</Text>
            <Spacer />
            <AccordionIcon color="white" />
          </AccordionButton>

          {!isLoading && (
            <AccordionPanel
              pb={4}
              borderTop="1px solid #23262E"
              bg={"rgba(0, 0, 0, 0.1)"}
              color={"#49B267"}
            >
              <Text>{JSON.stringify(data?.final_decision)}</Text>
            </AccordionPanel>
          )}
        </AccordionItem>
      </Accordion>

      {!isLoading && (
        <Button
          onClick={onHandleExecute}
          isDisabled={isLoading}
          isLoading={isLoading}
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
        >
          Execute
        </Button>
      )}
    </Flex>
  );
}
