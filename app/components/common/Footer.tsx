import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CustomLink from '../shared/CustomLink';
import { footerLinks } from '@/constants/shared/footer.constants';

const Footer: FC = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className="flex gap-3 items-baseline border-t border-t-dark dark:border-t-gray-400 py-5 mx-3 md:mx-6 lg:mx-8">
      <div className="flex-1">
        <p className="leading-7 text-sm text-dark font-bold dark:text-light">
          © {new Date().getFullYear()}, Storativa.{' '}
          <span className="font-light block sm:inline">{t('rights')}</span>
        </p>
      </div>
      <div className="flex flex-col items-end gap-2 sm:gap-5 sm:flex-row">
        {footerLinks.map(({ id, path, labelKey }) => (
          <CustomLink key={id} size="sm" to={path} width="auto">
            {t(`links.${labelKey}`)}
          </CustomLink>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
