import { FC, Fragment } from 'react';
import { NavLink } from 'react-router';

import useNavigationLink from '@/hooks/useNavigationLink';
import IsoSimple from '@/assets/logo/IsoSimple';
import MainLogo from '@/assets/logo/MainLogo';
import { CustomLinkProps, variantType } from '@/interfaces/nav-link.interface';

const buttonBaseClassName =
  'inline-flex items-center gap-2 rounded-md px-5 py-2 font-semibold transition-colors';

const CustomLink: FC<CustomLinkProps> = ({
  isMainMenu = false,
  path = '/',
  displayName = '',
  variant = variantType.simple,
  Icon = null,
  size = 'sm',
  withPipe = false,
}) => {
  const { handleNavLinkClick } = useNavigationLink();

  const getLinkClassName = (isActive: boolean) => {
    if (variant === variantType.simple) {
      return `font-bold transition-colors ${isActive ? 'text-darkness' : 'text-gray-500 hover:text-darkness'}`;
    }

    return `${buttonBaseClassName} ${
      variant === variantType.outlined
        ? 'border-2 border-dark/10 text-dark duration-300 hover:border-primary/40 hover:text-primary dark:border-light/15 dark:text-light dark:hover:border-primary/40'
        : 'bg-primary/80 text-light hover:bg-primary'
    }`;
  };

  return isMainMenu ? (
    <NavLink to={path} onClick={(event) => handleNavLinkClick(event, '/')}>
      {({ isActive }) => (
        <div className="flex items-center gap-2">
          <IsoSimple className="w-12.5" />
          <MainLogo
            className={`w-37.5 ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`}
          />
        </div>
      )}
    </NavLink>
  ) : (
    <Fragment>
      <NavLink
        onClick={(event) => handleNavLinkClick(event, path)}
        to={path}
        className={({ isActive }) => getLinkClassName(isActive)}
      >
        {displayName}
        {Icon && (
          <Icon
            size={
              size === 'sm'
                ? 20
                : size === 'base'
                  ? 22
                  : size === 'lg'
                    ? 24
                    : 28
            }
          />
        )}
      </NavLink>

      {withPipe && <span className="text-primary last:hidden">|</span>}
    </Fragment>
  );
};

export default CustomLink;
