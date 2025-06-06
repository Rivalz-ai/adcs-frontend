"use client";

import React, { useMemo } from "react";
import PopoverComp from "../PopoverComp";
import { ProviderItem } from "@/types/provider-type";

interface OutputTypesProps {
  selectedOutputType: Array<string | number>;
  setSelectedOutputType: (value: string | number) => void;
  label?: string;
  data: Array<ProviderItem>;
}

export default function OutputTypes({
  selectedOutputType,
  setSelectedOutputType,
  label,
  data,
}: OutputTypesProps) {
  const outputDataRender = useMemo(() => {
    const uniqueTypes = Array.from(
      new Set(data.map((item) => item.categoryId))
    );

    return uniqueTypes.map((type) => ({
      label: type,
      value: type,
      subLabel: type,
    }));
  }, [data]);

  return (
    <PopoverComp
      lable={`${label || "Output Types"} `}
      data={[]}
      values={selectedOutputType}
      onSelected={(value) => {
        setSelectedOutputType(value);
      }}
    />
  );
}
