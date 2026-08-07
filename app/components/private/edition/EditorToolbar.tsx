import type { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor | null;
}

const colors = [
  { label: 'Predeterminado', value: '' },
  { label: 'Oscuro', value: '#182639' },
  { label: 'Primario', value: '#00a0e8' },
  { label: 'Verde', value: '#287a5c' },
  { label: 'Rojo', value: '#b93838' },
  { label: 'Violeta', value: '#6d4bc3' },
];

const ToolbarButton = ({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    aria-pressed={active}
    disabled={disabled}
    onClick={onClick}
    className={`rounded-md p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
      active
        ? 'bg-primary text-light'
        : 'text-dark/70 hover:bg-primary/10 hover:text-primary dark:text-light/70'
    }`}
  >
    {children}
  </button>
);

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null;

  const blockType = editor.isActive('heading', { level: 2 })
    ? 'heading-2'
    : editor.isActive('heading', { level: 3 })
      ? 'heading-3'
      : 'paragraph';
  const fontFamily = editor.getAttributes('textStyle').fontFamily || '';

  return (
    <div
      role="toolbar"
      aria-label="Formato del texto"
      className="z-20 flex flex-wrap items-center gap-1 border-b border-dark/10 bg-lightness/95 p-2 backdrop-blur dark:border-light/10 dark:bg-darkness/95"
    >
      <select
        aria-label="Tipo de bloque"
        value={blockType}
        onChange={(event) => {
          const value = event.target.value;
          if (value === 'heading-2') {
            editor.chain().focus().setHeading({ level: 2 }).run();
          } else if (value === 'heading-3') {
            editor.chain().focus().setHeading({ level: 3 }).run();
          } else {
            editor.chain().focus().setParagraph().run();
          }
        }}
        className="rounded-md border border-dark/10 bg-light px-2 py-1.5 text-sm text-dark outline-none focus:border-primary dark:border-light/10 dark:bg-dark dark:text-light"
      >
        <option value="paragraph">Párrafo</option>
        <option value="heading-2">Título</option>
        <option value="heading-3">Subtítulo</option>
      </select>

      <select
        aria-label="Familia tipográfica"
        value={fontFamily}
        onChange={(event) => {
          const value = event.target.value;
          const chain = editor.chain().focus();
          if (value) chain.setFontFamily(value).run();
          else chain.unsetFontFamily().run();
        }}
        className="rounded-md border border-dark/10 bg-light px-2 py-1.5 text-sm text-dark outline-none focus:border-primary dark:border-light/10 dark:bg-dark dark:text-light"
      >
        <option value="">Tipografía</option>
        <option value="system-ui, sans-serif">Sans</option>
        <option value="Georgia, serif">Serif</option>
        <option value="ui-monospace, monospace">Mono</option>
      </select>

      <span className="mx-1 h-6 w-px bg-dark/10 dark:bg-light/10" />
      <ToolbarButton
        label="Negrita"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={18} />
      </ToolbarButton>
      <ToolbarButton
        label="Cursiva"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={18} />
      </ToolbarButton>
      <ToolbarButton
        label="Subrayado"
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={18} />
      </ToolbarButton>
      <ToolbarButton
        label="Tachado"
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={18} />
      </ToolbarButton>

      <span className="mx-1 h-6 w-px bg-dark/10 dark:bg-light/10" />
      <ToolbarButton
        label="Lista"
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={18} />
      </ToolbarButton>
      <ToolbarButton
        label="Lista numerada"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={18} />
      </ToolbarButton>
      <ToolbarButton
        label="Cita"
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={18} />
      </ToolbarButton>

      <span className="mx-1 h-6 w-px bg-dark/10 dark:bg-light/10" />
      {(
        [
          ['left', AlignLeft, 'Alinear a la izquierda'],
          ['center', AlignCenter, 'Centrar'],
          ['right', AlignRight, 'Alinear a la derecha'],
          ['justify', AlignJustify, 'Justificar'],
        ] as const
      ).map(([alignment, Icon, label]) => (
        <ToolbarButton
          key={alignment}
          label={label}
          active={editor.isActive({ textAlign: alignment })}
          onClick={() => editor.chain().focus().setTextAlign(alignment).run()}
        >
          <Icon size={18} />
        </ToolbarButton>
      ))}

      <div className="mx-1 flex items-center gap-1" aria-label="Color de texto">
        {colors.map((color) => {
          const isActive = color.value
            ? editor.isActive('textStyle', { color: color.value })
            : !editor.getAttributes('textStyle').color;
          return (
            <button
              key={color.label}
              type="button"
              title={color.label}
              aria-label={`Color ${color.label}`}
              aria-pressed={isActive}
              onClick={() => {
                const chain = editor.chain().focus();
                if (color.value) chain.setColor(color.value).run();
                else chain.unsetColor().run();
              }}
              className={`size-6 rounded-full border-2 transition-transform hover:scale-110 ${
                isActive
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-dark/15 dark:border-light/20'
              }`}
              style={{
                backgroundColor: color.value || 'currentColor',
              }}
            />
          );
        })}
      </div>

      <span className="mx-1 h-6 w-px bg-dark/10 dark:bg-light/10" />
      <ToolbarButton
        label="Deshacer"
        disabled={!editor.can().chain().focus().undo().run()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 size={18} />
      </ToolbarButton>
      <ToolbarButton
        label="Rehacer"
        disabled={!editor.can().chain().focus().redo().run()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 size={18} />
      </ToolbarButton>
    </div>
  );
};

export default EditorToolbar;
