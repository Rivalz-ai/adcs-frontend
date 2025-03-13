import React, { useMemo } from "react";
import useGetAllProvider from "@/libs/hooks/apis/useGetAllProvider";
import PopoverComp from "../PopoverComp";

interface ProvidersComProps {
  isShowValue?: boolean;
  selectedProviders: Array<string | number>;
  setSelectedProviders: (value: string | number) => void;
}

export default function ProvidersCom({
  isShowValue,
  selectedProviders,
  setSelectedProviders,
}: ProvidersComProps) {
  const { data: providers } = useGetAllProvider();

  const providersRender = useMemo(() => {
    return providers.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: item.name,
      };
    });
  }, [providers]);
  return (
    <PopoverComp
      isShowValue={isShowValue}
      lable="Providers"
      data={providersRender}
      values={selectedProviders}
      onSelected={(value) => {
        setSelectedProviders(value);
      }}
    />
  );
}
