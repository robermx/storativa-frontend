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

import {
  blockTypeOptions,
  colorOptions,
  fontFamilyOptions,
} from '@/constants/common/toolbar.constants';
import EditorSelect from './EditorSelect';
import ToolbarButton from './ToolbarButton';

interface EditorToolbarProps {
  editor: Editor | null;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null;

  const blockType = editor.isActive('heading', { level: 2 })
    ? 'heading-2'
    : editor.isActive('heading', { level: 3 })
      ? 'heading-3'
      : 'paragraph';
  const fontFamily = editor.getAttributes('textStyle').fontFamily || '';
  const textColor = editor.getAttributes('textStyle').color || '';

  return (
    <div
      role="toolbar"
      aria-label="Formato del texto"
      className="relative z-20 flex flex-wrap items-center gap-1 border-b border-dark/10 bg-lightness/95 p-2 backdrop-blur dark:border-light/10 dark:bg-darkness/95"
    >
      <EditorSelect
        ariaLabel="Color de texto"
        value={textColor}
        options={colorOptions}
        onChange={(value) => {
          const chain = editor.chain().focus();
          if (value) chain.setColor(value).run();
          else chain.unsetColor().run();
        }}
      />

      <EditorSelect
        ariaLabel="Tipo de bloque"
        value={blockType}
        options={blockTypeOptions}
        onChange={(value) => {
          if (value === 'heading-2') {
            editor.chain().focus().setHeading({ level: 2 }).run();
          } else if (value === 'heading-3') {
            editor.chain().focus().setHeading({ level: 3 }).run();
          } else {
            editor.chain().focus().setParagraph().run();
          }
        }}
      />

      <EditorSelect
        ariaLabel="Familia tipográfica"
        value={fontFamily}
        options={fontFamilyOptions}
        onChange={(value) => {
          const chain = editor.chain().focus();
          if (value) chain.setFontFamily(value).run();
          else chain.unsetFontFamily().run();
        }}
      />

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
