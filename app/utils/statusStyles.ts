export const statusStyles = (num: number) => {
  if (num === 1)
    return {
      status: 'Activo',
      style: 'bg-secondary/20 text-secondary border-secondary/30',
    };
  return {
    status: 'Inactivo',
    style: 'bg-accent/20 text-darkness border-accent/30',
  };
};
