import { EditorSelectOption } from '@/components/private/edition/EditorSelect';

export const EDITOR_THEME_SWATCH = 'theme';

export const blockTypeOptions: EditorSelectOption[] = [
  { labelKey: 'paragraph', value: 'paragraph' },
  { labelKey: 'heading', value: 'heading-2' },
  { labelKey: 'subheading', value: 'heading-3' },
];

export const fontFamilyOptions: EditorSelectOption[] = [
  { labelKey: 'font', value: '' },
  { labelKey: 'sans', value: 'system-ui, sans-serif' },
  { labelKey: 'serif', value: 'Georgia, serif' },
  { labelKey: 'mono', value: 'ui-monospace, monospace' },
];

export const colorOptions: EditorSelectOption[] = [
  { labelKey: 'default', value: '', swatch: EDITOR_THEME_SWATCH },
  { labelKey: 'primary', value: 'var(--color-primary)', swatch: 'var(--color-primary)' },
  { labelKey: 'green', value: 'var(--color-green-500)', swatch: 'var(--color-green-500)' },
  { labelKey: 'red', value: 'var(--color-red-600)', swatch: 'var(--color-red-600)' },
  { labelKey: 'violet', value: 'var(--color-purple-600)', swatch: 'var(--color-purple-600)' },
  { labelKey: 'yellow', value: 'var(--color-amber-500)', swatch: 'var(--color-amber-500)' },
];
