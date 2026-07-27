import MainSection from '@/components/home/MainSection';
import StageSection from '@/components/home/StageSection';
import FinalSection from '@/components/home/FinalSection';

const Home = () => {
  return (
    <div className="pt-13">
      <MainSection />
      <StageSection />
      <FinalSection />
    </div>
  );
};

export default Home;
