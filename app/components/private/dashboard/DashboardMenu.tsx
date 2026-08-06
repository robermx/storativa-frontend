import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useSettingsStore } from '@/store/settingsStore';
import { dashboardMenuItems } from '@/constants/common/dashboard.constants';

import CustomButton from '@/components/shared/CustomButton';

const DashboardMenu: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);

  return (
    <div className="button-wrapper flex gap-x-5 relative right-6">
      {dashboardMenuItems
        .filter((filteredItem) => filteredItem.path !== location.pathname)
        .map((item) => (
          <CustomButton
            key={item.id}
            bgColor="bg-primary/10"
            textColor="text-primary"
            Icon={item.icon}
            onClick={() => navigate(item.path)}
            isDisabled={areSettingsOpen}
          />
        ))}
    </div>
  );
};

export default DashboardMenu;
