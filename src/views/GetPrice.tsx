"use client";

import { useCoins, useCurrency, useCoinPrice } from "@/libs/hooks/apis/prices";
import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import Dropdown from "./Dropdown";

export default function GetPrice() {
  const { currency } = useCurrency();
  const { coins } = useCoins();

  const [selectedCoin, setSelectedCoin] = useState<string>("bitcoin");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("usd");

  const { coinPrice, isLoading } = useCoinPrice(selectedCoin, selectedCurrency);

  const coinData = useMemo(
    () =>
      coins?.map((coin) => ({
        value: coin.id,
        label: coin.name,
      })) || [],
    [coins]
  );

  const currencyData = useMemo(
    () =>
      currency?.map((currency) => ({
        value: currency.name,
        label: currency.name,
      })) || [],
    [currency]
  );

  return (
    <Flex flex={1} flexDir="column">
      <Stack
        gap="10px"
        alignItems="center"
        direction={{ base: "column", md: "row" }}
      >
        <Flex alignItems="center" gap="10px">
          <Text>Select: </Text>
          <Dropdown
            lable={"Select Coin"}
            data={coinData}
            value={selectedCoin}
            onSelected={(value: string | number) =>
              setSelectedCoin(value as string)
            }
          />

          <Dropdown
            lable={"Select Currency"}
            data={currencyData}
            value={selectedCurrency}
            onSelected={(value: string | number) =>
              setSelectedCurrency(value as string)
            }
          />
        </Flex>

        {!isLoading && (
          <Text>
            Price:{" "}
            {coinPrice?.[selectedCoin]?.[selectedCurrency]?.toLocaleString(
              "en-US",
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}{" "}
            {selectedCurrency}
          </Text>
        )}
        {isLoading && <Text>Fetching...</Text>}
      </Stack>
    </Flex>
  );
}
