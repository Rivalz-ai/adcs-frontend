import { Flex, FlexProps, Input } from "@chakra-ui/react";
import { FaCirclePlus } from "react-icons/fa6";

import React, { useState } from "react";

export interface VariableModel {
  name: string;
  value: string;
}

interface VariablesProps extends FlexProps {
  onAddVariable: (model: VariableModel) => void;
}
export default function Variables({ onAddVariable, ...props }: VariablesProps) {
  const [model, setModel] = useState<VariableModel>({
    name: "",
    value: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setModel({
        ...model,
        name: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "_"),
      });
    } else {
      setModel({ ...model, value: e.target.value });
    }
  };

  const handleAddVariable = () => {
    onAddVariable(model);
    setModel({ name: "", value: "" });
  };

  return (
    <Flex gap="10px" alignItems="center" {...props}>
      <Input
        name="name"
        placeholder="Variable Name (e.g. user_id)"
        border="1px solid #949191"
        bgColor="#282828"
        color="gray.400"
        _placeholder={{ color: "gray.400", fontSize: "12px" }}
        value={model.name}
        onChange={handleChange}
      />
      <Input
        name="value"
        placeholder="Variable Value (e.g. 1234567890)"
        border="1px solid #949191"
        bgColor="#282828"
        color="gray.400"
        _placeholder={{ color: "gray.400", fontSize: "12px" }}
        value={model.value}
        onChange={handleChange}
      />
      <FaCirclePlus
        size={60}
        color="gray"
        cursor="pointer"
        onClick={handleAddVariable}
      />
    </Flex>
  );
}
