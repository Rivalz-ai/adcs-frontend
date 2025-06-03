import { AdaptorItem } from "@/types/adapter-type";
import { UseFormRegister } from "react-hook-form";

export interface PlaygroundContainerProps {
  adaptorId: string;
  inputEntity?: Pick<AdaptorItem, "inputEntity">;
}

export interface SubmitResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: unknown;
  message: string;
}

export interface DynamicFormProps {
  inputEntity: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  isSubmitting: boolean;
  onReset: () => void;
}

export interface FormFieldProps {
  fieldKey: string;
  fieldValue: unknown;
  register: UseFormRegister<Record<string, unknown>>;
  error?: string;
}

export interface SubmitResultDisplayProps {
  result: SubmitResult;
}
