import { Dispatch, FC, SetStateAction } from 'react';

import {
  DashboardStorativa,
  PaginationMeta,
} from '@/interfaces/storativa.interface';

import TableHeader from './table/TableHeader';
import TableContent from './table/TableContent';
import TablePagination from './table/TablePagination';

interface DashboardTableProps {
  storativas: DashboardStorativa[];
  meta: PaginationMeta;
  isDeleting: boolean;
  onPageChange: (page: number) => void;
  setDeleteStorativa: Dispatch<SetStateAction<DashboardStorativa | null>>
  setDeleteError: Dispatch<SetStateAction<string | null>>
}

const DashboardTable: FC<DashboardTableProps> = ({
  storativas,
  meta,
  setDeleteStorativa,
  setDeleteError,
  onPageChange,
  isDeleting,
}) => {
  
  return (
    <div className="flex flex-col gap-y-3 sm:gap-y-4 md:gap-y-6">
      <TableHeader />
      <TableContent
        storativas={storativas}
        isDeleting={isDeleting}
        setDeleteStorativa={setDeleteStorativa}
        setDeleteError={setDeleteError}
      />
      <TablePagination
        meta={meta}
        storativas={storativas}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default DashboardTable;
