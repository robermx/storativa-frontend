import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { X, User, Mail, CreditCard, LogOut } from 'lucide-react';

import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';

const SettingsPanel = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = useSettingsStore((state) => state.isOpen);
  const closeSettings = useSettingsStore((state) => state.closeSettings);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useGSAP(
    () => {
      gsap.to(panelRef.current, {
        x: isOpen ? 0 : '-100%',
        duration: 0.4,
        ease: 'power3.inOut',
      });
    },
    { scope: panelRef, dependencies: [isOpen] },
  );

  return (
    <div
      ref={panelRef}
      className="absolute top-full left-0 w-full sm:w-80 bg-lightness dark:bg-darkness border border-t-0 border-dark/10 dark:border-light/10 rounded-b-2xl shadow-lg z-50 overflow-hidden"
      style={{ transform: 'translateX(-100%)' }}
    >
      <div className="p-6">
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
        <div className="space-y-4">
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
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
