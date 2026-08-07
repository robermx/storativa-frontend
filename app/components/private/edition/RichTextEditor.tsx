import { useEffect, useRef } from 'react';
import { EditorContent, type JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Color, FontFamily, TextStyle } from '@tiptap/extension-text-style';

import EditorToolbar from './EditorToolbar';

interface RichTextEditorProps {
  chapterId: string;
  content: JSONContent;
  onChange: (content: JSONContent) => void;
}

const RichTextEditor = ({
  chapterId,
  content,
  onChange,
}: RichTextEditorProps) => {
  const activeChapterRef = useRef(chapterId);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'storativa-editor h-[calc(100vh-260px)] md:h-[calc(100vh-240px)] lg:h-[calc(100vh-200px)]  overflow-y-auto px-5 pt-5 pb-100 text-dark outline-none dark:text-light',
        'aria-label': 'Contenido del capítulo',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChangeRef.current(currentEditor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor || activeChapterRef.current === chapterId) return;
    activeChapterRef.current = chapterId;
    editor.commands.setContent(content, { emitUpdate: false });
  }, [chapterId, content, editor]);

  return (
    <div className="overflow-hidden rounded-xl border border-dark/10 bg-lightness shadow-sm dark:border-light/10 dark:bg-darkness">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
