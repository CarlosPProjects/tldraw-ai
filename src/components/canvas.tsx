"use client"

import { ImageShapeUtil, ImageTool, InputShapeUtil, InputTool } from '@/editor/lib'
import { Tldraw, TldrawEditorProps, useEditorComponents } from 'tldraw'
import { Controls } from './controls'
import { ArrowLeftIcon } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { GlobalHotkeys } from './hotkeys'

const MyCustomShapes = [InputShapeUtil, ImageShapeUtil]
const MyCustomTools = [InputTool, ImageTool]

export default function Canvas() {

  const defaultProps: TldrawEditorProps = {
    initialState: "select",
    shapeUtils: MyCustomShapes,
    tools: MyCustomTools,
    onMount: (editor) => {
      editor.user.updateUserPreferences({
        isSnapMode: true,
      })
    }
  }

  return (
    <Tldraw
      hideUi
      persistenceKey='tldraw-canvas'
      {...defaultProps}
    >
      <TldrawContent />
    </Tldraw>
  )
}

function TldrawContent() {
  const { Canvas } = useEditorComponents();

  return (
    <>
      {Canvas ? <Canvas /> : null}
      <Controls />
      <GlobalHotkeys />
      <div className='absolute  top-0 left-0'>
        <Link href='/'>
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon />
          </Button>
        </Link>
      </div>
    </>
  )
}
