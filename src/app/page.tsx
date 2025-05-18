"use client"

import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Tldraw, TldrawEditorProps } from "tldraw"
import { InputShapeUtil } from "@/editor/lib/shapes/input/InputShapeUtil"
import { ImageShapeUtil } from "@/editor/lib"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center bg-gradient-to-b  from-slate-50 to slate-100">
      <div className="container flex-1 mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-700 mb-4">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>Canvas + AI Integration</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              Design workflows{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                connecting nodes
              </span>
            </h1>

            <p className="text-xl text-slate-600 max-w-xl">
              Define node behaviors and leverage generative AI for dynamic, real-time responses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/canva">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://tldraw.dev/quick-start" target="_blank">
                <Button size="lg" variant="outline" className="border-slate-300">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <TldrawCanvas />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-20"></div>
          </div>
        </div>
      </div>
    </main>
  )
}

function TldrawCanvas() {

  const defaultProps: TldrawEditorProps = {
    initialState: "select",
    shapeUtils: [InputShapeUtil, ImageShapeUtil],
    cameraOptions: {
      wheelBehavior: "none",
      isLocked: true,
    },
    onMount: (editor) => {
      editor.createShapes([
        {
          type: "input",
          x: 50,
          y: 50,
        },
        {
          type: "image",
          x: 400,
          y: 250,
        },
      ])
    }
  }

  return (
    <div className="h-96 w-full relative rounded-lg border-2 border-slate-200 overflow-hidden">
      <Tldraw hideUi {...defaultProps} />
    </div>
  )
}