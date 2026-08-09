import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Trash2 } from 'lucide-react';

import { IResStorativa } from '@/interfaces/storativa.interface';
import { useSettingsStore } from '@/store/settingsStore';
import { daysPassed, percentageDays } from '@/utils/percentageDays';
import { statusStyles } from '@/utils/statusStyles';
import { formatDate } from '@/utils/formatDate';
import { titleFormat } from '@/utils/titleFormat';

import CustomButton from '@/components/shared/CustomButton';

interface DashboardTableProps {
  storativas: IResStorativa[];
}

const DashboardTable: FC<DashboardTableProps> = ({ storativas }) => {
  const navigate = useNavigate();
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);

  return (
    <div className="flex flex-col min-h-[calc(100vh-260px)]">
      <div className="bg-primary/50 text-center py-1 border-b border-dark/10 dark:border-light/10 rounded-t-lg">
        <h2 className="text-lg font-semibold text-dark dark:text-light">
          Storativas
        </h2>
      </div>
      <div className="overflow-x-auto">
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
              <th className="text-left px-5 py-3 font-medium text-primary min-w-55">
                Fecha de creación
              </th>
              <th className="text-left px-5 py-3 font-medium text-primary min-w-55">
                Última actualización
              </th>
              <th className="text-left px-5 py-3 font-medium text-primary min-w-10">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark/5 dark:divide-light/5">
            {storativas.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-lightness dark:hover:bg-darkness transition-colors"
              >
                <td className="px-5 py-4 w-full max-w-90">
                  <CustomButton
                    variant="text"
                    disabled={areSettingsOpen}
                    onClick={() => navigate(`/edition/${item._id}`)}
                    truncate
                  >
                    {titleFormat(item.title)}
                  </CustomButton>
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
                  <p className="text-sm text-dark/70 dark:text-light/70">
                    {formatDate(item.updatedAt)}
                  </p>
                </td>
                <td className="px-5 py-4">
                  {/** TODO: delete storativa by ID */}
                  <CustomButton
                    variant="danger"
                    icon={<Trash2 />}
                    aria-label="Eliminar Storativa"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-primary/20 py-2 rounded-b-lg mt-auto">
        <p className="text-center">TODO: Paginado</p>
      </div>
    </div>
  );
};

export default DashboardTable;
