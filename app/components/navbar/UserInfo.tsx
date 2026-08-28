import { FC } from 'react';
import { BookOpen } from 'lucide-react';
import { useMatch, useRouteLoaderData } from 'react-router';
import { useTranslation } from 'react-i18next';

import { getInitials } from '@/utils/getInitials';
// import { getSubtitleByPath } from '@/utils/getSubtitleByPath';
import { titleFormat } from '@/utils/titleFormat';
import { useAuthStore } from '@/store/authStore';
import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import { useOpenOverlayPanel } from '@/hooks/useOpenOverlayPanel';
import { clientLoader as eLoader } from '@/routes/Edition';

const UserInfo: FC = () => {
  const { t } = useTranslation('editor');
  const editionData = useRouteLoaderData<typeof eLoader>('routes/Edition');
  // const { pathname } = useLocation();
  const editionMatch = useMatch('/edition/:storativaId');

  const user = useAuthStore((state) => state.user);
  const isChapterPanelOpen = useOverlayPanelStore(
    (state) => state.activePanel === 'edition-chapters',
  );
  const { handlePanelClick } = useOpenOverlayPanel();
  const title = editionData?.storativa.title;

  return (
    <div className="flex min-w-0 flex-1 gap-3">
      {editionMatch ? (
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => handlePanelClick('edition-chapters')}
            aria-label={
              isChapterPanelOpen
                ? t('navigation.closeChapters')
                : t('navigation.openChapters')
            }
            aria-controls="edition-chapter-panel"
            aria-expanded={isChapterPanelOpen}
            className="flex size-12.5 items-center justify-center rounded-full cursor-pointer bg-primary text-light transition-opacity hover:opacity-90"
          >
            <BookOpen size={22} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => handlePanelClick('settings')}
          className="h-12.5 w-12.5 shrink-0 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-white cursor-pointer transition-opacity hover:opacity-90"
        >
          {getInitials(user?.fullName || 'User')}
        </button>
      )}
      <div className="min-w-0 flex flex-col justify-center">
        {/* <p className="truncate text-dark/60 dark:text-light/60 text-sm">
          {getSubtitleByPath(pathname)}
        </p> */}
        <h1 className="truncate text-md font-bold text-dark dark:text-light sm:text-xl">
          {title
            ? titleFormat(title)
            : titleFormat(user?.fullName || 'usuario')}
        </h1>
      </div>
    </div>
  );
};

export default UserInfo;
