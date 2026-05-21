export const titleFormat = (str: string) =>
  str.replace(/(?:^| )\w/g, (l) => l.toUpperCase());
