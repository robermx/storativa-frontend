import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { X, User, Mail, CreditCard, LogOut } from 'lucide-react';

import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import { useAuthStore } from '@/store/authStore';
import { logoutRequest } from '@/services/auth.service';
import { titleFormat } from '@/utils/titleFormat';
import CustomButton from '../shared/CustomButton';

const SettingsPanel = () => {
  const { t } = useTranslation('settings');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const isSettingsPanelOpen = useOverlayPanelStore(
    (state) => state.activePanel === 'settings',
  );
  const closePanel = useOverlayPanelStore((state) => state.closePanel);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } finally {
      logout();
      navigate('/', { replace: true });
      closePanel();
    }
  };

  return (
    <Dialog
      open={isSettingsPanelOpen}
      onClose={closePanel}
      initialFocus={closeButtonRef}
      className="relative z-40"
    >
      <DialogBackdrop
        transition
        onClick={closePanel}
        className="fixed inset-0 top-[calc(var(--nav-height)*1px)] cursor-pointer bg-lightness/20 backdrop-blur-sm duration-300 ease-out data-closed:opacity-0 dark:bg-darkness/20"
      />
      <DialogPanel
        id="settings-panel"
        transition
        className="fixed inset-0 top-[calc(var(--nav-height)*1px)] pointer-events-auto flex w-full flex-col gap-y-5 overflow-x-hidden overflow-y-auto border-r border-dark/10 bg-lightness px-6 py-10 shadow-2xl duration-300 ease-out data-closed:-translate-x-full dark:border-light/10 dark:bg-darkness sm:w-90"
      >
        <div className="flex items-center justify-between mb-6">
          <DialogTitle className="text-lg font-bold text-dark dark:text-light">
            {t('panel.title')}
          </DialogTitle>
          <CustomButton
            ref={closeButtonRef}
            onClick={closePanel}
            aria-label={t('panel.closeLabel')}
            icon={<X />}
            width="auto"
            variant="text"
            className="text-dark dark:text-light cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-dark/50">
          <User className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-dark/60 dark:text-light/60">
              {t('panel.name')}
            </p>
            <p className="text-sm font-medium text-dark dark:text-light">
              {titleFormat(user?.fullName || t('panel.defaultName'))}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-dark/50">
          <Mail className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-dark/60 dark:text-light/60">
              {t('panel.email')}
            </p>
            <p className="text-sm font-medium text-dark dark:text-light">
              {user?.email || t('panel.defaultEmail')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-dark/50">
          <CreditCard className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-dark/60 dark:text-light/60">
              {t('panel.subscription')}
            </p>
            <p className="text-sm font-medium text-dark dark:text-light">
              {t('panel.plan.free')}
            </p>
          </div>
        </div>
        <div className="mt-auto">
          <CustomButton
            variant="primary"
            icon={<LogOut />}
            onClick={handleLogout}
          >
            {t('panel.logout')}
          </CustomButton>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default SettingsPanel;
