import { useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';

import { createClientLoader } from '@/lib/createClientLoader';
import { getUserStorativas } from '@/services/storativa.service';

import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import DashboardSkeleton from '@/components/skeleton/DashboardSkeleton';
import DashboardStats from '@/components/private/dashboard/DashboardStats';
import DashboardTable from '@/components/private/dashboard/DashboardTable';
import DashboardEmpty from '@/components/private/dashboard/DashboardEmpty';

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
  const { dashboard } = useLoaderData<typeof clientLoader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get('q') || '';
  const [search, setSearch] = useState(querySearch);
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

  return (
    <div
      aria-hidden={isSettingsPanelOpen}
      inert={isSettingsPanelOpen}
      className="flex flex-col gap-y-7 max-w-6xl mx-auto"
    >
      {dashboard.stats.total > 0 ? (
        <div className="p-6 flex flex-col gap-6">
          <DashboardStats stats={dashboard.stats} />
          <DashboardTable
            storativas={dashboard.data}
            meta={dashboard.meta}
            search={search}
            onSearchChange={setSearch}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <DashboardEmpty />
      )}
    </div>
  );
};

export default Dashboard;
