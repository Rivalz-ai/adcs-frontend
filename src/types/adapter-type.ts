export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface OutputType {
  id: number;
  name: string;
  coordinatorAddress: string;
  fulfillDataRequestFn: string;
  createdAt: string;
  updatedAt: string;
}

interface Chain {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdaptorItem {
  id: number;
  jobId: string;
  name: string;
  description: string;
  variables: string;
  categoryId: number;
  outputTypeId: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: string;
  iconUrl: string | null;
  requests: number;
  chainId: number;
  category: Category;
  outputType: OutputType;
  chain: Chain;
  categoryName: string;
  outputTypeName: string;
  chainName: string;
  exampleCode: string;
}