"use client"

import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { FC } from 'react'
import { useQuickReactor } from 'tldraw'

interface TiptapProps {
  content: string;
  onContentChange?: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TiptapComponent: FC<TiptapProps> = ({
  content,
  onContentChange,
  placeholder,
  disabled
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
        emptyNodeClass: "is-empty",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onContentChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "h-full",
        style: "font-family: 'tldraw_draw', sans-serif;",
      }
    },
    editable: !disabled,
    immediatelyRender: false,
  })

  useQuickReactor(
    "update-tiptap-content",
    () => {
      if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content)
      }
    },
    [content, editor]
  )

  useQuickReactor(
    "update-tiptap-editable",
    () => {
      if (editor) {
        editor.setEditable(!disabled)
      }
    },
    [disabled, editor]
  )

  if (!editor) return null;

  return <EditorContent editor={editor} style={{ height: "100%" }} />

}

const Tiptap = React.memo(TiptapComponent)

export default Tiptap