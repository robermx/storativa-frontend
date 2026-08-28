import { useMemo } from 'react';

import type {
  ICatalog,
  ILocalizedCatalogOption,
} from '@/interfaces/catalog.interface';
import { DEFAULT_LANGUAGE, useLanguageStore } from '@/store/languageStore';

const getCatalogLabel = (catalog: ICatalog, language: string) =>
  catalog.labels[language] ?? catalog.labels[DEFAULT_LANGUAGE] ?? catalog.key;

export const useLocalizedCatalog = (
  catalog: ICatalog[],
): ILocalizedCatalogOption[] => {
  const language = useLanguageStore(
    (state) => state.lockedLanguage ?? state.language,
  );

  return useMemo(
    () =>
      catalog.map((item) => ({
        _id: item._id,
        key: item.key,
        value: item.value,
        label: getCatalogLabel(item, language),
      })),
    [catalog, language],
  );
};

export { getCatalogLabel };
