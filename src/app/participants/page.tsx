"use client";
import { Flex, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import React from "react";

const ProjectCard = () => {
  return (
    <Box
      borderRadius="10px"
      borderWidth="1px"
      borderColor="#272637"
      padding="20px"
      bgGradient="radial-gradient(70.61% 50% at 50% 50%, rgba(31, 31, 31, 0.5) 0%, rgba(19, 22, 27, 0.5) 100%)"
      backdropFilter="blur(10px)"
      _hover={{ borderColor: "#2D7D44", cursor: "pointer" }}
      display="flex"
      flexDirection="column"
      gap="20px"
      overflow="hidden"
    >
      <Flex alignItems="flex-start" >
        <Box
          width="100px"
          height="100px"
          borderRadius="10px"
          bg="#49B267"
          mr="10px"
        />
        <Flex direction="column" flex="1">
          <Flex alignItems="start" justifyContent="space-between">
            <Text
              color="white"
              fontWeight="bold"
              fontSize="20px"
              lineHeight="24px"
            >
              Project Name Project Name Project Name
            </Text>

            <ExternalLinkIcon
              color="#94979C"
              _hover={{ color: "#2D7D44" }}
              w={"20px"}
              h={"20px"}
            />
          </Flex>
          <Text fontSize={"16px"} color="#94979C" mt="15px">
            Type of activity
          </Text>
        </Flex>
      </Flex>


      <Text color="#94979C" fontSize="16px" mt={"20px"}>
        Project description, general brief information about the project,
        something else.
      </Text>
    </Box>
  );
};

function page() {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Flex
        w="full"
        flexDir="column"
        gap="2"
        justifyContent="left"
        alignItems="left"
        mb="10"
        pt={{ base: "5", lg: "14" }}
        textAlign="left"
      >
        <Text color="white" as="h1" fontSize="5xl" fontWeight="bold" mb="1">
          Projects that use our Oracles
        </Text>
      </Flex>

      <SimpleGrid
     w="full"
     columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
     gap="20px"
      >
        {[...Array(4)].map((_, i) => (
          <ProjectCard key={i} />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default page;
