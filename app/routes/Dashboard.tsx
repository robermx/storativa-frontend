import { useLoaderData } from 'react-router';

import { createClientLoader } from '@/lib/createClientLoader';
import { getUserStorativas } from '@/services/storativa.service';

import DashboardSkeleton from '@/components/skeleton/DashboardSkeleton';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardTable from '@/components/dashboard/DashboardTable';

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = createClientLoader({
  services: [{ key: 'storativas', fn: getUserStorativas }],
});

export const HydrateFallback = () => <DashboardSkeleton />;

const Dashboard = () => {
  const { storativas } = useLoaderData<typeof clientLoader>();

  return (
    <div className="min-h-screen bg-lightness dark:bg-darkness p-6">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader />
        <DashboardStats storativas={storativas} />
        <DashboardTable storativas={storativas} />
      </div>
    </div>
  );
};

export default Dashboard;
