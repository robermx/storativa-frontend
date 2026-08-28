import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { StorativaStats } from '@/interfaces/storativa.interface';

interface DashboardStatsProps {
  stats: StorativaStats;
}

const DashboardStats: FC<DashboardStatsProps> = ({ stats }) => {
  const { t } = useTranslation('dashboard');
  const statsInfo = [
    {
      id: 1,
      labelKey: 'total',
      count: stats.total,
    },
    {
      id: 2,
      labelKey: 'active',
      count: stats.active,
    },
    {
      id: 3,
      labelKey: 'inactive',
      count: stats.inactive,
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {statsInfo.map(({ id, labelKey, count }) => (
        <div
          key={id}
          className="bg-primary/20 rounded-b-xl p-3 md:p-6 shadow-sm"
        >
          <p className="text-dark/60 dark:text-light/60 text-sm mb-1">
            {t(`stats.${labelKey}`)}
          </p>
          <p className="text-3xl font-bold text-primary/80 dark:text-light/70">
            {count}
          </p>
        </div>
      ))}
    </section>
  );
};

export default DashboardStats;
