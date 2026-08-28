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

export const getSavePresentationByState = (
  translate: (key: string) => string,
): Record<SaveState, SavePresentation> => ({
  saved: {
    label: translate('saveState.saved'),
    className: 'text-emerald-700 dark:text-emerald-300',
    Icon: CheckCircle2,
  },
  dirty: {
    label: translate('saveState.dirty'),
    className: 'text-amber-600 dark:text-amber-400',
    Icon: AlertCircle,
  },
  saving: {
    label: translate('saveState.saving'),
    className: 'text-primary',
    Icon: LoaderCircle,
  },
  error: {
    label: translate('saveState.error'),
    className: 'text-red-700 dark:text-red-300',
    Icon: AlertCircle,
  },
});
