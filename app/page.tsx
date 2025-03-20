import PrimarySidebar from "@/components/primary-sidebar"
import ChatSidebar from "@/components/chat-sidebar"
import ModelSidebar from "@/components/model-sidebar"
import DocsSidebar from "@/components/docs-sidebar"
import RankingsSidebar from "@/components/rankings-sidebar"
import MainContent from "@/components/main-content"
import { SidebarProvider } from "@/context/sidebar-context"
import { CommandProvider } from "@/context/command-context"
import CommandWrapper from "@/components/command-wrapper"

export default function Home() {
  return (
    <SidebarProvider>
      <CommandProvider>
        <div className="bg-white dark:bg-zinc-800 w-full h-screen flex flex-row overflow-hidden">
          <PrimarySidebar />
          <SidebarContent />
          <MainContent />
          <CommandWrapper />
        </div>
      </CommandProvider>
    </SidebarProvider>
  )
}

// Client component to handle conditional rendering
function SidebarContent() {
  return (
    <>
      <ClientSidebarContent />
    </>
  )
}
// This needs to be a separate client component to use the context
;("use client")
import { useSidebar } from "@/context/sidebar-context"

function ClientSidebarContent() {
  const { activeSidebar } = useSidebar()

  if (activeSidebar === "chat") return <ChatSidebar />
  if (activeSidebar === "model") return <ModelSidebar />
  if (activeSidebar === "docs") return <DocsSidebar />
  if (activeSidebar === "trophy") return <RankingsSidebar />

  // Default fallback
  return <ChatSidebar />
}

