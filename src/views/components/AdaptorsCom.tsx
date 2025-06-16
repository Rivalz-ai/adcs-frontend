import React, { useMemo } from "react";
import useGetAllAdaptor from "@/libs/hooks/apis/useGetAllAdaptor";
import PopoverComp from "../PopoverComp";

interface AdaptorsComProps {
  isShowValue?: boolean;
  selectedAdaptors: Array<string | number>;
  setSelectedAdaptors: (
    value: string | number,
    inputSchema?: Record<string, unknown>
  ) => void;
}

export default function AdaptorsCom({
  isShowValue,
  selectedAdaptors,
  setSelectedAdaptors,
}: AdaptorsComProps) {
  const { data } = useGetAllAdaptor();

  const adaptorsRender = useMemo(() => {
    return data.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: item.name,
        inputSchema: item.inputEntity,
      };
    });
  }, [data]);

  return (
    <PopoverComp
      isShowValue={isShowValue}
      lable="Adaptors"
      data={adaptorsRender}
      values={selectedAdaptors}
      onSelected={(value) => {
        setSelectedAdaptors(
          value,
          adaptorsRender.find((item) => item.value === value)?.inputSchema
        );
      }}
    />
  );
}
