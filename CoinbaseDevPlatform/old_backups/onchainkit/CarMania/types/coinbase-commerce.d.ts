declare module 'coinbase-commerce-node' {
  export interface ChargeData {
    name: string;
    description: string;
    pricing_type: 'fixed_price';
    local_price: {
      amount: string;
      currency: string;
    };
    metadata?: {
      customer_id?: string;
      [key: string]: any;
    };
    redirect_url?: string;
    cancel_url?: string;
  }

  export interface ChargeResponse {
    id: string;
    resource: 'charge';
    code: string;
    name: string;
    description: string;
    hosted_url: string;
    created_at: string;
    expires_at: string;
    timeline: Array<{
      time: string;
      status: string;
    }>;
    metadata: {
      customer_id?: string;
      [key: string]: any;
    };
    pricing: {
      local: {
        amount: string;
        currency: string;
      };
      [key: string]: any;
    };
    payments: Array<any>;
    [key: string]: any;
  }

  export const Client: {
    init(apiKey: string): void;
  };

  export const resources: {
    Charge: {
      create(data: ChargeData): Promise<ChargeResponse>;
      retrieve(id: string): Promise<ChargeResponse>;
      list(): Promise<ChargeResponse[]>;
    };
  };
} 