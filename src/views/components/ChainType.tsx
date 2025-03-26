/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useMemo } from "react";
import PopoverComp from "../PopoverComp";

interface ChainTypeProps {
  isShowValue?: boolean;
  selectedChainType?: string;
  setselectedchaintype: (value: string) => void;
  
}

export default function ChainType({
  isShowValue,
  selectedChainType,
  setselectedchaintype,
}: ChainTypeProps) {
  const options = useMemo(
    () => [
      { label: "EVM", value: "EVM" },
      { label: "NON_EVM", value: "NON_EVM" },
    ],
    []
  );

  return (
    <PopoverComp
      isShowValue={isShowValue}
      lable="Chain Type"
      data={options}
      values={selectedChainType ? [selectedChainType] : []}
      onSelected={(value) => {
        setselectedchaintype(value as string);
      }}
    //@ts-ignore
      isSingleSelect // Ensures only one option is selected
    />
  );
}