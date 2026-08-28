import type { Editor } from '@tiptap/react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('editor');
  if (!editor) return null;

  const blockType = editor.isActive('heading', { level: 2 })
    ? 'heading-2'
    : editor.isActive('heading', { level: 3 })
      ? 'heading-3'
      : 'paragraph';
  const fontFamily = editor.getAttributes('textStyle').fontFamily || '';
  const textColor = editor.getAttributes('textStyle').color || '';
  const translateOptions = (options: typeof blockTypeOptions) =>
    options.map((option) => ({
      ...option,
      labelKey: t(`toolbarOptions.${option.labelKey}`),
    }));

  return (
    <div
      role="toolbar"
      aria-label={t('toolbar.ariaLabel')}
      className="relative z-20 flex flex-wrap items-center gap-1 border-b border-dark/10 bg-lightness/95 p-2 backdrop-blur dark:border-light/10 dark:bg-darkness/95"
    >
      <EditorSelect
        ariaLabel={t('toolbar.textColor')}
        value={textColor}
        options={translateOptions(colorOptions)}
        onChange={(value) => {
          const chain = editor.chain().focus();
          if (value) chain.setColor(value).run();
          else chain.unsetColor().run();
        }}
      />

      <EditorSelect
        ariaLabel={t('toolbar.blockType')}
        value={blockType}
        options={translateOptions(blockTypeOptions)}
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
        ariaLabel={t('toolbar.fontFamily')}
        value={fontFamily}
        options={translateOptions(fontFamilyOptions)}
        onChange={(value) => {
          const chain = editor.chain().focus();
          if (value) chain.setFontFamily(value).run();
          else chain.unsetFontFamily().run();
        }}
      />

      <span className="mx-1 h-6 w-px bg-dark/10 dark:bg-light/10" />
      <ToolbarButton
        label={t('toolbar.bold')}
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={18} />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.italic')}
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={18} />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.underline')}
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={18} />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.strike')}
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={18} />
      </ToolbarButton>

      <span className="mx-1 h-6 w-px bg-dark/10 dark:bg-light/10" />
      <ToolbarButton
        label={t('toolbar.bulletList')}
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={18} />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.orderedList')}
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={18} />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.quote')}
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={18} />
      </ToolbarButton>

      <span className="mx-1 h-6 w-px bg-dark/10 dark:bg-light/10" />
      {(
        [
          ['left', AlignLeft, 'alignLeft'],
          ['center', AlignCenter, 'alignCenter'],
          ['right', AlignRight, 'alignRight'],
          ['justify', AlignJustify, 'justify'],
        ] as const
      ).map(([alignment, Icon, labelKey]) => (
        <ToolbarButton
          key={alignment}
          label={t(`toolbar.${labelKey}`)}
          active={editor.isActive({ textAlign: alignment })}
          onClick={() => editor.chain().focus().setTextAlign(alignment).run()}
        >
          <Icon size={18} />
        </ToolbarButton>
      ))}

      <span className="mx-1 h-6 w-px bg-dark/10 dark:bg-light/10" />
      <ToolbarButton
        label={t('toolbar.undo')}
        disabled={!editor.can().chain().focus().undo().run()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 size={18} />
      </ToolbarButton>
      <ToolbarButton
        label={t('toolbar.redo')}
        disabled={!editor.can().chain().focus().redo().run()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 size={18} />
      </ToolbarButton>
    </div>
  );
};

export default EditorToolbar;
