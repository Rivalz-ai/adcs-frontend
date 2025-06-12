import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalProps,
  Text,
} from "@chakra-ui/react";
import React from "react";
import AppButton from "./Button";

interface IModalProps extends Omit<ModalProps, "children"> {
  onConfirm: () => void;
  description?: string;
  isLoading?: boolean;
}
export default function ConfirmModal({
  onConfirm,
  isLoading = false,
  description = "Are you sure you want to perform this action?",
  ...props
}: IModalProps) {
  return (
    <Modal isCentered size="xs" {...props}>
      <ModalOverlay />
      <ModalContent bg="rgb(15,18,22)" border="1px solid #2D7D44">
        <ModalCloseButton color="#2d2f34" />
        <ModalBody paddingTop="10">
          <Text color="#2D7D44" textAlign="center">
            {description}
          </Text>
        </ModalBody>

        <ModalFooter gap="10px">
          <AppButton
            onClick={props.onClose}
            w="full"
            borderColor="#2d2f34"
            color="#2d2f34"
          >
            Cancel
          </AppButton>
          <AppButton onClick={onConfirm} w="full" isLoading={isLoading}>
            Confirm
          </AppButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
