import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Asset } from '../types/asset';

interface AssetTableProps {
  data: Asset[];
}

export const AssetTable: React.FC<AssetTableProps> = ({ data }) => {
  const columns: ColumnsType<Asset> = [
    {
      title: '資產名稱 (代碼)',
      dataIndex: 'name',
      render: (text, record) => <strong>{text} ({record.code})</strong>,
    },
    {
      title: '委託類型',
      dataIndex: 'orderType',
      render: (type: string) => {
        const color = type === 'ROD' ? 'blue' : type === 'IOC' ? 'orange' : 'magenta';
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: '持有股數',
      dataIndex: 'amount',
      align: 'right',
    },
    {
      title: '均價 / 現價',
      render: (_, record) => (
        <span>{record.costPrice} / <strong>{record.currentPrice}</strong></span>
      ),
      align: 'right',
    },
    {
      title: '未實現損益',
      align: 'right',
      render: (_, record) => {
        const pnl = (record.currentPrice - record.costPrice) * record.amount;
        const color = pnl >= 0 ? '#cf1322' : '#3f8600';
        return <strong style={{ color }}>{pnl > 0 ? '+' : ''}{pnl.toLocaleString()}</strong>;
      },
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />;
};