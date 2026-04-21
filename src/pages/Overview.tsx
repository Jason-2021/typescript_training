import React, { useState, useMemo } from 'react';
import { Row, Col, Flex, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { StatCard } from '../components/StatCard';
import { AssetTable } from '../components/AssetTable';
import { AddAssetModal } from '../components/AddAssetModal';
import { initialAssets } from '../mock/data';
import { Asset } from '../types/asset';

export const Overview: React.FC = () => {
  // 核心狀態：資產清單與 Modal 開關
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // 計算總資產與總損益 (使用 useMemo 避免不必要的重複計算)
  const { totalValue, totalPnL, pnlPercentage } = useMemo(() => {
    let totalCost = 0;
    let currentValue = 0;

    assets.forEach(asset => {
      totalCost += asset.costPrice * asset.amount;
      currentValue += asset.currentPrice * asset.amount;
    });

    const pnl = currentValue - totalCost;
    const percentage = totalCost === 0 ? 0 : (pnl / totalCost) * 100;

    return { totalValue: currentValue, totalPnL: pnl, pnlPercentage: percentage };
  }, [assets]);

  // 處理新增資產邏輯
  const handleCreateAsset = (values: Omit<Asset, 'id' | 'key'>) => {
    const newId = Date.now().toString(); // 簡單產生一個隨機 ID
    const newAsset: Asset = {
      ...values,
      id: newId,
      key: newId,
      category: 'Stock', // Demo 預設給定
    };
    
    setAssets([...assets, newAsset]); // 更新狀態，觸發重新渲染
    setIsModalOpen(false);
    messageApi.success('資產新增成功！');
  };

  return (
    <>
      {contextHolder}
      {/* 頂部數據卡片區 (Grid 排版) */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <StatCard title="總資產估值 (TWD)" value={totalValue} isCurrency />
        </Col>
        <Col xs={24} sm={8}>
          <StatCard title="未實現損益" value={totalPnL} isCurrency />
        </Col>
        <Col xs={24} sm={8}>
          <StatCard title="整體報酬率" value={pnlPercentage} isPercentage />
        </Col>
      </Row>

      {/* 操作列與表格區 */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <h2>持有部位清單</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          新增交易
        </Button>
      </Flex>
      
      <AssetTable data={assets} />

      {/* 新增彈窗 */}
      <AddAssetModal 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        onCreate={handleCreateAsset} 
      />
    </>
  );
};