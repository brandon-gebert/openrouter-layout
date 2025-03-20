"use client"
import { useSidebar } from "@/context/sidebar-context"

export default function RankingsSidebar() {
  const { sidebarOpen } = useSidebar()

  if (!sidebarOpen) {
    return null
  }

  return (
    <div className="w-80 h-full bg-zinc-100 dark:bg-zinc-900 flex flex-col overflow-hidden">
      <div className="w-full border-b py-3 px-3 border-zinc-300 dark:border-zinc-800 flex justify-between items-center">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Rankings</h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
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

        {/* Placeholder content for the rankings sidebar */}
        <div className="p-4">
          <div className="flex items-center justify-center h-[60vh] text-zinc-500 dark:text-zinc-400 text-center">
            <p>Rankings content will be available soon.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

