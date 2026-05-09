import { Fragment } from 'react';

import MainSection from '@/components/Home/MainSection';
import StageSection from '@/components/Home/StageSection';
import FinalSection from '@/components/Home/FinalSection';

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
