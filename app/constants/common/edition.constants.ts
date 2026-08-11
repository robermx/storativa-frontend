import type { JSONContent } from '@tiptap/react';
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  type LucideIcon,
} from 'lucide-react';

export const EMPTY_EDITOR_CONTENT: JSONContent = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

export type SaveState = 'saved' | 'dirty' | 'saving' | 'error';

interface SavePresentation {
  label: string;
  className: string;
  Icon: LucideIcon;
}

export const savePresentationByState: Record<SaveState, SavePresentation> = {
  saved: {
    label: 'Guardado',
    className: 'text-emerald-700 dark:text-emerald-300',
    Icon: CheckCircle2,
  },
  dirty: {
    label: 'Pendiente',
    className: 'text-amber-700 dark:text-amber-300',
    Icon: AlertCircle,
  },
  saving: {
    label: 'Guardando…',
    className: 'text-primary',
    Icon: LoaderCircle,
  },
  error: {
    label: 'No se pudo guardar',
    className: 'text-red-700 dark:text-red-300',
    Icon: AlertCircle,
  },
};
