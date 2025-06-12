import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppButton from "@/views/components/Button";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { Plus, Trash } from "lucide-react";
import React, { useState, forwardRef, useImperativeHandle } from "react";

const dataTypes = [
  { label: "String", value: "string" },
  { label: "Number", value: "number" },
  { label: "Boolean", value: "boolean" },
];

type DataType = "string" | "number" | "boolean";
type DataItem = Record<string, DataType>;

interface InputOutputProps {
  title: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
}

export interface InputOutputRef {
  getData: () => DataItem[];
  clearData: () => void;
}

const InputOutput = forwardRef<InputOutputRef, InputOutputProps>(
  ({ title, keyPlaceholder, valuePlaceholder }, ref) => {
    const toast = useToast();
    const [data, setData] = useState<DataItem[]>([]);
    const [key, setKey] = useState<string>("");
    const [value, setValue] = useState<DataType | null>(null);

    useImperativeHandle(ref, () => ({
      getData: () => data,
      clearData: () => {
        setData([]);
        setKey("");
        setValue(null);
      },
    }));

    const handleAddData = () => {
      if (!key || !value) {
        toast({
          title: "Please enter a key and value",
          status: "error",
        });
        return;
      }
      // don't allow key to start with underscore or number
      if (key.startsWith("_") || /^[0-9]/.test(key.charAt(0))) {
        toast({
          title: "Invalid key",
          description: "Key cannot start with underscore or number",
          status: "error",
        });
        return;
      }
      //Trim key with underscore
      const trimmedKey = key.replace(/^_+|_+$/g, "");

      if (data.some((item) => item[trimmedKey])) {
        toast({
          title: "Key already exists",
          description: "Please enter a different key",
          status: "error",
        });
        return;
      }
      setData([...data, { [trimmedKey]: value }]);
      setKey("");
      setValue(null);
    };

    const handleDeleteData = (index: number) => {
      setData(data.filter((_, i) => i !== index));
    };

    const onChange = (value: string) => {
      setValue(value as DataType);
    };

    /**
     * @param value key
     * convert value to key and remove space with underscore.
     * remove all non-alphanumeric characters
     */
    const onKeyChange = (value: string) => {
      setKey(value.replace(/[^a-zA-Z0-9]/g, "_"));
    };

    return (
      <Flex
        gap={{ base: "10px", lg: "20px" }}
        alignItems={{ base: "start", lg: "start" }}
        flexDirection={{ base: "column", sm: "row" }}
        borderBottom="1px solid #282828"
        py="17px"
      >
        <Flex flex={1} alignItems="start" justifyContent="start">
          <Text color="white" fontSize="18px" fontWeight="semibold">
            {title}
          </Text>
        </Flex>
        <Flex
          justifyContent="flex-end"
          w={{ base: "100%", sm: "fit-content", lg: "full" }}
          flex={1.7}
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Input
                  placeholder={keyPlaceholder}
                  className="w-full placeholder:text-[#94979C] h-[46px] text-[#94979C] border-[#282828]"
                  value={key}
                  onChange={(e) => onKeyChange(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Select value={value || ""} onValueChange={onChange}>
                  <SelectTrigger className="w-full placeholder:text-[#94979C] h-[46px] text-[#94979C] border-[#282828]">
                    <SelectValue
                      placeholder={valuePlaceholder}
                      className="text-[#94979C] placeholder:text-[#94979C]"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {dataTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <AppButton onClick={handleAddData}>
                <Plus />
              </AppButton>
            </div>

            {data.map((item, index) => {
              const key = Object.keys(item)[0];
              const value = item[key];
              return (
                <div
                  key={`${key}-${index}`}
                  className="flex gap-4 items-center w-full border rounded-md border-[#282828] pl-4 bg-[#28282880]"
                >
                  <div className="flex-1">
                    <p className="text-[#94979C]">{key}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#94979C]">{value}</p>
                  </div>
                  <AppButton
                    border="none"
                    _hover={{
                      bg: "transparent",
                    }}
                    onClick={() => handleDeleteData(index)}
                  >
                    <Trash />
                  </AppButton>
                </div>
              );
            })}
          </div>
        </Flex>
      </Flex>
    );
  }
);

InputOutput.displayName = "InputOutput";

export default InputOutput;
