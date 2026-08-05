import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { X, User, Mail, CreditCard, LogOut } from 'lucide-react';

import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';
import { useNavHeight } from '@/store/navHeightStore';
import { logoutRequest } from '@/services/auth.service';
import { titleFormat } from '@/utils/titleFormat';
import CustomButton from '../shared/CustomButton';

const SettingsPanel = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);
  const closeSettings = useSettingsStore((state) => state.closeSettings);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navHeight = useNavHeight((state) => state.navHeight);

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } finally {
      logout();
      navigate('/', { replace: true });
      closeSettings();
    }
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
        className={`setting-container absolute inset-0 h-dvh z-40 bg-lightness/50 dark:bg-darkness/70 ${
          areSettingsOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`w-full h-[calc(100vh-${navHeight}px)] overflow-hidden sm:w-90 flex flex-col gap-y-5 settings-wrapper px-6 py-10 absolute bg-lightness dark:bg-darkness border border-t-0 border-dark/10 dark:border-light/10`}
          style={{
            transform: 'translateX(-100%)',
            top: navHeight,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-dark dark:text-light">
              Configuración
            </h2>
            <CustomButton
              bgColor="bg-transparent"
              textColor="text-darkness dark:text-lightness"
              Icon={X}
              onClick={closeSettings}
              widthAuto
              noPadding
              size='md'
            />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-dark/50">
            <User className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-dark/60 dark:text-light/60">Nombre</p>
              <p className="text-sm font-medium text-dark dark:text-light">
                {titleFormat(user?.fullName || 'usuario')}
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
