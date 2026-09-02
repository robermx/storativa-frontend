import { Dispatch, FC, SetStateAction } from 'react';

import {
  DashboardStorativa,
  PaginationMeta,
} from '@/interfaces/storativa.interface';

import HeaderTable from './table/HeaderTable';
import ContentTable from './table/ContentTable';
import PaginationTable from './table/PaginationTable';

interface DashboardTableProps {
  storativas: DashboardStorativa[];
  meta: PaginationMeta;
  search: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
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
  return (
    <div className="flex flex-col gap-y-3 sm:gap-y-4 md:gap-y-6">
      <HeaderTable search={search} onSearchChange={onSearchChange} />
      <ContentTable
        storativas={storativas}
        onDeleteRequest={onDeleteRequest}
        isDeleting={isDeleting}
      />
      <PaginationTable
        meta={meta}
        storativas={storativas}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default DashboardTable;
