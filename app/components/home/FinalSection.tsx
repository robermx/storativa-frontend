const FinalSection = () => {
  return (
    <section className="h-[calc(100vh-70px)] min-h-100 flex flex-col items-center justify-center relative px-6 py-32">
      <div className="text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark dark:text-light tracking-tighter mb-6">
          Tu historia puede crear <span className="text-primary">lazos</span>
        </h2>
        <p className="text-lg md:text-xl text-dark dark:text-light font-light leading-relaxed mb-12">
          Lo que nace de una emoción, un recuerdo o una mirada propia puede
          convertirse en una historia capaz de cruzar épocas, despertar otras
          ideas y conectar con quienes encuentran algo de sí mismos en ella.
        </p>
      </div>
    </section>
  );
};

export default FinalSection;
