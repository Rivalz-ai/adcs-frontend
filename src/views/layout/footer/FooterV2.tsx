import React from "react";
import Link from "next/link";
import SubcribeForm from "./subcribe-form";
import { Flex, Image, Spacer, Text } from "@chakra-ui/react";
import {
  dev_resources_links,
  our_products_links,
  social_links,
  temps_links,
} from "@/libs/cons";

export default function FooterV2() {
  return (
    <Flex
      as="section"
      display="flex"
      flexDir="column"
      bg="#13161B"
      mt={{ lg: "136px" }}
    >
      <Flex
        mx="auto"
        w="full"
        maxW="1600px"
        pt="80px"
        display="flex"
        flexDir={{ base: "column", lg: "row" }}
        gap="40px"
        px={{ base: "24px", lg: "0px" }}
      >
        <Flex flex={1} flexDir="column" gap="40px" minH="188px">
          <Image src="/rivalz-logo.png" w="154px" alt="Rivalz Logo" />
          <Spacer />
          <Flex gap="8px">
            {social_links.map((link) => (
              <Link href={link.href} key={link.icon} target="_blank">
                <Flex
                  rounded="10px"
                  bg="transparent"
                  p="12px"
                  border="1px solid #373A40"
                  cursor="pointer"
                >
                  <Image src={`/icons/${link.icon}`} w="24px" alt={link.icon} />
                </Flex>
              </Link>
            ))}
          </Flex>
        </Flex>
        <Flex flex={1} minH="188px">
          <Flex flex={1} flexDir="column">
            <Text fontSize="14px" fontWeight="500" color="#FAFAFA">
              Dev Resources:
            </Text>
            <Flex flexDir="column" gap="16px" as="ul" mt="40px">
              {dev_resources_links.map((link) => (
                <Flex
                  as="li"
                  key={link.label}
                  color="#94979C"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="20px"
                >
                  <Link href={link.href} key={link.label}>
                    {link.label}
                  </Link>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex flex={1} flexDir="column">
            <Text fontSize="14px" fontWeight="500" color="#FAFAFA">
              Our Products:
            </Text>
            <Flex flexDir="column" gap="16px" as="ul" mt="40px">
              {our_products_links.map((link) => (
                <Flex
                  as="li"
                  key={link.label}
                  color="#94979C"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="20px"
                >
                  <Link href={link.href} key={link.label}>
                    {link.label}
                  </Link>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex flex={1} flexDir="column" gap="40px">
          <Text fontSize="14px" fontWeight="500" color="#FAFAFA">
            Join the Rivalz newsletter
          </Text>
          <SubcribeForm />
        </Flex>
      </Flex>

      <Flex
        mx="auto"
        w="full"
        maxW="1600px"
        mt="54px"
        display="flex"
        borderTop="1px solid #373A40"
        pb="40px"
        pt="40px"
        justifyContent="space-between"
        flexDir={{ base: "column-reverse", lg: "row" }}
        gap="40px"
        px={{ base: "24px", lg: "0px" }}
      >
        <Text
          color="#94979C"
          fontSize="14px"
          fontWeight="700"
          lineHeight="20px"
        >
          {`${new Date().getFullYear()}. Rivalz LLC`}
        </Text>
        <Flex
          display="flex"
          gap="16px"
          color="#94979C"
          fontSize="14px"
          fontWeight="700"
          lineHeight="20px"
        >
          {temps_links.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
