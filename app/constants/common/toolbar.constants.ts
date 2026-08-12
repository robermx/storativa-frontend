import { EditorSelectOption } from "@/components/private/edition/EditorSelect";

export const EDITOR_THEME_SWATCH = 'theme';

export const blockTypeOptions: EditorSelectOption[] = [
  { label: 'Párrafo', value: 'paragraph' },
  { label: 'Título', value: 'heading-2' },
  { label: 'Subtítulo', value: 'heading-3' },
];

export const fontFamilyOptions: EditorSelectOption[] = [
  { label: 'Tipografía', value: '' },
  { label: 'Sans', value: 'system-ui, sans-serif' },
  { label: 'Serif', value: 'Georgia, serif' },
  { label: 'Mono', value: 'ui-monospace, monospace' },
];

export const colorOptions: EditorSelectOption[] = [
  { label: 'Predeterminado', value: '', swatch: EDITOR_THEME_SWATCH },
  { label: 'Primario', value: 'var(--color-primary)', swatch: 'var(--color-primary)' },
  { label: 'Verde', value: 'var(--color-green-500)', swatch: 'var(--color-green-500)' },
  { label: 'Rojo', value: 'var(--color-red-600)', swatch: 'var(--color-red-600)' },
  { label: 'Violeta', value: 'var(--color-purple-600)', swatch: 'var(--color-purple-600)' },
  { label: 'Amarillo', value: 'var(--color-amber-500)', swatch: 'var(--color-amber-500)' },
];