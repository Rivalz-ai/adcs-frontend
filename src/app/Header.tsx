"use client";
import {
  Box,
  Flex,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Spacer,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChatIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaEthereum } from "react-icons/fa";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useMemo } from "react";
import React from "react";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  // Check if the screen size is mobile or desktop
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const lable = useMemo(() => {
    if (address) return address.slice(0, 6) + "..." + address.slice(-4);
    return "Connect Wallet";
  }, [address]);

  return (
    <>
      <Box py="2" px="6">
        <Flex align="center">
          {isMobile && (
            <IconButton
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="whiteAlpha"
              aria-label="Open menu"
              onClick={onOpen}
              ref={btnRef}
            />
          )}

          <Flex align="center" display={{ base: "none", lg: "flex" }}>
            <Link href="/" mx="4" color="gray.300" fontWeight="bold">
              Adaptors
            </Link>
            <Link href="/provider" mx="4" color="gray.300">
              Provider
            </Link>
            <Link href="#" mx="4" color="gray.300">
              Participants
            </Link>
            <Link href="#" mx="4" color="gray.300">
              Network
            </Link>
            <Link href="#" mx="4" color="gray.300">
              Docs
            </Link>
          </Flex>

          <Spacer />

          <Flex align="center">
            <Flex alignItems="center" display={{ base: "none", lg: "flex" }}>
              <Link href="#" mx="4" color="gray.300">
                <ChatIcon mr="2" />
                Support
              </Link>

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="link"
                  color="gray.300"
                  leftIcon={<FaEthereum />}
                >
                  Rivalz 2
                </MenuButton>
              </Menu>
            </Flex>

            {!isConnected && (
              <Button
                as={Button}
                variant="solid"
                bg="gray.800"
                ml="4"
                px="4"
                _hover={{ bgGradient: "linear(to-b, #1b103d, #181a37)" }}
                onClick={() => openConnectModal?.()}
              >
                <Text as="span" fontWeight="bold" color="white">
                  {lable}
                </Text>
              </Button>
            )}

            {isConnected && (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="solid"
                  bg="gray.800"
                  ml="4"
                  px="4"
                  _hover={{ bgGradient: "linear(to-b, #1b103d, #181a37)" }}
                  onClick={() => alert(1)}
                >
                  <Text as="span" fontWeight="bold" color="white">
                    {lable}
                  </Text>
                </MenuButton>

                <MenuList
                  bgGradient="linear(to-b, #1b103d, #181a37)"
                  color="white"
                  border="1px solid"
                  borderColor="rgba(255,255,255, 0.08)"
                >
                  <MenuItem
                    bgGradient="linear(to-b, #1b103d, #181a37)"
                    onClick={() => disconnect()}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bg="#0d0d18"
          borderRight="1px solid rgba(255,255,255, 0.08)"
        >
          <DrawerHeader
            border="1px solid"
            borderColor="rgba(255,255,255, 0.08)"
            color="gray.400"
          >
            Menu
          </DrawerHeader>

          <DrawerBody>
            <Link
              href="#"
              mx="4"
              color="gray.300"
              fontWeight="bold"
              display="block"
              borderBottom="1px solid rgba(255,255,255, 0.08)"
              py="10px"
            >
              Adaptors
            </Link>
            <Link
              href="#"
              mx="4"
              color="gray.300"
              display="block"
              borderBottom="1px solid rgba(255,255,255, 0.08)"
              py="10px"
            >
              Participants
            </Link>
            <Link
              href="#"
              mx="4"
              color="gray.300"
              display="block"
              borderBottom="1px solid rgba(255,255,255, 0.08)"
              py="10px"
            >
              Network
            </Link>
            <Link
              href="#"
              mx="4"
              color="gray.300"
              display="block"
              borderBottom="1px solid rgba(255,255,255, 0.08)"
              py="10px"
            >
              Docs
            </Link>
            <Spacer />
            <HStack w="full" alignItems="flex-start" mt="20px">
              <Link href="#" mx="4" color="gray.300">
                <ChatIcon mr="2" />
                Support
              </Link>

              <Button variant="link" color="gray.300" leftIcon={<FaEthereum />}>
                Rivalz 2
              </Button>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
