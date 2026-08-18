import { FC } from 'react';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

import {
  DashboardStorativa,
  PaginationMeta,
} from '@/interfaces/storativa.interface';
import { daysPassed, percentageDays } from '@/utils/percentageDays';
import { statusStyles } from '@/utils/statusStyles';
import { formatDate } from '@/utils/formatDate';
import { titleFormat } from '@/utils/titleFormat';

import CustomButton from '@/components/shared/CustomButton';
import CustomLink from '@/components/shared/CustomLink';
import CustomInput from '@/components/shared/CustomInput';
import { InputEnumType } from '@/interfaces/input.interface';

interface DashboardTableProps {
  storativas: DashboardStorativa[];
  meta: PaginationMeta;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onDeleteRequest: (storativa: DashboardStorativa) => void;
  isDeleting: boolean;
}

const DashboardTable: FC<DashboardTableProps> = ({
  storativas,
  meta,
  search,
  onSearchChange,
  onPageChange,
  onDeleteRequest,
  isDeleting,
}) => {
  const firstItem = meta.total === 0 ? 0 : meta.offset + 1;
  const lastItem = meta.offset + storativas.length;

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
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Buscar Storativas por título"
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
          <thead className="bg-lightness/80 dark:bg-darkness/80">
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
            {storativas.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-dark/60 dark:text-light/60"
                >
                  No se encontraron Storativas para esta búsqueda.
                </td>
              </tr>
            ) : (
              storativas.map((item) => (
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
                    <CustomButton
                      variant="danger"
                      icon={<Trash2 />}
                      aria-label={`Eliminar ${titleFormat(item.title)}`}
                      className="cursor-pointer"
                      disabled={isDeleting}
                      onClick={() => onDeleteRequest(item)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-b-lg py-2">
        <p
          aria-live="polite"
          className="text-center text-sm text-dark/70 dark:text-light/70"
        >
          <span className="hidden sm:inline">Mostrado </span>
          {meta.total === 0
            ? '0 resultados'
            : `${firstItem}–${lastItem} de ${meta.total}`}
        </p>
        <div className="flex items-center gap-2">
          <CustomButton
            variant="ghost"
            size="sm"
            width="auto"
            icon={<ChevronLeft />}
            iconPosition="start"
            disabled={!meta.hasPreviousPage}
            className="cursor-pointer [&>span]:gap-0 sm:[&>span]:gap-2"
            onClick={() => onPageChange(meta.page - 1)}
          >
            <span className="hidden sm:inline">Anterior</span>
          </CustomButton>
          <span className="text-dark/70 text-sm dark:text-light/70">
            {meta.page} de {meta.pageCount}
          </span>
          <CustomButton
            variant="ghost"
            size="sm"
            width="auto"
            icon={<ChevronRight />}
            disabled={!meta.hasNextPage}
            className="cursor-pointer [&>span]:gap-0 sm:[&>span]:gap-2"
            onClick={() => onPageChange(meta.page + 1)}
          >
            <span className="hidden sm:inline">Siguiente</span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
