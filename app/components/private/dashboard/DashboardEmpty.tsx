import { useNavigate } from 'react-router'
import { Plus } from 'lucide-react'

import { useSettingsStore } from '@/store/settingsStore'
import { useNavHeight } from '@/store/navHeightStore'

import CustomButton from '@/components/shared/CustomButton'
import EmptyState from '@/assets/icons/EmptyState'

const DashboardEmpty = () => {
  const navigate = useNavigate();
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);
  const navHeight = useNavHeight((state) => state.navHeight);

  return (
    <div className={`flex flex-col h-[calc(100vh-${navHeight}px)] items-center justify-center text-dark/70 dark:text-light/70`}>
      <EmptyState className="h-80 sm:mb-15 sm:mt-5" />
      <p className="text-xl">
        No tienes <span className="text-primary font-semibold">Storativas</span>{' '}
        asignadas.
      </p>
      <p className="text-3xl font-semibold text-primary mb-4">
        ¡Crea una desde cero!
      </p>
      <div className="w-50 mb-7">
        <CustomButton
          bgColor="bg-primary"
          textColor="text-light"
          displayText="Crear Storativa"
          Icon={Plus}
          onClick={() => navigate('/create')}
          isDisabled={areSettingsOpen}
        />
      </div>
    </div>
  )
}

export default DashboardEmpty