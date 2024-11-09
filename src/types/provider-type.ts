export interface ProviderItem {
  id: number;
  name: string;
  endpoint: string;
  type: string;
  active: boolean;
  description: string;
  inputVariables: object;
  outputVariables: {
    final_decision: {
      decision: boolean;
      token_name: string;
    };
    memecoins_data: string;
    market_research: string;
  };
  createdAt: string;
  updatedAt: string;
  iconUrl: string;
  exampleCall: string;
  documentation?: string;
}
