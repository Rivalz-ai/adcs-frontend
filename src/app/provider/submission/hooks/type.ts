export interface SubmissionModel {
  url: string;
  apiKey: Record<string, string>;
  prUrl: string;
  categoryId: number;
  documentLink: string;
  configUrl: string;
}

export interface VerifySubmissionMethod {
  method_name: string;
  description: string;
  input_schema: Record<string, string>;
  input_type: string;
  output_schema: Record<string, string>;
  type: string;
  playground: string;
}

export interface VerifySubmissionResponse {
  name: string;
  description: string;
  iconUrl: string;
  baseUrl: string;
  documentLink: string;
  prUrl: string;
  methods: VerifySubmissionMethod[];
}

export interface SubmissionResponse {
  message: string;
  data: {
    providerId: number;
    providerCode: string;
  };
}
