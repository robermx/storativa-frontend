import { FC, Fragment } from 'react';
import { NavLink } from 'react-router';

import useNavigationLink from '@/hooks/useNavigationLink';
import IsoSimple from '@/assets/logo/IsoSimple';
import MainLogo from '@/assets/logo/MainLogo';
import { CustomLinkProps, variantType } from '@/interfaces/nav-link.interface';




const CustomLink: FC<CustomLinkProps> = ({
  isMainMenu = false,
  path = '/',
  displayName = '',
  variant = variantType.simple,
  Icon = null,
  size = "sm"
}) => {
  const { handleNavLinkClick } = useNavigationLink();
  return isMainMenu ? (
    <NavLink to={path} onClick={(event) => handleNavLinkClick(event, '/')}>
      {({ isActive }) => (
        <div className="flex items-center gap-3">
          <IsoSimple />
          <MainLogo
            className={`transition-colors ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`}
          />
        </div>
      )}
    </NavLink>
  ) : (
    <Fragment>
      <NavLink
        onClick={(event) => handleNavLinkClick(event, path)}
        to={path}
        className={({ isActive }) =>
          variant === variantType.simple
            ? `transition-colors font-bold ${isActive ? 'text-darkness' : 'text-gray-500 hover:text-darkness'}`
            : 'inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-light transition-transform duration-300 hover:-translate-y-0.5'
        }
      >
        {displayName}
        {Icon && (
          <Icon
            size={
              size === 'sm' ? 20 : size === 'md' ? 22 : size === 'lg' ? 24 : 28
            }
          />
        )}
      </NavLink>
      <span className="text-primary last:hidden">|</span>
    </Fragment>
  );
};

export default CustomLink;
