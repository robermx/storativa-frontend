const DEFAULT_LOWERCASE_WORDS = [
  'a',
  'al',
  'con',
  'de',
  'del',
  'el',
  'en',
  'la',
  'las',
  'lo',
  'los',
  'para',
  'por',
  'un',
  'una',
  'y',
];

export const titleFormat = (
  str: string,
  lowercaseWords: readonly string[] = DEFAULT_LOWERCASE_WORDS,
) => {
  const wordsToKeepLowercase = new Set(
    lowercaseWords.map((word) => word.toLowerCase()),
  );

  const formattedTitle = str.replace(/(?:^| )\w/g, (letter) =>
    letter.toUpperCase(),
  );
  const firstWordIndex = formattedTitle.search(/\b\w+\b/);

  return formattedTitle.replace(/\b\w+\b/g, (word, index) => {
    const normalizedWord = word.toLowerCase();

    if (!wordsToKeepLowercase.has(normalizedWord)) return word;

    return index === firstWordIndex
      ? normalizedWord.charAt(0).toUpperCase() + normalizedWord.slice(1)
      : normalizedWord;
  });
};
