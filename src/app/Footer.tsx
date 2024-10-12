import { Box, Flex, Link, IconButton, Stack } from "@chakra-ui/react";
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaYoutube,
  FaLinkedin,
  FaDiscord,
  FaSpotify,
} from "react-icons/fa";

export default function Footer() {
  return (
    <Box as="footer" py="8" color="gray.500">
      <Flex justify="center" mb="4" flexWrap="wrap">
        <Link mx="3" href="#" color="gray.400" _hover={{ color: "white" }}>
          Home
        </Link>
        <Link mx="3" href="#" color="gray.400" _hover={{ color: "white" }}>
          Blog
        </Link>
        <Link mx="3" href="#" color="gray.400" _hover={{ color: "white" }}>
          Jobs
        </Link>
        <Link mx="3" href="#" color="gray.400" _hover={{ color: "white" }}>
          Docs
        </Link>
        <Link mx="3" href="#" color="gray.400" _hover={{ color: "white" }}>
          Past Events
        </Link>
      </Flex>

      <Flex
        justify="center"
        mb="4"
        flexWrap="wrap"
        columnGap="10px"
        rowGap="10px"
      >
        <Link mx="2" href="#" color="gray.400" _hover={{ color: "white" }}>
          Status
        </Link>
        <Link mx="2" href="#" color="gray.400" _hover={{ color: "white" }}>
          Testnet
        </Link>
        <Link mx="2" href="#" color="gray.400" _hover={{ color: "white" }}>
          Privacy Policy
        </Link>
        <Link mx="2" href="#" color="gray.400" _hover={{ color: "white" }}>
          Terms of Service
        </Link>
        <Link mx="2" href="#" color="gray.400" _hover={{ color: "white" }}>
          Brand Assets
        </Link>
        <Link mx="2" href="#" color="gray.400" _hover={{ color: "white" }}>
          Partnership Requests ↗
        </Link>
        <Link mx="2" href="#" color="gray.400" _hover={{ color: "white" }}>
          Forum ↗
        </Link>
        <Link mx="2" href="#" color="gray.400" _hover={{ color: "white" }}>
          Security ↗
        </Link>
      </Flex>

      <Flex justify="center" mt="4" flexWrap="wrap">
        <Stack direction="row" spacing="6">
          <IconButton
            as="a"
            href="#"
            aria-label="Github"
            icon={<FaGithub />}
            colorScheme="whiteAlpha"
            variant="ghost"
            fontSize="xl"
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter />}
            colorScheme="whiteAlpha"
            variant="ghost"
            fontSize="xl"
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Instagram"
            icon={<FaInstagram />}
            colorScheme="whiteAlpha"
            variant="ghost"
            fontSize="xl"
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Telegram"
            icon={<FaTelegram />}
            colorScheme="whiteAlpha"
            variant="ghost"
            fontSize="xl"
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Discord"
            icon={<FaDiscord />}
            colorScheme="whiteAlpha"
            variant="ghost"
            fontSize="xl"
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Spotify"
            icon={<FaSpotify />}
            colorScheme="whiteAlpha"
            variant="ghost"
            fontSize="xl"
          />
          <IconButton
            as="a"
            href="#"
            aria-label="YouTube"
            icon={<FaYoutube />}
            colorScheme="whiteAlpha"
            variant="ghost"
            fontSize="xl"
          />
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            colorScheme="whiteAlpha"
            variant="ghost"
            fontSize="xl"
          />
        </Stack>
      </Flex>
    </Box>
  );
}
