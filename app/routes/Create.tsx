import { createClientLoader } from '@/lib/createClientLoader';
import { HydrateFallback } from '../components/shared/HydrateFallback';
import {
  getCharacterCatalog,
  getContextCatalog,
  getStorySizeCatalog,
} from '@/services/catalog.service';

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = createClientLoader({
  services: [
    { key: 'characterType', fn: getCharacterCatalog },
    { key: 'contextType', fn: getContextCatalog },
    { key: 'storySizeType', fn: getStorySizeCatalog },
  ],
});

export { HydrateFallback };

const Create = () => {
  return (
    <div>
      <h2>Create</h2>
    </div>
  );
};

export default Create;
