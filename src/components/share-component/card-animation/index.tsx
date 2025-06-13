import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface CardAnimationProps {
  url: string;
  children: React.ReactNode;
}

export default function CardAnimation({ url, children }: CardAnimationProps) {
  return (
    <motion.div whileHover="hover" initial="initial" style={{ width: "100%" }}>
      <Link href={url} style={{ width: "100%", display: "block" }}>
        <Flex
          backgroundColor={"rgba(17,20,25,0.5)"}
          padding="20px"
          rounded="xl"
          border="1px solid"
          borderColor="#272637"
          boxShadow="lg"
          gap="10px"
          w="full"
          flexDir="column"
          cursor="pointer"
          position="relative"
          overflow="hidden"
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: "1px solid #2D7D44",
              borderRadius: "12px",
              zIndex: 1,
            }}
            variants={{
              initial: {
                clipPath: "inset(0 100% 0 0)",
              },
              hover: {
                clipPath: "inset(0 0 0 0)",
              },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          {children}
        </Flex>
      </Link>
    </motion.div>
  );
}
