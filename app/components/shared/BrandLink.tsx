import { NavLink } from 'react-router';

import IsoSimple from '@/assets/logo/IsoSimple';
import MainLogo from '@/assets/logo/MainLogo';
import useNavigationLink from '@/hooks/useNavigationLink';

const BrandLink = () => {
  const { handleNavLinkClick } = useNavigationLink();

  return (
    <NavLink
      to="/"
      aria-label="Ir al inicio"
      onClick={(event) => handleNavLinkClick(event, '/')}
    >
      {({ isActive }) => (
        <div className="flex items-center gap-2">
          <IsoSimple className="w-12.5" />
          <MainLogo
            className={`w-37.5 ${isActive ? 'text-lightness' : 'text-secondary hover:text-lightness'}`}
          />
        </div>
      )}
    </NavLink>
  );
};

export default BrandLink;
