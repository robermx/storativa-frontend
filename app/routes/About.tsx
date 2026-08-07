import AboutMain from '@/components/public/about/AboutMain';
import AboutPillars from '@/components/public/about/AboutPillars';
import AboutRouting from '@/components/public/about/AboutRouting';
import AboutConclusion from '@/components/public/about/AboutConclusion';

const About = () => {
  return (
    <section className="mx-auto max-w-7xl flex flex-col justify-center gap-14 lg:gap-20 p-6 lg:p-8">
      <AboutMain />
      <AboutPillars />
      <AboutRouting />
      <AboutConclusion />
    </section>
  );
};

export default About;
