import { useLoaderData } from 'react-router';

import { getUserStorativas } from '@/services/storativa.service';
import { createClientLoader } from '@/lib/createClientLoader';
import { HydrateFallback } from '@/components/shared/HydrateFallback';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardTable from '@/components/dashboard/DashboardTable';

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = createClientLoader({
  service: getUserStorativas,
});

export { HydrateFallback };

const Dashboard = () => {
  const storativas = useLoaderData<typeof clientLoader>();

  return (
    <div className="min-h-screen bg-lightness dark:bg-darkness p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader />
        <DashboardStats storativas={storativas} />
        <DashboardTable storativas={storativas} />
      </div>
    </div>
  );
};

export default Dashboard;
