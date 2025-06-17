export interface ProviderItem {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  documentLink: string;
  createdAt: string;
  updatedAt: string;
  methods: MethodItem[];
  category: string;
  categoryId: number;
  requestCount: number;
  entities: string[];
  website?: string;
  github?: string;
  tokenId?: string;
}

export interface MethodItem {
  name: string;
  description: string;
  inputSchema: {
    id: number;
    name: string;
    object: Record<string, unknown>;
  };
  inputType: string;
  outputSchema: {
    id: number;
    name: string;
    object: Record<string, unknown>;
  };
  playground: string;
  type: string;
}
