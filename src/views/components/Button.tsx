import { Button, ButtonProps } from "@chakra-ui/react";
import { useMemo } from "react";

interface AppButtonProps extends ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function AppButton({
  children,
  variant = "primary",
  ...props
}: AppButtonProps) {
  const variantStyle = useMemo(() => {
    if (variant === "primary") {
      return {
        borderColor: "#2D7D44",
        color: "#3BB25D",
        _hover: {
          bg: "rgba(45, 125, 68, 0.1)",
        },
      };
    }
    return {
      borderColor: "#94979C",
      color: "#94979C",
      _hover: {
        bg: "rgba(148, 151, 156, 0.1)",
      },
    };
  }, [variant]);

  return (
    <Button
      rounded="10px"
      px="16px"
      py="10px"
      border="1px solid #94979C"
      fontSize="16px"
      fontWeight="medium"
      lineHeight="24px"
      bg="transparent"
      {...variantStyle}
      {...props}
    >
      {children}
    </Button>
  );
}
