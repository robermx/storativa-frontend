import { FC, Fragment, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '@/store/authStore';
import { publicRoutes, privateRoutes } from '@/constants/shared/navbarRoutes';
import CustomLink from '../shared/CustomLink';
import CustomButton from '@/components/shared/CustomButton';
import { Globe } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';

interface EmergentMenuProps {
  addMenuRef: RefObject<HTMLDivElement | null>;
}

const EmergentMenu: FC<EmergentMenuProps> = ({ addMenuRef }) => {
  const user = useAuthStore((state) => state.user);
  const language = useLanguageStore(
    (state) => state.lockedLanguage ?? state.language,
  );
  const isLanguageLocked = useLanguageStore(
    (state) => state.lockedLanguage !== null,
  );
  const cycleLanguage = useLanguageStore((state) => state.cycleLanguage);
  const { t } = useTranslation('navigation');
  const languageSwitchAriaLabel = t('languageSwitch.ariaLabel', {
    language: t(`languages.${language}`),
  });

  return (
    <div
      ref={addMenuRef}
      id="emergent-menu"
      className="absolute w-full overflow-hidden"
    >
      <div className="emergent-menu-wrapper dark:bg-accent bg-secondary relative bottom-10 flex justify-between items-center py-1 px-3 sm:px-4 md:px-6">
        <div className="flex-1 flex gap-x-3">
          {(Boolean(user) ? privateRoutes : publicRoutes).map(
            (route, index, routes) => (
              <Fragment key={route.id}>
                <CustomLink
                  to={route.path}
                  className="text-dark/60 hover:text-darkness"
                  activeClassName="text-darkness"
                >
                  {t(`links.${route.labelKey}`)}
                </CustomLink>
                {index < routes.length - 1 && (
                  <span className="text-primary">|</span>
                )}
              </Fragment>
            ),
          )}
        </div>
        <CustomButton
          icon={<Globe />}
          width="auto"
          variant="text"
          onClick={cycleLanguage}
          disabled={isLanguageLocked}
          aria-label={languageSwitchAriaLabel}
          title={languageSwitchAriaLabel}
          className="cursor-pointer text-dark/60 disabled:text-gray-700/30"
        >
          {language.toUpperCase()}
        </CustomButton>
      </div>
    </div>
  );
};

export default EmergentMenu;
