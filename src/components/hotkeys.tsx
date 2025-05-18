"use client"

import { useCallback } from "react"
import { useEditor } from "tldraw"
import { useHotkeys } from "react-hotkeys-hook"

export function GlobalHotkeys() {
  const editor = useEditor()

  const handleDelete = useCallback(() => {
    const activeElement = document.activeElement
    const isEditingText = activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement ||
      activeElement?.getAttribute("contenteditable") === "true" ||
      activeElement?.closest(".ProseMirror") !== null

    if (!isEditingText && editor.getSelectedShapeIds().length > 0) {
      editor.deleteShapes(editor.getSelectedShapeIds())
    }
  }, [editor])

  // Tool change
  const handleToolChange = useCallback((toolName: string) => {
    editor.setCurrentTool(toolName)
  }, [editor])

  const handleDuplicate = useCallback(() => {
    if (editor.getSelectedShapeIds().length === 0) return

    editor.duplicateShapes(editor.getSelectedShapeIds())

    editor.nudgeShapes(editor.getSelectedShapeIds(), { x: 20, y: 20 })
  }, [editor])

  // Delete
  useHotkeys("delete", handleDelete, { preventDefault: true })
  useHotkeys("backspace", handleDelete, { preventDefault: true })

    // Tools
    useHotkeys('s', () => handleToolChange('select'), { preventDefault: true })
    useHotkeys('t', () => handleToolChange('text'), { preventDefault: true })
    useHotkeys('g', () => handleToolChange('geo'), { preventDefault: true })
    useHotkeys('a', () => handleToolChange('arrow'), { preventDefault: true })
    useHotkeys('d', () => handleToolChange('draw'), { preventDefault: true })
    useHotkeys('e', () => handleToolChange('eraser'), { preventDefault: true })
    useHotkeys('i', () => handleToolChange('input'), { preventDefault: true })
    useHotkeys('m', () => handleToolChange('image'), { preventDefault: true })
  
    // Editor
    useHotkeys('ctrl+z', () => editor.undo(), { preventDefault: true })
    useHotkeys("ctrl+d", handleDuplicate, { preventDefault: true })
  
    return null
}