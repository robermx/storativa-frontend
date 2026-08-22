import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';

import { useOverlayPanelStore } from '@/store/overlayPanelStore';

import CustomButton from '@/components/shared/CustomButton';
import EmptyState from '@/assets/icons/EmptyState';

const DashboardEmpty = () => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const isSettingsPanelOpen = useOverlayPanelStore(
    (state) => state.activePanel === 'settings',
  );

  return (
    <div
      className={`flex flex-col min-h-[calc(100vh-var(--nav-height)*1px)] items-center justify-center text-dark/70 dark:text-light/70`}
    >
      <EmptyState className="sm:h-80 mb-10 sm:mb-15 sm:mt-5" />
      <p className="text-xl">
        <Trans
          ns="dashboard"
          i18nKey="empty.message"
          components={{ highlight: <span className="text-primary font-semibold" /> }}
        />
      </p>
      <p className="text-3xl font-semibold text-primary mb-4">
        {t('empty.headline')}
      </p>
      <div className="w-50 mb-8">
        <CustomButton
          variant="primary"
          icon={<Plus />}
          onClick={() => navigate('/create')}
          disabled={isSettingsPanelOpen}
          className="cursor-pointer"
        >
          {t('empty.action')}
        </CustomButton>
      </div>
    </div>
  );
};

export default DashboardEmpty;
