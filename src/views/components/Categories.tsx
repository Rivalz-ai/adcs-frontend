"use client";

import React, { useMemo } from "react";
import PopoverComp from "../PopoverComp";
import useGetCategories from "@/libs/hooks/apis/useGetCategories";

interface CategoriesProps {
  isShowValue?: boolean;
  selectedCategories: Array<string | number>;
  setSelectedCategories: (value: string | number) => void;
}

export default function Categories({
  isShowValue,
  selectedCategories,
  setSelectedCategories,
}: CategoriesProps) {
  const { categories } = useGetCategories();

  const categoriesRender = useMemo(() => {
    return categories.map((item) => {
      return {
        label: item.name,
        value: item.id,
        subLabel: item.name,
      };
    });
  }, [categories]);

  return (
    <PopoverComp
      isShowValue={isShowValue}
      lable="Categories"
      data={categoriesRender}
      values={selectedCategories}
      onSelected={(value) => {
        setSelectedCategories(value);
      }}
    />
  );
}
