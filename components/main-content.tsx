"use client"

import { PanelLeft } from "lucide-react"
import { useSidebar } from "@/context/sidebar-context"

export default function MainContent() {
  const { toggleSidebar } = useSidebar()

  return (
    <div className="flex-1 h-full bg-white dark:bg-zinc-800 flex flex-col">
      <header className="h-14 flex items-center px-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="size-5 text-zinc-700 dark:text-zinc-300" />
        </button>
      </header>
      <main className="flex-1 p-6 overflow-auto">
        {/* Main content area is now empty except for the sidebar trigger */}
      </main>
    </div>
  )
}

