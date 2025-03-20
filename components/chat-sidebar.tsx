"use client"

import { useState } from "react"
import { FilePlus2 } from "lucide-react"
import { useSidebar } from "@/context/sidebar-context"
import { useToast } from "@/hooks/use-toast"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

// Define a type for our chat items
type Chat = {
  id: string
  title: string
  createdAt: Date
  isActive: boolean
}

export default function ChatSidebar() {
  const { sidebarOpen } = useSidebar()
  const { toast } = useToast()
  // State to store our chat list
  const [chats, setChats] = useState<Chat[]>([])
  // Add a state to track which chat has its context menu open
  const [contextMenuOpenForId, setContextMenuOpenForId] = useState<string | null>(null)

  // Function to create a new chat
  const createNewChat = () => {
    // Generate a unique ID
    const newId = crypto.randomUUID()

    // Create a new chat object
    const newChat: Chat = {
      id: newId,
      title: "New chat",
      createdAt: new Date(),
      isActive: true,
    }

    // Update the chats array, setting all other chats to inactive
    setChats((prevChats) =>
      prevChats
        .map((chat) => ({
          ...chat,
          isActive: false,
        }))
        .concat(newChat),
    )
  }

  // Function to set a chat as active
  const setActiveChat = (id: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) => ({
        ...chat,
        isActive: chat.id === id,
      })),
    )
  }

  // Context menu action functions
  const startEditingChat = (id: string) => {
    toast({
      title: "Rename chat",
      description: "This feature is not implemented yet.",
    })
  }

  const copyChatUrl = (id: string) => {
    const url = `${window.location.origin}/chat/${id}`
    navigator.clipboard.writeText(url)
    toast({
      title: "URL copied",
      description: "Chat URL copied to clipboard",
    })
  }

  const deleteChat = (id: string) => {
    const chatToDelete = chats.find((chat) => chat.id === id)

    setChats((prevChats) => {
      const filteredChats = prevChats.filter((chat) => chat.id !== id)

      // If we deleted the active chat and there are other chats, make the first one active
      if (prevChats.find((chat) => chat.id === id)?.isActive && filteredChats.length > 0) {
        filteredChats[0].isActive = true
      }

      return filteredChats
    })

    toast({
      title: "Chat deleted",
      description: chatToDelete ? `Deleted: ${chatToDelete.title}` : "Chat deleted",
      variant: "destructive",
    })
  }

  if (!sidebarOpen) {
    return null
  }

  return (
    <div className="w-80 h-full bg-zinc-100 dark:bg-zinc-900 flex flex-col items-center justify-between">
      <div className="w-full border-b py-2 px-3 border-zinc-300 dark:border-zinc-800 flex justify-between items-center">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Chat</h2>
        <button
          className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
          aria-label="New chat"
          onClick={createNewChat}
        >
          <FilePlus2 className="size-5 text-zinc-700 dark:text-zinc-300" />
        </button>
      </div>
      <div className="w-full h-full overflow-y-auto p-3 custom-scrollbar">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #a1a1a1;
          }
          
          /* Dark mode scrollbar */
          .dark .custom-scrollbar::-webkit-scrollbar-track {
            background: #18181b; /* This is the exact color for bg-zinc-900 */
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #52525b;
            border-radius: 4px;
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #71717a;
          }
        `}</style>
        {chats.length > 0 && (
          <div className="space-y-1">
            {chats.map((chat) => (
              <ContextMenu
                key={chat.id}
                onOpenChange={(open) => {
                  if (open) {
                    setContextMenuOpenForId(chat.id)
                  } else if (contextMenuOpenForId === chat.id) {
                    setContextMenuOpenForId(null)
                  }
                }}
              >
                <ContextMenuTrigger>
                  <div
                    className={`p-2 rounded-lg cursor-pointer ${
                      chat.isActive
                        ? "bg-zinc-300 dark:bg-zinc-800" // Darker background for active chat in light mode
                        : contextMenuOpenForId === chat.id
                          ? "bg-zinc-200 dark:bg-zinc-700" // Darker background for context menu open in light mode
                          : "hover:bg-zinc-200 dark:hover:bg-zinc-800" // Matching hover state with context menu open
                    }`}
                    onClick={() => setActiveChat(chat.id)}
                  >
                    <p className="text-sm text-zinc-900 dark:text-zinc-100 truncate">{chat.title}</p>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-52">
                  <ContextMenuItem className="cursor-pointer" onClick={() => startEditingChat(chat.id)}>
                    Rename
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem className="cursor-pointer" onClick={() => copyChatUrl(chat.id)}>
                    Copy chat URL
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem className="cursor-pointer" onClick={() => startEditingChat(chat.id)}>
                    Export
                    <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Import",
                        description: "This feature is not implemented yet.",
                      })
                    }}
                  >
                    Import
                    <ContextMenuShortcut>⌘I</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Clear models",
                        description: "This feature is not implemented yet.",
                      })
                    }}
                  >
                    Clear models
                    <ContextMenuShortcut>⌘M</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Import character",
                        description: "This feature is not implemented yet.",
                      })
                    }}
                  >
                    Import character
                    <ContextMenuShortcut>⌘H</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem
                    className="cursor-pointer text-red-500 dark:text-red-400"
                    onClick={() => deleteChat(chat.id)}
                  >
                    Delete
                    <ContextMenuShortcut>⌫</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

