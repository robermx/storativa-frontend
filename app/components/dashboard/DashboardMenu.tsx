import { FC } from 'react';
import { useNavigate } from 'react-router';

import { Gauge, Home, Plus } from 'lucide-react';

const DashboardMenu: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="button-wrapper relative flex gap-3 right-5">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
      >
        <Home />
      </button>
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
      >
        <Gauge />
      </button>
      <button
        onClick={() => navigate('/create')}
        className="flex items-center gap-2 p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
      >
        <Plus />
      </button>
    </div>
  );
};

export default DashboardMenu;
