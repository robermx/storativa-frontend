const MainSection = () => {
  return (
    <section className="h-[calc(100vh-70px)] min-h-100 text-center flex flex-col justify-center items-center px-6">
      <h1 className="max-w-4xl text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-light tracking-tighter mb-6">
        Todos tenemos algo dentro que busca convertirse en historia...{' '}
        <span className="text-primary">
          una idea, un recuerdo o una forma distinta de mirar el mundo.
        </span>
      </h1>
      <p className="max-w-2xl text-lg md:text-xl text-dark dark:text-light font-light leading-relaxed">
        Storativa te acompaña a transformar aquello que te inspira en una
        historia propia: explorando épocas, lugares y posibilidades para
        encontrar una voz auténtica y compartirla con los demás.
      </p>
    </section>
  );
};

export default MainSection;
