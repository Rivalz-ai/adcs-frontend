import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../providers/providers";
import { Flex, Spacer } from "@chakra-ui/react";
import Navbar from "../views/layout/Header";
import Marquee from "../views/layout/Marquee";
import FooterV2 from "../views/layout/footer/FooterV2";

const euclidCircular = localFont({
  src: [
    {
      path: "./fonts/EuclidCircularABold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/EuclidCircularABoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/EuclidCircularAItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/EuclidCircularALight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/EuclidCircularALightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/EuclidCircularAMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/EuclidCircularAMediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/EuclidCircularARegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/EuclidCircularASemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/EuclidCircularASemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-euclid",
});

export const metadata: Metadata = {
  title: "Rivalz ADCS Adaptor",
  description: "Create and manage Rivalz ADCS configurations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${euclidCircular.variable}`}
        style={{
          background: "#0C0E12",
        }}
      >
        <Providers>
          <Flex
            w="1500px"
            h="1500px"
            borderRadius="full"
            bgColor="rgba(90, 254, 176, 0.10)"
            zIndex={0}
            position="absolute"
            top="-50%"
            left="-50%"
            filter="blur(200px)"
          />
          <Marquee />
          <Flex
            flexDir="column"
            w="full"
            maxW="1600px"
            mx="auto"
            minH="100vh"
            flex={1}
            position="relative"
            zIndex={1}
          >
            <Navbar />
            {children}
            <Spacer />
          </Flex>
          <FooterV2 />
        </Providers>
      </body>
    </html>
  );
}
