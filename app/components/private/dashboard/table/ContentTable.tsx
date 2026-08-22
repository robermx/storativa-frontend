import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardStorativa } from '@/interfaces/storativa.interface';
import { daysPassed, percentageDays } from '@/utils/percentageDays';
import { statusStyles } from '@/utils/statusStyles';
import { titleFormat } from '@/utils/titleFormat';
import CustomLink from '@/components/shared/CustomLink';
import { formatDate } from '@/utils/formatDate';
import CustomButton from '@/components/shared/CustomButton';
import { Trash2 } from 'lucide-react';

interface ContentTableProps {
  storativas: DashboardStorativa[];
  onDeleteRequest: (storativa: DashboardStorativa) => void;
  isDeleting: boolean;
}

const ContentTable: FC<ContentTableProps> = ({
  storativas,
  onDeleteRequest,
  isDeleting,
}) => {
  const { t, i18n } = useTranslation('dashboard');

  return (
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
            <th className="text-left pl-3 sm:pl-6 py-3 font-medium text-primary">
              {t('table.columns.title')}
            </th>
            <th className="text-left px-4 py-3 font-medium text-primary">
              {t('table.columns.status')}
            </th>
            <th className="text-left px-4 py-3 font-medium text-primary">
              {t('table.columns.progress')}
            </th>
            <th className="text-left px-4 py-3 font-medium text-primary">
              {t('table.columns.createdAt')}
            </th>
            <th className="text-left px-4 py-3 font-medium text-primary">
              {t('table.columns.updatedAt')}
            </th>
            <th className="text-left pr-6 py-3 font-medium text-primary">
              {t('table.columns.delete')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dark/5 dark:divide-light/5">
          {storativas.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="absolute flex justify-center items-end h-40 w-full max-w-6xl text-dark/60 dark:text-light/60"
              >
                {t('table.noResults')}
              </td>
            </tr>
          ) : (
            storativas.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-lightness dark:hover:bg-darkness transition-colors"
              >
                <td className="pl-3 sm:pl-6 py-3">
                  <CustomLink
                    variant="text"
                    width="full"
                    truncate
                    to={`/edition/${item._id}`}
                    className="text-primary/80 hover:text-primary"
                    title={titleFormat(item.title)}
                  >
                    {titleFormat(item.title)}
                  </CustomLink>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${statusStyles(item.status).style}`}
                  >
                    {t(`table.status.${statusStyles(item.status).statusKey}`)}
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
                    {formatDate(item.createdAt, i18n.language)}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-dark/70 dark:text-light/70">
                    {formatDate(item.updatedAt, i18n.language)}
                  </p>
                </td>
                <td className="pr-6 py-3">
                  <CustomButton
                    variant="danger"
                    icon={<Trash2 />}
                    aria-label={t('table.deleteAriaLabel', {
                      title: titleFormat(item.title),
                    })}
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
  );
};

export default ContentTable;
