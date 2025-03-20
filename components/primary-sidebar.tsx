"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Box, Trophy, File, Search } from "lucide-react"
import DropdownMenu from "./dropdown-menu"
import { useSidebar } from "@/context/sidebar-context"
import { useCommand } from "@/context/command-context"

export default function PrimarySidebar() {
  const [showMenu, setShowMenu] = useState(false)
  const { sidebarOpen, activeSidebar, setActiveSidebar } = useSidebar()
  const { openCommand } = useCommand()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If the dropdown is shown and the click is outside both the dropdown and the toggle button
      if (
        showMenu &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false)
      }
    }

    // Add event listener when dropdown is shown
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMenu])

  if (!sidebarOpen) {
    return null
  }

  return (
    <div className="w-16 h-full bg-zinc-200 dark:bg-zinc-950 flex flex-col items-center justify-between p-3 gap-y-3">
      <div className="flex flex-col gap-y-3">
        <button
          className={`p-2 ${activeSidebar === "chat" ? "bg-zinc-300 dark:bg-zinc-800" : "hover:bg-zinc-300 dark:hover:bg-zinc-900"} rounded-lg flex items-center justify-center`}
          onClick={() => setActiveSidebar("chat")}
        >
          <MessageCircle className="size-5 text-zinc-950 dark:text-zinc-100" />
        </button>
        <button
          className={`p-2 ${activeSidebar === "model" ? "bg-zinc-300 dark:bg-zinc-800" : "hover:bg-zinc-300 dark:hover:bg-zinc-900"} rounded-lg flex items-center justify-center`}
          onClick={() => setActiveSidebar("model")}
        >
          <Box className="size-5 text-zinc-950 dark:text-zinc-100" />
        </button>
        <button
          className={`p-2 ${activeSidebar === "trophy" ? "bg-zinc-300 dark:bg-zinc-800" : "hover:bg-zinc-300 dark:hover:bg-zinc-900"} rounded-lg flex items-center justify-center`}
          onClick={() => setActiveSidebar("trophy")}
        >
          <Trophy className="size-5 text-zinc-950 dark:text-zinc-100" />
        </button>
        <button
          className={`p-2 ${activeSidebar === "docs" ? "bg-zinc-300 dark:bg-zinc-800" : "hover:bg-zinc-300 dark:hover:bg-zinc-900"} rounded-lg flex items-center justify-center`}
          onClick={() => setActiveSidebar("docs")}
        >
          <File className="size-5 text-zinc-950 dark:text-zinc-100" />
        </button>
        <button
          className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-900 rounded-lg flex items-center justify-center"
          onClick={(e) => {
            e.preventDefault()
            openCommand()
          }}
        >
          <Search className="size-5 text-zinc-950 dark:text-zinc-100" />
        </button>
      </div>

      <div className="flex flex-col gap-y-3 relative">
        {showMenu && (
          <div ref={dropdownRef}>
            <DropdownMenu />
          </div>
        )}

        {/* Toggle button */}
        <button
          ref={buttonRef}
          className="size-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-medium text-xs"
          onClick={() => setShowMenu(!showMenu)}
        >
          JD
        </button>
      </div>
    </div>
  )
}

