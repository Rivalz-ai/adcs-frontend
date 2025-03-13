"use client";

import React, { useMemo } from "react";
import PopoverComp from "../PopoverComp";
import useGetOutPutTypes from "@/libs/hooks/apis/useGetOutPutTypes";

interface OutputTypesProps {
  selectedOutputType: Array<string | number>;
  setSelectedOutputType: (value: string | number) => void;
}

export default function OutputTypes({
  selectedOutputType,
  setSelectedOutputType,
}: OutputTypesProps) {
  const { outputData } = useGetOutPutTypes();

  const outputDataRender = useMemo(() => {
    return outputData.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: item.name,
      };
    });
  }, [outputData]);

  return (
    <PopoverComp
      lable="Output Types"
      data={outputDataRender}
      values={selectedOutputType}
      onSelected={(value) => {
        setSelectedOutputType(value);
      }}
    />
  );
}
