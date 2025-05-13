export type ProductType = 'nft' | 'physical' | 'digital';

export type MarketplaceLink = {
  platform: 'amazon' | 'apple' | 'google' | 'other';
  url: string;
  price?: string;
  currency?: string;
};

export type CheckoutMetadata = {
  productType: ProductType;
  // NFT specific fields
  tokenId?: string;
  contractAddress?: string;
  network?: 'ethereum' | 'base';
  contractType?: 'erc721' | 'erc1155';
  // Physical item specific fields
  requiresShipping?: boolean;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  // Digital item specific fields
  marketplaceLinks?: MarketplaceLink[];
  downloadUrl?: string;
  fileType?: string;
  fileSize?: number;
};

export type CheckoutPricing = {
  amount: string;
  currency: 'USD' | 'ETH' | 'USDC';
};

export type RecurringPricing = CheckoutPricing & {
  recurringPeriod: 'day' | 'week' | 'month' | 'year';
  recurringCount?: number;
};

const COMMERCE_API_URL = 'https://api.commerce.coinbase.com';

export const createDynamicCheckout = async (
  name: string,
  description: string,
  pricing: CheckoutPricing,
  metadata: CheckoutMetadata,
  customerInfo: {
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
  }
) => {
  try {
    const response = await fetch(`${COMMERCE_API_URL}/checkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY!,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify({
        name,
        description,
        pricing_type: 'fixed_price',
        local_price: {
          amount: pricing.amount,
          currency: pricing.currency
        },
        requested_info: [
          'name',
          'email',
          metadata.requiresShipping ? 'address' : null,
          metadata.requiresShipping ? 'phone_number' : null
        ].filter(Boolean),
        metadata: {
          ...metadata,
          customer: customerInfo
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Commerce API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
};

export const getCheckoutStatus = async (checkoutId: string) => {
  try {
    const response = await fetch(`${COMMERCE_API_URL}/checkouts/${checkoutId}`, {
      headers: {
        'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY!,
        'X-CC-Version': '2018-03-22'
      }
    });

    if (!response.ok) {
      throw new Error(`Commerce API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching checkout status:', error);
    throw error;
  }
};

export const createCharge = async (
  name: string,
  description: string,
  pricing: CheckoutPricing,
  metadata: CheckoutMetadata
) => {
  try {
    const response = await fetch(`${COMMERCE_API_URL}/charges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY!,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify({
        name,
        description,
        pricing_type: 'fixed_price',
        local_price: {
          amount: pricing.amount,
          currency: pricing.currency
        },
        metadata
      })
    });

    if (!response.ok) {
      throw new Error(`Commerce API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating charge:', error);
    throw error;
  }
};

export const createRecurringCharge = async (
  name: string,
  description: string,
  pricing: RecurringPricing,
  metadata: CheckoutMetadata
) => {
  try {
    const response = await fetch(`${COMMERCE_API_URL}/charges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY!,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify({
        name,
        description,
        pricing_type: 'recurring',
        billing_cycle: {
          period: pricing.recurringPeriod,
          frequency: 1,
          count: pricing.recurringCount
        },
        local_price: {
          amount: pricing.amount,
          currency: pricing.currency
        },
        metadata
      })
    });

    if (!response.ok) {
      throw new Error(`Commerce API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating recurring charge:', error);
    throw error;
  }
}; 