"use client"

import { Eraser, Image, MessageSquare, Pencil, Square } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { MousePointer, Type } from "lucide-react"
import { track, useEditor } from "tldraw"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

type Tool = {
  name: string
  icon: React.ReactNode
  hotkey: string
  description: string
}

export const Controls = track(() => {

  const editor = useEditor()
  const currentToolId = editor.getCurrentToolId()

  const tools: Tool[] = [
    { name: "select", icon: <MousePointer className="h-4 w-4" />, hotkey: "s", description: "Select (S)" },
    { name: "text", icon: <Type className="h-4 w-4" />, hotkey: "t", description: "Text (T)" },
    { name: "arrow", icon: <ArrowRight className="h-4 w-4 -rotate-45" />, hotkey: "a", description: "Arrow (A)" },
    { name: "geo", icon: <Square className="h-4 w-4" />, hotkey: "g", description: "Geo (G)" },
    { name: "draw", icon: <Pencil className="h-4 w-4" />, hotkey: "d", description: "Draw (D)" },
    { name: "eraser", icon: <Eraser className="h-4 w-4" />, hotkey: "e", description: "Eraser (E)" },
    { name: "input", icon: <MessageSquare className="h-4 w-4" />, hotkey: "i", description: "Input (I)" },
    { name: "image", icon: <Image className="h-4 w-4" />, hotkey: "m", description: "Image (M)" },
  ]

  const handleTool = (toolName: string) => {
    editor.setCurrentTool(toolName)
  }

  return (
    <div className="pointer-events-none absolute bottom-2 left-0 flex w-full justify-center">
      <div className="w-fit pointer-events-auto flex items-center rounded-xl bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur-sm">
        <div className="flex space-x-1">
          {tools.map((tool) => (
            <Button
              key={tool.name}
              variant={currentToolId === tool.name ? "default" : "ghost"}
              size="icon"
              className={cn(
                "h-10 w-10 rounded-lg",
                currentToolId === tool.name
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  : "hover:bg-slate-100"
              )}
              onClick={() => handleTool(tool.name)}
              title={tool.description}
            >
              {tool.icon}
              <span className="sr-only">{tool.description}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
})