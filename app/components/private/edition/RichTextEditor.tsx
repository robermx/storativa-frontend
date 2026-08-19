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
          'storativa-editor overflow-y-auto px-3 pt-3 pb-10 h-[calc(100vh-330px)] min-[344px]:h-[calc(100vh-295px)] min-[471px]:h-[calc(100vh-250px)] min-[928px]:h-[calc(100vh-210px)]  text-dark outline-none dark:text-light',
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
    <div className="overflow-hidden">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
      <div className="h-10 relative blur-sm -top-5 bg-light dark:bg-dark" />
    </div>
  );
};

export default RichTextEditor;
