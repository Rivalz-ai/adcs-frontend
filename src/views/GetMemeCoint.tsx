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
      {!isLoading && (
        <Button
          onClick={onHandleExecute}
          w="fit-content"
          bgColor="#6a667b"
          color="white"
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          Execute
        </Button>
      )}

      <Accordion
        w="full"
        defaultIndex={[0]}
        allowMultiple={false}
        borderRadius="5px"
        overflow="hidden"
      >
        <AccordionItem border="none" bgColor="#363346">
          <AccordionButton>
            <Text>1. Performing market research result</Text>
            <Spacer />
            <AccordionIcon color="white" />
          </AccordionButton>
          <AccordionPanel pb={4} borderTop="1px solid #595768">
            {isLoading ? (
              <FetchingComponent />
            ) : (
              <Text
                dangerouslySetInnerHTML={{
                  __html: data?.market_research || "",
                }}
              />
            )}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none" bgColor="#363346">
          <AccordionButton>
            <Text>2. Getting memecoin data result</Text>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>

          {!isLoading && (
            <AccordionPanel pb={4} borderTop="1px solid #595768">
              <Text>{JSON.stringify(data?.memecoins_data)}</Text>
            </AccordionPanel>
          )}
        </AccordionItem>
        <AccordionItem border="none" bgColor="#363346">
          <AccordionButton>
            <Text>3. Final decision result</Text>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>

          {!isLoading && (
            <AccordionPanel pb={4} borderTop="1px solid #595768">
              <Text>{JSON.stringify(data?.final_decision)}</Text>
            </AccordionPanel>
          )}
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
