const MainSection = () => {
  return (
    <section className="relative h-[calc(100vh-70px)] flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-light tracking-tighter mb-6">
          Todos tenemos algo que contar...{' '}
          <span className="text-primary">
            algo que conecte e inspire de manera positiva a nuestra audiencia.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-dark dark:text-light max-w-2xl mx-auto font-light leading-relaxed">
          Con base en el recuerdo de nuestros mejores y peores momentos,
          incursionamos en situaciones, lugares y tiempos, buscando ser
          escuchados con el propósito de establecer lazos.
        </p>
        <div className="mt-16 flex flex-col items-center gap-3 text-slate-500">
          <span className="text-xs text-primary/80 uppercase">
            scroll para comenzar
          </span>
          <div className="w-px h-16 bg-linear-to-b from-primary/80 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default MainSection;
