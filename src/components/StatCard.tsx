import React from 'react';
import { Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface StatCardProps {
  title: string;
  value: number;
  isCurrency?: boolean;
  isPercentage?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, isCurrency, isPercentage }) => {
  const isPositive = value >= 0;
  // 台灣股市習慣：紅漲綠跌
  const color = isPositive ? '#cf1322' : '#3f8600'; 
  const prefix = isPercentage ? (isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />) : (isCurrency ? '$' : '');

  return (
    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <Statistic
        title={title}
        value={Math.abs(value)}
        precision={2}
        valueStyle={{ color: isPercentage ? color : '#000' }}
        prefix={prefix}
        suffix={isPercentage ? '%' : ''}
      />
    </Card>
  );
};