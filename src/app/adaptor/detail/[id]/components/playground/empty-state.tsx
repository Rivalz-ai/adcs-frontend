import { Flex, Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

export default function EmptyState() {
  return (
    <Flex flex={1} flexDir="column" minH="50vh" p={6}>
      <Alert
        status="info"
        bg="transparent"
        color="#35834b"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        fontSize="14px"
      >
        <AlertIcon />
        No input entity defined for this adaptor
      </Alert>
    </Flex>
  );
}
