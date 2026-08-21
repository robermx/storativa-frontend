import { FC } from 'react';

import { StorativaStats } from '@/interfaces/storativa.interface';

interface DashboardStatsProps {
  stats: StorativaStats;
}

const DashboardStats: FC<DashboardStatsProps> = ({ stats }) => {
  const statsInfo = [
    {
      id: 1,
      label: 'Totales',
      count: stats.total,
    },
    {
      id: 2,
      label: 'Activas',
      count: stats.active,
    },
    {
      id: 3,
      label: 'Inactivas',
      count: stats.inactive,
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {statsInfo.map(({ id, label, count }) => (
        <div
          key={id}
          className="bg-primary/20 rounded-b-xl p-3 md:p-6 shadow-sm"
        >
          <p className="text-dark/60 dark:text-light/60 text-sm mb-1">
            {label}
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
