export const daysPassed = (createdAt: string) => {
  return Math.floor(
    Math.max(
      0,
      (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24),
    ),
  );
};

export const percentageDays = (createdAt: string, timeToComplete: number) => {
  const pct = Math.min(
    100,
    Math.round((daysPassed(createdAt) / timeToComplete) * 100),
  );
  return pct;
};
