import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-lightness dark:bg-darkness py-2 px-8">
      <p className="text-dark dark:text-light text-center">
        © {new Date().getFullYear()} Derechos Reservados
      </p>
    </footer>
  );
};

export default Footer;
