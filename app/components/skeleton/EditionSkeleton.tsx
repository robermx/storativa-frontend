const EditionSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-6 pb-12 pt-28">
      <div className="mb-6 h-16 rounded-xl bg-primary/10" />
      <div className="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <div className="h-96 rounded-xl bg-primary/10" />
        <div className="h-152 rounded-xl bg-primary/10" />
      </div>
      <span className="sr-only">Cargando espacio de edición</span>
    </div>
  );
};

export default EditionSkeleton;
