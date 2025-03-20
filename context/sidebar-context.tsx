"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type SidebarType = "chat" | "model" | "docs"

type SidebarContextType = {
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  activeSidebar: SidebarType
  setActiveSidebar: (type: SidebarType) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSidebar, setActiveSidebar] = useState<SidebarType>("chat")

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <SidebarContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        setSidebarOpen,
        activeSidebar,
        setActiveSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

