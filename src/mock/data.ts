import { Asset } from '../types/asset';

export const initialAssets: Asset[] = [
  {
    id: '1',
    key: '1',
    name: '台積電',
    code: '2330',
    category: 'Stock',
    amount: 1000,
    costPrice: 600,
    currentPrice: 850,
    orderType: 'ROD',
  },
  {
    id: '2',
    key: '2',
    name: '元大台灣50',
    code: '0050',
    category: 'ETF',
    amount: 2000,
    costPrice: 140,
    currentPrice: 155,
    orderType: 'IOC',
  },
  {
    id: '3',
    key: '3',
    name: '聯發科',
    code: '2454',
    category: 'Stock',
    amount: 500,
    costPrice: 1050,
    currentPrice: 980,
    orderType: 'ROD',
  }
];