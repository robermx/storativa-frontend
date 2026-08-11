import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
} from 'react';

import type { IResStorativa } from '@/interfaces/storativa.interface';
import { useEditionSession } from '@/hooks/useEditionSession';

type EditionContextValue = ReturnType<typeof useEditionSession>;

interface EditionProviderProps extends PropsWithChildren {
  storativa: IResStorativa;
}

const EditionContext = createContext<EditionContextValue | null>(null);

export const EditionProvider: FC<EditionProviderProps> = ({
  storativa,
  children,
}) => {
  const session = useEditionSession(storativa);

  return (
    <EditionContext.Provider value={session}>
      {children}
    </EditionContext.Provider>
  );
};

export const useEdition = () => {
  const context = useContext(EditionContext);

  if (!context) {
    throw new Error('useEdition debe usarse dentro de EditionProvider.');
  }

  return context;
};
