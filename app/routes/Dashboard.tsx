import { useLoaderData } from 'react-router';

import { createClientLoader } from '@/lib/createClientLoader';
import { getUserStorativas } from '@/services/storativa.service';

import { useSettingsStore } from '@/store/settingsStore';
import DashboardSkeleton from '@/components/skeleton/DashboardSkeleton';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardTable from '@/components/dashboard/DashboardTable';

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = createClientLoader({
  services: [{ key: 'storativas', fn: getUserStorativas }],
});

export const HydrateFallback = () => <DashboardSkeleton />;

const Dashboard = () => {
  const { storativas } = useLoaderData<typeof clientLoader>();
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);

  return (
    <div
      aria-hidden={areSettingsOpen}
      inert={areSettingsOpen}
      className="flex flex-col gap-y-7 max-w-6xl mx-auto"
    >
      {storativas.length !== 0 && <DashboardStats storativas={storativas} />}
      <DashboardTable storativas={storativas} />
    </div>
  );
};

export default Dashboard;
