import { Dispatch, FC, SetStateAction } from 'react';

import { InputEnumType } from '@/interfaces/input.interface';
import CustomInput from '@/components/shared/CustomInput';

interface HeaderTableProps {
  search: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
}

const HeaderTable: FC<HeaderTableProps> = ({ search, onSearchChange }) => {
  return (
    <div className="grid items-center grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      <h2 className="text-lg sm:col-span-2 text-center rounded-r-md bg-primary py-2 font-bold text-light">
        Storativas
      </h2>
      <div className="col-span-2 sm:col-span-1 mr-3 min-[640px]:mr-4 min-[768px]:mr-6 min-[1153px]:mr-0">
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
  );
};

export default HeaderTable;
