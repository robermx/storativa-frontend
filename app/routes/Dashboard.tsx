import { useLoaderData, useNavigate } from 'react-router';

import { useAuthStore } from '@/store/authStore';
import { getUserStorativas } from '@/services/storativa.service';
import { createClientLoader } from '@/lib/createClientLoader';
import { HydrateFallback } from '@/components/shared/HydrateFallback';

interface StorageItem {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'pending' | 'full';
  capacity: string;
  lastUpdate: string;
}

const mockItems: StorageItem[] = [
  {
    id: 'ST-001',
    name: 'Bodega Norte',
    location: 'Madrid, España',
    status: 'active',
    capacity: '78%',
    lastUpdate: 'Hace 2 horas',
  },
  {
    id: 'ST-002',
    name: 'Almacén Central',
    location: 'Barcelona, España',
    status: 'full',
    capacity: '95%',
    lastUpdate: 'Hace 5 min',
  },
  {
    id: 'ST-003',
    name: 'Depósito Logística',
    location: 'Valencia, España',
    status: 'pending',
    capacity: '45%',
    lastUpdate: 'Hace 1 día',
  },
  {
    id: 'ST-004',
    name: 'Centro Distribution',
    location: 'Sevilla, España',
    status: 'active',
    capacity: '62%',
    lastUpdate: 'Hace 3 horas',
  },
  {
    id: 'ST-005',
    name: 'Reserva Industrial',
    location: 'Bilbao, España',
    status: 'active',
    capacity: '88%',
    lastUpdate: 'Hace 30 min',
  },
];

const statusStyles = {
  active: 'bg-secondary/20 text-secondary border-secondary/30',
  pending: 'bg-accent/20 text-darkness border-accent/30',
  full: 'bg-primary/20 text-primary border-primary/30',
};

const statusLabels = {
  active: 'Activo',
  pending: 'Pendiente',
  full: 'Lleno',
};

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = createClientLoader({
  service: getUserStorativas,
});

export { HydrateFallback };

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const data = useLoaderData<typeof clientLoader>();
  console.log('data', data);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-lightness dark:bg-darkness p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold">
              {user ? getInitials(user?.fullName) : 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dark dark:text-light">
                Hola, {user?.fullName || 'Usuario'}
              </h1>
              <p className="text-dark/60 dark:text-light/60 text-sm">
                Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Cerrar sesión
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-dark rounded-xl p-5 shadow-sm border border-dark/10 dark:border-light/10">
            <p className="text-dark/60 dark:text-light/60 text-sm mb-1">
              Total espacios
            </p>
            <p className="text-3xl font-bold text-dark dark:text-light">
              {mockItems.length}
            </p>
          </div>
          <div className="bg-white dark:bg-dark rounded-xl p-5 shadow-sm border border-dark/10 dark:border-light/10">
            <p className="text-dark/60 dark:text-light/60 text-sm mb-1">
              Activos
            </p>
            <p className="text-3xl font-bold text-secondary">
              {mockItems.filter((i) => i.status === 'active').length}
            </p>
          </div>
          <div className="bg-white dark:bg-dark rounded-xl p-5 shadow-sm border border-dark/10 dark:border-light/10">
            <p className="text-dark/60 dark:text-light/60 text-sm mb-1">
              Pendientes
            </p>
            <p className="text-3xl font-bold text-accent">
              {mockItems.filter((i) => i.status === 'pending').length}
            </p>
          </div>
        </section>

        <div className="bg-white dark:bg-dark rounded-xl shadow-sm border border-dark/10 dark:border-light/10 overflow-hidden">
          <div className="p-5 border-b border-dark/10 dark:border-light/10">
            <h2 className="text-lg font-semibold text-dark dark:text-light">
              Espacios de almacenamiento
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-lightness dark:bg-dark/50">
                <tr>
                  <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60">
                    ID
                  </th>
                  <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60">
                    Nombre
                  </th>
                  <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60 hidden sm:table-cell">
                    Ubicación
                  </th>
                  <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60">
                    Estado
                  </th>
                  <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60 hidden md:table-cell">
                    Capacidad
                  </th>
                  <th className="text-left px-5 py-3 text-sm font-medium text-dark/60 dark:text-light/60 hidden lg:table-cell">
                    Última actualización
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark/5 dark:divide-light/5">
                {mockItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-lightness dark:hover:bg-dark/30 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm font-mono text-dark/60 dark:text-light/60">
                      {item.id}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-dark dark:text-light">
                        {item.name}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <p className="text-sm text-dark/70 dark:text-light/70">
                        {item.location}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${statusStyles[item.status]}`}
                      >
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-light dark:bg-darkness rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${item.status === 'full' ? 'bg-primary' : item.status === 'pending' ? 'bg-accent' : 'bg-secondary'}`}
                            style={{ width: item.capacity }}
                          />
                        </div>
                        <span className="text-sm text-dark/70 dark:text-light/70">
                          {item.capacity}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <p className="text-sm text-dark/50 dark:text-light/50">
                        {item.lastUpdate}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
