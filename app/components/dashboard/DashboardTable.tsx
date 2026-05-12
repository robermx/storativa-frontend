import { FC } from 'react';

import { daysPassed, percentageDays } from '@/utils/percentageDays';
import { statusStyles } from '@/utils/statusStyles';
import { formatDate } from '@/utils/formatDate';
import { titleFormat } from '@/utils/titleFormat';
import { IStorativa } from '@/interfaces/storativa.interface';

interface DashboardTableProps {
  storativas: IStorativa[];
}

const DashboardTable: FC<DashboardTableProps> = ({ storativas }) => {
  return (
    <div className="bg-white dark:bg-dark rounded-xl shadow-sm border border-dark/10 dark:border-light/10 overflow-hidden">
      <div className="p-5 border-b border-dark/10 dark:border-light/10">
        <h2 className="text-lg font-semibold text-dark dark:text-light">
          Storativas
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-lightness dark:bg-dark/50">
            <tr>
              <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60">
                Título
              </th>
              <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60 hidden sm:table-cell">
                Fecha de creación
              </th>
              <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60">
                Estado
              </th>
              <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60 hidden md:table-cell">
                Días de avance
              </th>
              <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60 hidden md:table-cell">
                Etiquetas
              </th>
              <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60 hidden lg:table-cell">
                Última actualización
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark/5 dark:divide-light/5">
            {storativas.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-lightness dark:hover:bg-dark/30 transition-colors"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-dark dark:text-light">
                    {titleFormat(item.title)}
                  </p>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <p className="text-sm text-dark/70 dark:text-light/70">
                    {formatDate(item.createdAt)}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${statusStyles(item.status).style}`}
                  >
                    {statusStyles(item.status).status}
                  </span>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
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
                      {daysPassed(item.createdAt) + ' / ' + item.timeToComplete}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 hidden lg:table-cell">
                  <p className="flex gap-2 flex-wrap w-full text-sm text-dark/50 dark:text-light/50">
                    {item.tags.map((i, idx) => (
                      <span
                        key={idx + 1}
                        className="bg-accent text-dark px-1.5 py-0.5 font-bold rounded"
                      >
                        {i}
                      </span>
                    ))}
                  </p>
                </td>
                <td className="px-5 py-4 hidden lg:table-cell">
                  <p className="text-sm text-dark/50 dark:text-light/50">
                    {formatDate(item.updatedAt)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
