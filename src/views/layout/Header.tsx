"use client";
import {
  Box,
  Flex,
  Link,
  Button,
  Menu,
  MenuList,
  MenuItem,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  IconButton,
  MenuButton,
  HStack,
  Image,
  ChakraProvider,
} from "@chakra-ui/react";
import { ChatIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaEthereum } from "react-icons/fa";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useMemo } from "react";
import React from "react";
import useLogin from "@/libs/hooks/apis/auths/useLogin";
import { usePathname } from "next/navigation";
import { NAVS } from "@/libs/cons";
import AppButton from "@/views/components/Button";
export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { logout } = useLogin();

  const pathname = usePathname();

  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();

  const lable = useMemo(() => {
    if (address) return address.slice(0, 6) + "..." + address.slice(-4);
    return "Connect Wallet";
  }, [address]);

  return (
    <>
      <Box py="" px="">
        <Flex
          align="center"
          bg="rgba(19, 22, 27, 0.75)"
          rounded="10px"
          px="25px"
          py="12px"
          border="1px solid rgba(244, 244, 244, 0.12)"
          zIndex="10px"
        >
          <IconButton
            icon={<HamburgerIcon />}
            variant="outline"
            colorScheme="whiteAlpha"
            aria-label="Open menu"
            onClick={onOpen}
            ref={btnRef}
            display={{ base: "flex", lg: "none" }}
          />

          <Link href="/">
            <Image
              src="/logo-v2.png"
              w="133px"
              alt="Rivalz ADCS"
              ml={{ base: "30px", lg: "unset" }}
            />
          </Link>

          <Flex
            align="center"
            display={{ base: "none", lg: "flex" }}
            borderRadius="10px"
          >
            <Flex ml="67px">
              {NAVS.map((nav) => (
                <Link
                  key={nav.label}
                  href={nav.href}
                  mx="4"
                  color={pathname === nav.href ? "#69FF93" : "#FAFAFA"}
                  fontWeight="medium"
                  fontSize="16px"
                  lineHeight="24px"
                  _hover={{
                    color: "#69FF93",
                  }}
                >
                  {nav.label}
                </Link>
              ))}
            </Flex>
          </Flex>

          <Spacer />

          <Flex align="center" display={{ base: "none", lg: "flex" }}>
            {isConnected && (
              <Link href="/adaptor/me">
                <AppButton variant="secondary">Your Adaptor</AppButton>
              </Link>
            )}

            {!isConnected && (
              <AppButton onClick={() => openConnectModal?.()}>
                Connect Wallet
              </AppButton>
            )}

            {isConnected && (
              <ChakraProvider>
                <Menu>
                  <MenuButton
                    rounded="10px"
                    px="16px"
                    py="10px"
                    border="1px solid #94979C"
                    fontSize="16px"
                    fontWeight="medium"
                    lineHeight="24px"
                    bg="transparent"
                    borderColor={"#2D7D44"}
                    _hover={{ bg: "rgba(45, 125, 68, 0.1)" }}
                    color={"#3BB25D"}
                    as={Button}
                    ml="30px"
                  >
                    {lable}
                  </MenuButton>
                  <MenuList
                    bg="rgba(19, 22, 27, 0.75)"
                    rounded="10px"
                    border="1px solid"
                    color={"white"}
                    borderColor="rgba(255,255,255, 0.08)"
                  >
                    <MenuItem
                    bg={"transparent"}
                    color={"white"}
                      onClick={() => logout()}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </ChakraProvider>
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
              href="/"
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
              href="/provider"
              mx="4"
              color="gray.300"
              display="block"
              borderBottom="1px solid rgba(255,255,255, 0.08)"
              py="10px"
            >
              Provider
            </Link>
            <Link
              href="/participants"
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
