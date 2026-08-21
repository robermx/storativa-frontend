import CustomButton from '@/components/shared/CustomButton';
import {
  DashboardStorativa,
  PaginationMeta,
} from '@/interfaces/storativa.interface';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';

interface PaginationTableProps {
  meta: PaginationMeta;
  storativas: DashboardStorativa[];
  onPageChange: (page: number) => void;
}

const PaginationTable: FC<PaginationTableProps> = ({
  meta,
  storativas,
  onPageChange,
}) => {
  const firstItem = meta.total === 0 ? 0 : meta.offset + 1;
  const lastItem = meta.offset + storativas.length;

  return (
    <div className="flex items-center justify-between gap-3 rounded-b-lg py-2 px-6">
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
          className="cursor-pointer pr-4 [&>span]:gap-0 sm:[&>span]:gap-2"
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
          className="cursor-pointer pl-4 [&>span]:gap-0 sm:[&>span]:gap-2"
          onClick={() => onPageChange(meta.page + 1)}
        >
          <span className="hidden sm:inline">Siguiente</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default PaginationTable;
