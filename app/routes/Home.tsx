import { Fragment } from 'react';

import MainSection from '@/components/home/MainSection';
import StageSection from '@/components/home/StageSection';
import FinalSection from '@/components/home/FinalSection';

const Home = () => {
  return (
    <Fragment>
      <MainSection />
      <StageSection />
      <FinalSection />
    </Fragment>
  );
};

export default Home;
