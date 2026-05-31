import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { X, User, Mail, CreditCard, LogOut } from 'lucide-react';

import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';
import CustomButton from '../shared/CustomButton';

const SettingsPanel = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);
  const closeSettings = useSettingsStore((state) => state.closeSettings);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    closeSettings();
  };

  useGSAP(
    () => {
      gsap.to('.settings-wrapper', {
        x: areSettingsOpen ? 0 : '-100%',
        duration: 0.3,
        ease: 'power3.inOut',
      });
      gsap.to('.setting-container', {
        opacity: areSettingsOpen ? 1 : 0,
        duration: 0.3,
        ease: 'power3.inOut',
      });
    },
    { scope: panelRef, dependencies: [areSettingsOpen] },
  );

  return (
    <div className="relative" ref={panelRef}>
      <section
        className={`setting-container absolute inset-0 h-[calc(100vh-98px)] z-40 bg-lightness/50 dark:bg-darkness/70 ${
          areSettingsOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className="w-full h-full sm:w-90 flex flex-col gap-y-5 settings-wrapper p-6 absolute bg-lightness dark:bg-darkness border border-t-0 border-dark/10 dark:border-light/10"
          style={{
            transform: 'translateX(-100%)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-dark dark:text-light">
              Configuración
            </h2>
            <button
              onClick={closeSettings}
              className="p-2 rounded-full hover:bg-dark/5 dark:hover:bg-light/5 transition-colors"
            >
              <X className="w-5 h-5 text-dark/60 dark:text-light/60" />
            </button>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-dark/50">
            <User className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-dark/60 dark:text-light/60">Nombre</p>
              <p className="text-sm font-medium text-dark dark:text-light">
                {user?.fullName || 'Usuario'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-dark/50">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-dark/60 dark:text-light/60">Email</p>
              <p className="text-sm font-medium text-dark dark:text-light">
                {user?.email || 'usuario@email.com'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-dark/50">
            <CreditCard className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-dark/60 dark:text-light/60">
                Suscripción
              </p>
              <p className="text-sm font-medium text-dark dark:text-light">
                Free
              </p>
            </div>
          </div>
          <div className="mt-auto">
            <CustomButton
              bgColor="bg-primary"
              textColor="text-light"
              Icon={LogOut}
              displayText="Cerrar sesión"
              onClick={handleLogout}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPanel;
