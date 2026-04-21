import React from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import { Overview } from './pages/Overview';

const App: React.FC = () => {
  return (
    <DashboardLayout>
      <Overview />
    </DashboardLayout>
  );
};

export default App;