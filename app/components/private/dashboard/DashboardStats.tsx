import { FC } from 'react';

import { StorativaStats } from '@/interfaces/storativa.interface';

interface DashboardStatsProps {
  stats: StorativaStats;
}

const DashboardStats: FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <section className="grid grid-cols-3 gap-2 md:gap-5">
      <div className="bg-lightness dark:bg-darkness rounded-xl p-5 shadow-sm border border-dark/10 dark:border-light/10">
        <p className="text-dark/60 dark:text-light/60 text-sm mb-1">Total</p>
        <p className="text-3xl font-bold text-dark dark:text-light">
          {stats.total}
        </p>
      </div>
      <div className="bg-lightness dark:bg-darkness  rounded-xl p-5 shadow-sm border border-dark/10 dark:border-light/10">
        <p className="text-dark/60 dark:text-light/60 text-sm mb-1">Activas</p>
        <p className="text-3xl font-bold text-secondary">{stats.active}</p>
      </div>
      <div className="bg-lightness dark:bg-darkness  rounded-xl p-5 shadow-sm border border-dark/10 dark:border-light/10">
        <p className="text-dark/60 dark:text-light/60 text-sm mb-1">
          Inactivas
        </p>
        <p className="text-3xl font-bold text-accent">{stats.inactive}</p>
      </div>
    </section>
  );
};

export default DashboardStats;
