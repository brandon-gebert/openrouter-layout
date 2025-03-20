"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type CommandContextType = {
  isCommandOpen: boolean
  openCommand: () => void
  closeCommand: () => void
}

const CommandContext = createContext<CommandContextType | undefined>(undefined)

export function CommandProvider({ children }: { children: ReactNode }) {
  const [isCommandOpen, setIsCommandOpen] = useState(false)

  const openCommand = () => setIsCommandOpen(true)
  const closeCommand = () => setIsCommandOpen(false)

  return (
    <CommandContext.Provider value={{ isCommandOpen, openCommand, closeCommand }}>{children}</CommandContext.Provider>
  )
}

export function useCommand() {
  const context = useContext(CommandContext)
  if (context === undefined) {
    throw new Error("useCommand must be used within a CommandProvider")
  }
  return context
}

