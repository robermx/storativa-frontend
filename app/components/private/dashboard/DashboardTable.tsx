import { FC } from 'react';
import { Trash2 } from 'lucide-react';

import { IResStorativa } from '@/interfaces/storativa.interface';
import { daysPassed, percentageDays } from '@/utils/percentageDays';
import { statusStyles } from '@/utils/statusStyles';
import { formatDate } from '@/utils/formatDate';
import { titleFormat } from '@/utils/titleFormat';

import CustomButton from '@/components/shared/CustomButton';
import CustomLink from '@/components/shared/CustomLink';
import CustomInput from '@/components/shared/CustomInput';
import { InputEnumType } from '@/interfaces/input.interface';

interface DashboardTableProps {
  storativas: IResStorativa[];
}

const DashboardTable: FC<DashboardTableProps> = ({ storativas }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="flex-1 bg-primary/50 rounded-t-lg text-lg py-1.5 text-center font-semibold text-dark dark:text-light ">
          Storativas
        </h2>
        <div className="w-50 sm:w-80">
          <CustomInput
            inputType={InputEnumType.search}
            inputName="search"
            placeholder="Buscar por título"
          />
        </div>
      </div>
      <div className="overflow-x-auto min-h-90">
        <table className="w-full min-w-255 table-fixed">
          <colgroup>
            <col />
            <col className="w-25" />
            <col className="w-45" />
            <col className="w-55" />
            <col className="w-55" />
            <col className="w-25" />
          </colgroup>
          <thead className="bg-primary/10">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-primary">
                Título
              </th>
              <th className="text-left px-4 py-3 font-medium text-primary">
                Estado
              </th>
              <th className="text-left px-4 py-3 font-medium text-primary">
                Días de avance
              </th>
              <th className="text-left px-4 py-3 font-medium text-primary">
                Fecha de creación
              </th>
              <th className="text-left px-4 py-3 font-medium text-primary">
                Última actualización
              </th>
              <th className="text-left px-4 py-3 font-medium text-primary">
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
                <td className="px-4 py-3">
                  <CustomLink
                    variant="text"
                    width="full"
                    truncate
                    to={`/edition/${item._id}`}
                    className="text-primary/80 hover:text-primary"
                  >
                    {titleFormat(item.title)}
                  </CustomLink>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${statusStyles(item.status).style}`}
                  >
                    {statusStyles(item.status).status}
                  </span>
                </td>
                <td className="px-4 py-3">
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
                <td className="px-4 py-3">
                  <p className="text-sm text-dark/70 dark:text-light/70">
                    {formatDate(item.createdAt)}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-dark/70 dark:text-light/70">
                    {formatDate(item.updatedAt)}
                  </p>
                </td>
                <td className="px-4 py-3">
                  {/** TODO: delete storativa by ID */}
                  <CustomButton
                    variant="danger"
                    icon={<Trash2 />}
                    aria-label="Eliminar Storativa"
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-primary/20 py-2 rounded-b-lg">
        <p className="text-center">TODO: Paginado</p>
      </div>
    </div>
  );
};

export default DashboardTable;
