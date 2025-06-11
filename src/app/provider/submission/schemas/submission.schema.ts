import { z } from "zod";

const apiKeySchema = z
  .record(z.string().min(1, "API Key is required"))
  .optional();

const apiSchema = z.object({
  key: z.string().min(1, "API Key is required"),
  value: z.string().min(1, "API Value is required"),
});

export const submissionFormSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  apiKey: apiKeySchema,
  api: apiSchema,
  prUrl: z.string().url("Please enter a valid GitHub PR URL"),
  categoryId: z
    .number()
    .int()
    .positive("Category ID must be a positive integer"),
  documentLink: z.string().url("Please enter a valid documentation URL"),
  configUrl: z.string().url("Please enter a valid configuration file URL"),
  playground: z.string().optional(),
  method: z.string().optional(),
  input: z.string().optional(),
});

export type SubmissionFormData = z.infer<typeof submissionFormSchema>;
