const MainSection = () => {
  return (
    <section className="min-h-[calc(100vh-70px)] text-center flex flex-col justify-center items-center px-6">
      <h1 className="max-w-4xl text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-light tracking-tighter mb-6">
        Todos tenemos algo que contar...{' '}
        <span className="text-primary">
          algo que conecte e inspire de manera positiva a nuestra audiencia.
        </span>
      </h1>
      <p className="max-w-2xl text-lg md:text-xl text-dark dark:text-light font-light leading-relaxed">
        Con base en el recuerdo de nuestros mejores y peores momentos,
        incursionamos en situaciones, lugares y tiempos, buscando ser escuchados
        con el propósito de establecer lazos.
      </p>
    </section>
  );
};

export default MainSection;
