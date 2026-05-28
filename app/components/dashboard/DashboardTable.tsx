import { FC } from 'react';

import { daysPassed, percentageDays } from '@/utils/percentageDays';
import { statusStyles } from '@/utils/statusStyles';
import { formatDate } from '@/utils/formatDate';
import { titleFormat } from '@/utils/titleFormat';
import { IStorativa } from '@/interfaces/storativa.interface';
import EmptyState from '@/assets/icons/EmptyState';

interface DashboardTableProps {
  storativas: IStorativa[];
}

const DashboardTable: FC<DashboardTableProps> = ({ storativas }) => {
  return (
    <div className="rounded-xl">
      <div className="bg-primary/40 p-5 border-b border-dark/10 dark:border-light/10">
        <h2 className="text-lg font-semibold text-dark dark:text-light">
          Storativas
        </h2>
      </div>

      <div className="overflow-x-auto">
        {storativas.length === 0 ? (
          <div className="flex flex-col items-center w-full justify-center pt-15 pb-10 text-dark/70 dark:text-light/70">
            <EmptyState className="w-full max-w-106 h-auto" />
            <p className="text-xl font-semibold text-darkness/50 dark:text-lightness/50">
              Crea una Storativa
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-primary/10">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-primary min-w-60">
                  Título
                </th>
                <th className="text-left px-5 py-3 font-medium text-primary min-w-20">
                  Estado
                </th>
                <th className="text-left px-5 py-3 font-medium text-primary min-w-45">
                  Días de avance
                </th>
                <th className="text-left px-5 py-3 font-medium text-primary min-w-50">
                  Fecha de creación
                </th>
                <th className="text-left px-5 py-3 font-medium text-primary min-w-50">
                  Última actualización
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark/5 dark:divide-light/5">
              {storativas.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-lightness dark:hover:bg-darkness transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-dark dark:text-light">
                      {titleFormat(item.title)}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${statusStyles(item.status).style}`}
                    >
                      {statusStyles(item.status).status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-light dark:bg-darkness rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.status === 1 ? 'bg-primary' : item.status === 2 ? 'bg-accent' : 'bg-secondary'}`}
                          style={{
                            width: percentageDays(
                              item.createdAt,
                              item.timeToComplete,
                            ),
                          }}
                        />
                      </div>
                      <span className="text-sm text-dark/70 dark:text-light/70">
                        {`${daysPassed(item.createdAt)} / ${item.timeToComplete}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-dark/70 dark:text-light/70">
                      {formatDate(item.createdAt)}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-dark/50 dark:text-light/50">
                      {formatDate(item.updatedAt)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardTable;
