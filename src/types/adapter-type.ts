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

// interface Chain {
//   id: number;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface AdaptorItem {
//   id: number;
//   jobId: string;
//   name: string;
//   chainType: string;
//   description: string;
//   variables: string;
//   categoryId: number;
//   outputTypeId: number;
//   createdAt: string;
//   updatedAt: string;
//   createdBy: string;
//   status: string;
//   iconUrl: string | null;
//   requests: number;
//   chainId: number;
//   category: Category;
//   outputType: OutputType;
//   chain: Chain;
//   categoryName: string;
//   outputTypeName: string;
//   chainName: string;
//   exampleCode: string;
//   providerName: string;
//   aiPrompt: string;
//   dataProviderId: number;
// }

export interface AdaptorItem {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  coreLLM: string;
  staticContext: string;
  nodesDefinition: {
    P1: string;
  };
  graphFlow: unknown[];
  inputEntity: Record<string, unknown>;
  outputEntity: Record<string, unknown>;
  requestCount: number;
  categoryName?: string;
  categoryId?: string | number;
  category: string;
  outputType: string;
  outputTypeId: number;
  entities: string[];
  createdAt?: string; //local
  updatedAt?: string; //local
  chainName?: string; //local
}

export interface CoinData {
  market_cap: number;
  name: string;
  price: number;
  price_change_24h: number;
  symbol: string;
  volume: number;
}

export interface InferenceResponse {
  final_decision: {
    decision: boolean;
    token_name: string;
  };
  market_research: string;
  memecoins_data: {
    [key: string]: CoinData | null;
  };
}

export interface AdaptorCreateModel {
  id: string;
  name: string;
  description: string;
  outputTypeId: number;
  // chainType: string;
  // variables: string;
  // categoryId: number;
  // dataProviderId: number;
  // chainId: number;
  // aiPrompt: string;
}
