export type OrderType = 'ROD' | 'IOC' | 'FOK';
export type AssetCategory = 'Stock' | 'ETF' | 'Cash';

export interface Asset {
  id: string;
  key: string; // Ant Design Table 需要獨立的 key
  name: string;
  code: string;
  category: AssetCategory;
  amount: number;       // 持有股數
  costPrice: number;    // 買進均價
  currentPrice: number; // 目前市價
  orderType: OrderType;
}