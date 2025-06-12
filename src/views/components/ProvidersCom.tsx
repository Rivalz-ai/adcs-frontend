import React, { useMemo } from "react";
import useGetAllProvider from "@/libs/hooks/apis/useGetAllProvider";
import PopoverComp from "../PopoverComp";
import { CommonItem } from "@/types/common-type";

interface ProvidersComProps {
  isShowValue?: boolean;
  selectedProviders: Array<string | number>;
  setSelectedProviders: (value: string | number) => void;
  onGetMethods?: (methods: CommonItem[]) => void;
}

export default function ProvidersCom({
  isShowValue,
  selectedProviders,
  setSelectedProviders,
  onGetMethods,
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

  const onSelectedProvider = (value: string | number) => {
    setSelectedProviders(value);
    if (onGetMethods) {
      const provider = providers.find((item) => item.id === value);
      if (provider) {
        onGetMethods(
          provider.methods.map((item) => ({
            label: item.name,
            value: item.name,
          }))
        );
      }
    }
  };

  return (
    <PopoverComp
      isShowValue={isShowValue}
      lable="Providers"
      data={providersRender}
      values={selectedProviders}
      onSelected={(value) => {
        onSelectedProvider(value);
      }}
    />
  );
}
