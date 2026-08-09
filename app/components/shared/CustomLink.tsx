import { FC } from 'react';
import { NavLink } from 'react-router';

import useNavigationLink from '@/hooks/useNavigationLink';
import ActionContent from '@/components/shared/action/ActionContent';
import { getActionClassName } from '@/components/shared/action/action.styles';
import { CustomLinkProps } from '@/interfaces/nav-link.interface';

const CustomLink: FC<CustomLinkProps> = ({
  children,
  to,
  variant = 'text',
  size = 'md',
  width = 'auto',
  icon,
  iconSize = size,
  iconPosition = 'end',
  truncate = false,
  className,
  activeClassName,
  onClick,
  ...linkProps
}) => {
  const { handleNavLinkClick } = useNavigationLink();

  return (
    <NavLink
      {...linkProps}
      to={to}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) handleNavLinkClick(event, to);
      }}
      className={({ isActive }) =>
        getActionClassName({
          variant,
          size,
          width,
          className: isActive && activeClassName ? activeClassName : className,
          isActive,
          isNavigation: true,
        })
      }
    >
      <ActionContent
        icon={icon}
        iconSize={iconSize}
        iconPosition={iconPosition}
        size={size}
        truncate={truncate}
      >
        {children}
      </ActionContent>
    </NavLink>
  );
};

export default CustomLink;
