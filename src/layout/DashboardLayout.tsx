import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={[
          { key: '1', icon: <PieChartOutlined />, label: '資產總覽' },
          { key: '2', icon: <DesktopOutlined />, label: '交易紀錄' },
        ]} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
