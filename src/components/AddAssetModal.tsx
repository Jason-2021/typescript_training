import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { Asset } from '../types/asset';

interface AddAssetModalProps {
  open: boolean;
  onCancel: () => void;
  onCreate: (values: Omit<Asset, 'id' | 'key'>) => void;
}

export const AddAssetModal: React.FC<AddAssetModalProps> = ({ open, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onCreate(values);
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal open={open} title="新增資產紀錄" okText="確認新增" cancelText="取消" onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical" name="add_asset_form">
        <Form.Item name="name" label="資產名稱" rules={[{ required: true, message: '請輸入資產名稱' }]}>
          <Input placeholder="例如：台積電" />
        </Form.Item>
        <Form.Item name="code" label="資產代碼" rules={[{ required: true }]}>
          <Input placeholder="例如：2330" />
        </Form.Item>
        <Form.Item name="orderType" label="委託條件" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="ROD">ROD (當日有效)</Select.Option>
            <Select.Option value="IOC">IOC (立即成交否則取消)</Select.Option>
            <Select.Option value="FOK">FOK (全部成交否則取消)</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="amount" label="數量 (股)" rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="costPrice" label="買進均價" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="currentPrice" label="目前市價" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};