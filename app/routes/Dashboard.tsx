import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useRevalidator, useSearchParams } from 'react-router';
import { Trans, useTranslation } from 'react-i18next';

import { createClientLoader } from '@/lib/createClientLoader';
import {
  deleteUserStorativa,
  getUserStorativas,
} from '@/services/storativa.service';

import { titleFormat } from '@/utils/titleFormat';
import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import DashboardSkeleton from '@/components/skeleton/DashboardSkeleton';
import DashboardStats from '@/components/private/dashboard/DashboardStats';
import DashboardTable from '@/components/private/dashboard/DashboardTable';
import DashboardEmpty from '@/components/private/dashboard/DashboardEmpty';
import CustomDialog from '@/components/shared/CustomDialog';
import CustomButton from '@/components/shared/CustomButton';
import { DashboardStorativa } from '@/interfaces/storativa.interface';
import { getErrorMessage } from '@/utils/getErrorMessage';

const DASHBOARD_PAGE_SIZE = 5;

const getDashboardQuery = (request: Request) => {
  const searchParams = new URL(request.url).searchParams;
  const pageParam = searchParams.get('page');
  const parsedPage = pageParam ? Number(pageParam) : 1;
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const search = searchParams.get('q')?.trim() || undefined;

  return {
    page,
    search,
    offset: (page - 1) * DASHBOARD_PAGE_SIZE,
  };
};

export const clientLoader = createClientLoader({
  services: [
    {
      key: 'dashboard',
      fn: ({ request }) => {
        const { offset, search } = getDashboardQuery(request);

        return getUserStorativas({
          limit: DASHBOARD_PAGE_SIZE,
          offset,
          search,
        });
      },
    },
  ],
});

export const HydrateFallback = () => <DashboardSkeleton />;

const Dashboard = () => {
  const { t } = useTranslation('dashboard');
  const { dashboard } = useLoaderData<typeof clientLoader>();
  const { revalidate } = useRevalidator();
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get('q') || '';
  const [search, setSearch] = useState(querySearch);
  const [deleteStorativa, setDeleteStorativa] =
    useState<DashboardStorativa | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelDeleteRef = useRef<HTMLButtonElement | null>(null);
  const isSettingsPanelOpen = useOverlayPanelStore(
    (state) => state.activePanel === 'settings',
  );

  useEffect(() => {
    setSearch(querySearch);
  }, [querySearch]);

  useEffect(() => {
    if (search === querySearch) return;

    const timeoutId = window.setTimeout(() => {
      const nextSearchParams = new URLSearchParams(searchParams);
      const normalizedSearch = search.trim();

      if (normalizedSearch) {
        nextSearchParams.set('q', normalizedSearch);
      } else {
        nextSearchParams.delete('q');
      }
      nextSearchParams.delete('page');
      setSearchParams(nextSearchParams, { replace: true });
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [querySearch, search, searchParams, setSearchParams]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > dashboard.meta.pageCount) return;

    const nextSearchParams = new URLSearchParams(searchParams);
    if (page === 1) {
      nextSearchParams.delete('page');
    } else {
      nextSearchParams.set('page', String(page));
    }
    setSearchParams(nextSearchParams);
  };

  const handleDeleteRequest = (storativa: DashboardStorativa) => {
    setDeleteError(null);
    setDeleteStorativa(storativa);
  };

  const handleDeleteDialogClose = () => {
    if (isDeleting) return;

    setDeleteError(null);
    setDeleteStorativa(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteStorativa) return;

    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteUserStorativa(deleteStorativa._id);
      const shouldGoToPreviousPage =
        dashboard.data.length === 1 && dashboard.meta.page > 1;

      setDeleteStorativa(null);
      if (shouldGoToPreviousPage) {
        handlePageChange(dashboard.meta.page - 1);
      } else {
        revalidate();
      }
    } catch (error: unknown) {
      setDeleteError(getErrorMessage(error, t('deleteDialog.failed')));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      aria-hidden={isSettingsPanelOpen}
      inert={isSettingsPanelOpen}
      className="flex flex-col gap-y-7 max-w-6xl mx-auto"
    >
      {dashboard.stats.total > 0 ? (
        <div className="flex flex-col gap-y-3 sm:gap-y-4 md:gap-y-6">
          <DashboardStats stats={dashboard.stats} />
          <DashboardTable
            storativas={dashboard.data}
            meta={dashboard.meta}
            search={search}
            onSearchChange={setSearch}
            onPageChange={handlePageChange}
            onDeleteRequest={handleDeleteRequest}
            isDeleting={isDeleting}
          />
        </div>
      ) : (
        <DashboardEmpty />
      )}

      <CustomDialog
        openDialog={Boolean(deleteStorativa)}
        onCloseDialog={handleDeleteDialogClose}
        initialFocus={cancelDeleteRef}
        title={t('deleteDialog.title')}
        subtitle={
          <Trans
            ns="dashboard"
            i18nKey="deleteDialog.subtitle"
            values={{
              title: titleFormat(
                deleteStorativa?.title ?? t('deleteDialog.titleNotFound'),
              ),
            }}
            components={{
              strong: (
                <strong className="font-bold text-dark dark:text-light" />
              ),
            }}
          />
        }
        closeLabel={t('deleteDialog.closeLabel')}
        isCloseDisabled={isDeleting}
      >
        <div className="space-y-5 pt-4">
          <p className="text-sm text-dark/70 dark:text-light/70">
            {t('deleteDialog.warning')}
          </p>
          {deleteError && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-300">
              {deleteError}
            </p>
          )}
          <div className="flex gap-6">
            <CustomButton
              variant="ghost"
              ref={cancelDeleteRef}
              onClick={handleDeleteDialogClose}
              disabled={isDeleting}
              className="cursor-pointer"
            >
              {t('deleteDialog.cancel')}
            </CustomButton>
            <CustomButton
              variant="danger"
              disabled={isDeleting}
              onClick={() => void handleDeleteConfirm()}
              className="cursor-pointer"
            >
              {isDeleting
                ? t('deleteDialog.deleting')
                : t('deleteDialog.delete')}
            </CustomButton>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
};

export default Dashboard;
