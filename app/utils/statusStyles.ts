export const statusStyles = (num: number) => {
  if (num === 1)
    return {
      statusKey: 'active',
      style: 'bg-secondary/20 text-secondary border-secondary/30',
    };
  return {
    statusKey: 'inactive',
    style: 'bg-accent/20 text-darkness border-accent/30',
  };
};
