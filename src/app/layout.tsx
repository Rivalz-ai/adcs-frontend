import "@rainbow-me/rainbowkit/styles.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../providers/providers";
import { Flex, Spacer } from "@chakra-ui/react";
import Footer from "./Footer";
import Navbar from "./Header";

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
          background:
            "linear-gradient(200deg, #1b103d 0%, #181a37 30%, #17161e 100%)",
        }}
      >
        <Providers>
          <Flex
            flexDir="column"
            w="full"
            maxW="1288px"
            mx="auto"
            minH="100vh"
            flex={1}
          >
            <Navbar />
            {children}
            <Spacer />
            <Footer />
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
