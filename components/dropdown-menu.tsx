import { Settings, CreditCard, Activity, Key } from "lucide-react"
import ThemeToggle from "./theme-toggle"

export default function DropdownMenu() {
  return (
    <div className="absolute h-auto w-full sm:w-64 bg-white dark:bg-zinc-950 bottom-0 left-0 sm:left-4 sm:bottom-12 rounded-t-xl sm:rounded-lg border border-zinc-300 dark:border-zinc-800 flex flex-col divide-y divide-zinc-300 dark:divide-zinc-700 z-10">
      <div className="flex flex-col p-1.5">
        <button className="text-black dark:text-white flex items-center justify-start p-2 text-sm gap-x-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg">
          <Settings className="size-4 text-zinc-950 dark:text-zinc-100" />
          Settings
        </button>
        <button className="text-black dark:text-white flex items-center justify-start p-2 text-sm gap-x-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg">
          <CreditCard className="size-4 text-zinc-950 dark:text-zinc-100" />
          Credits
        </button>
        <button className="text-black dark:text-white flex items-center justify-start p-2 text-sm gap-x-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg">
          <Activity className="size-4 text-zinc-950 dark:text-zinc-100" />
          Activity
        </button>
        <button className="text-black dark:text-white flex items-center justify-start p-2 text-sm gap-x-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg">
          <Key className="size-4 text-zinc-950 dark:text-zinc-100" />
          API Keys
        </button>
      </div>

      <div className="flex flex-col p-1.5">
        <button className="text-black dark:text-white flex items-center justify-start p-2 text-sm gap-x-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg">
          About
        </button>
        <button className="text-black dark:text-white flex items-center justify-start p-2 text-sm gap-x-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg">
          Docs
        </button>
        <button className="text-black dark:text-white flex items-center justify-start p-2 text-sm gap-x-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg">
          Status
        </button>
        <button className="text-black dark:text-white flex items-center justify-start p-2 text-sm gap-x-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg">
          Terms
        </button>
        <button className="text-black dark:text-white flex items-center justify-start p-2 text-sm gap-x-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg">
          Privacy
        </button>
      </div>

      <div className="flex flex-row items-center justify-between p-3">
        <div className="text-black dark:text-white text-sm">Theme</div>
        <ThemeToggle />
      </div>

      <div className="flex flex-col p-1.5">
        <button className="text-black dark:text-white flex items-center justify-start p-2 text-sm gap-x-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg">
          <Settings className="size-4 text-zinc-950 dark:text-zinc-100" />
          Sign out
        </button>
      </div>
    </div>
  )
}

