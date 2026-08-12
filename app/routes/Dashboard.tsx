import { useLoaderData } from 'react-router';

import { createClientLoader } from '@/lib/createClientLoader';
import { getUserStorativas } from '@/services/storativa.service';

import { useSettingsStore } from '@/store/settingsStore';
import DashboardSkeleton from '@/components/skeleton/DashboardSkeleton';
import DashboardStats from '@/components/private/dashboard/DashboardStats';
import DashboardTable from '@/components/private/dashboard/DashboardTable';
import DashboardEmpty from '@/components/private/dashboard/DashboardEmpty';

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
      {storativas.length > 0 ? (
        <div className="p-6 flex flex-col gap-6">
          <DashboardStats storativas={storativas} />
          <DashboardTable storativas={storativas} />
        </div>
      ) : (
        <DashboardEmpty />
      )}
    </div>
  );
};

export default Dashboard;
