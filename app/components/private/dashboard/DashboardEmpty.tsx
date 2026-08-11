import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';

import { useSettingsStore } from '@/store/settingsStore';

import CustomButton from '@/components/shared/CustomButton';
import EmptyState from '@/assets/icons/EmptyState';

const DashboardEmpty = () => {
  const navigate = useNavigate();
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);

  return (
    <div
      className={`flex flex-col min-h-[calc(100vh-var(--nav-height))] items-center justify-center text-dark/70 dark:text-light/70`}
    >
      <EmptyState className="sm:h-80 mb-10 sm:mb-15 sm:mt-5" />
      <p className="text-xl">
        No tienes <span className="text-primary font-semibold">Storativas</span>{' '}
        guardadas.
      </p>
      <p className="text-3xl font-semibold text-primary mb-4">
        ¡Crea una desde cero!
      </p>
      <div className="w-50 mb-8">
        <CustomButton
          variant="primary"
          icon={<Plus />}
          onClick={() => navigate('/create')}
          disabled={areSettingsOpen}
          className="cursor-pointer"
        >
          Crear Storativa
        </CustomButton>
      </div>
    </div>
  );
};

export default DashboardEmpty;
