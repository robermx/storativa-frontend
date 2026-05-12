import { createClientLoader } from '@/lib/createClientLoader';

import {
  getCharacterCatalog,
  getContextCatalog,
  getStorySizeCatalog,
} from '@/services/catalog.service';

import FormSkeleton from '../components/skeleton/FormSkeleton';
import { useLoaderData } from 'react-router';

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = createClientLoader({
  services: [
    { key: 'characterCatalog', fn: getCharacterCatalog },
    { key: 'contextCatalog', fn: getContextCatalog },
    { key: 'storySizeCatalog', fn: getStorySizeCatalog },
  ],
});

export const HydrateFallback = () => <FormSkeleton />;

const Create = () => {
  const { characterCatalog, contextCatalog, storySizeCatalog } =
    useLoaderData<typeof clientLoader>();

  console.log({ characterCatalog, contextCatalog, storySizeCatalog });
  return (
    <div>
      <h2>Create</h2>
    </div>
  );
};

export default Create;
