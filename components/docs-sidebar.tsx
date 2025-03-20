"use client"

import {
  ChevronDown,
  ExternalLink,
  Rocket,
  HelpCircle,
  ClipboardList,
  Package,
  Settings,
  RefreshCw,
  FileText,
  Code,
  Wrench,
  BarChart,
  Globe,
  Key,
  Book,
  ListFilter,
  Lock,
  Timer,
  AlertTriangle,
  Cpu,
  Cloud,
  Lightbulb,
  Puzzle,
  MessageSquare,
  type LucideIcon,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import React from "react"
import { useSidebar } from "@/context/sidebar-context"

// Create a context to share the active item state
const DocsSidebarContext = React.createContext<{
  activeItem: string
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
}>({
  activeItem: "Quickstart",
  setActiveItem: () => {},
})

export default function DocsSidebar() {
  const { sidebarOpen } = useSidebar()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "API Reference": false,
    "API Keys": false,
    Authentication: false,
  })
  const [activeItem, setActiveItem] = useState("Quickstart")

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (!sidebarOpen) {
    return null
  }

  return (
    <DocsSidebarContext.Provider value={{ activeItem, setActiveItem }}>
      <div className="w-80 h-full bg-zinc-100 dark:bg-zinc-900 flex flex-col overflow-hidden">
        <div className="w-full border-b py-3 px-3 border-zinc-300 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Documentation</h2>
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
          {/* Main Navigation */}
          <div className="px-3 py-2">
            <SectionHeader label="Overview" />
            <NavItem
              icon={Rocket}
              label="Quickstart"
              active={activeItem === "Quickstart"}
              onClick={() => setActiveItem("Quickstart")}
            />
            <NavItem icon={HelpCircle} label="FAQ" active={activeItem === "FAQ"} onClick={() => setActiveItem("FAQ")} />
            <NavItem
              icon={ClipboardList}
              label="Principles"
              active={activeItem === "Principles"}
              onClick={() => setActiveItem("Principles")}
            />
            <NavItem
              icon={Package}
              label="Models"
              active={activeItem === "Models"}
              onClick={() => setActiveItem("Models")}
            />
          </div>

          {/* Features Section */}
          <div className="mt-4 px-3 py-2">
            <SectionHeader label="Features" />
            <NavItem
              icon={Settings}
              label="Model Routing"
              active={activeItem === "Model Routing"}
              onClick={() => setActiveItem("Model Routing")}
            />
            <NavItem
              icon={RefreshCw}
              label="Provider Routing"
              active={activeItem === "Provider Routing"}
              onClick={() => setActiveItem("Provider Routing")}
            />
            <NavItem
              icon={FileText}
              label="Prompt Caching"
              active={activeItem === "Prompt Caching"}
              onClick={() => setActiveItem("Prompt Caching")}
            />
            <NavItem
              icon={Code}
              label="Structured Outputs"
              active={activeItem === "Structured Outputs"}
              onClick={() => setActiveItem("Structured Outputs")}
            />
            <NavItem
              icon={Wrench}
              label="Tool Calling"
              active={activeItem === "Tool Calling"}
              onClick={() => setActiveItem("Tool Calling")}
            />
            <NavItem
              icon={RefreshCw}
              label="Message Transforms"
              active={activeItem === "Message Transforms"}
              onClick={() => setActiveItem("Message Transforms")}
            />
            <NavItem
              icon={BarChart}
              label="Uptime Optimization"
              active={activeItem === "Uptime Optimization"}
              onClick={() => setActiveItem("Uptime Optimization")}
            />
            <NavItem
              icon={Globe}
              label="Web Search"
              active={activeItem === "Web Search"}
              onClick={() => setActiveItem("Web Search")}
            />
            <NavItem
              icon={Key}
              label="Provisioning API Keys"
              active={activeItem === "Provisioning API Keys"}
              onClick={() => setActiveItem("Provisioning API Keys")}
            />
          </div>

          {/* API Reference Section */}
          <div className="mt-4 px-3 py-2">
            <div
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection("API Reference")}
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <Code className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                </span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium text-sm">API Reference</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-zinc-700 dark:text-zinc-400 transition-transform",
                  expandedSections["API Reference"] ? "transform rotate-180" : "",
                )}
              />
            </div>

            {expandedSections["API Reference"] && (
              <div className="ml-1 mt-1">
                <NavItem
                  icon={Book}
                  label="Overview"
                  active={activeItem === "Overview"}
                  onClick={() => setActiveItem("Overview")}
                />
                <NavItem
                  icon={ListFilter}
                  label="Streaming"
                  active={activeItem === "Streaming"}
                  onClick={() => setActiveItem("Streaming")}
                />
                <NavItem
                  icon={Lock}
                  label="Authentication"
                  active={activeItem === "Authentication"}
                  onClick={() => setActiveItem("Authentication")}
                />
                <NavItem
                  icon={Settings}
                  label="Parameters"
                  active={activeItem === "Parameters"}
                  onClick={() => setActiveItem("Parameters")}
                />
                <NavItem
                  icon={Timer}
                  label="Limits"
                  active={activeItem === "Limits"}
                  onClick={() => setActiveItem("Limits")}
                />
                <NavItem
                  icon={AlertTriangle}
                  label="Errors"
                  active={activeItem === "Errors"}
                  onClick={() => setActiveItem("Errors")}
                />
                <ApiItem method="POST" label="Completion" />
                <ApiItem method="POST" label="Chat completion" />
                <ApiItem method="GET" label="Get a generation" />
                <ApiItem method="GET" label="List available models" />
                <ApiItem method="GET" label="List endpoints for a model" />
                <ApiItem method="GET" label="Get credits" />
                <ApiItem method="POST" label="Create a Coinbase charge" />

                <div className="mt-2">
                  <div
                    className="flex items-center justify-between cursor-pointer py-1"
                    onClick={() => toggleSection("Authentication")}
                  >
                    <span className="text-zinc-900 dark:text-zinc-100 text-sm">Authentication</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-zinc-700 dark:text-zinc-400 transition-transform",
                        expandedSections["Authentication"] ? "transform rotate-180" : "",
                      )}
                    />
                  </div>

                  {expandedSections["Authentication"] && (
                    <div className="ml-2 mt-1">
                      <ApiItem method="POST" label="Exchange authorization code for API key" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* API Keys Section */}
          <div className="mt-2 px-3 py-2">
            <div
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection("API Keys")}
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <Key className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                </span>
                <span className="text-zinc-900 dark:text-zinc-100 font-medium text-sm">API Keys</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-zinc-700 dark:text-zinc-400 transition-transform",
                  expandedSections["API Keys"] ? "transform rotate-180" : "",
                )}
              />
            </div>

            {expandedSections["API Keys"] && (
              <div className="ml-1 mt-1">
                <ApiItem method="GET" label="Get current API key" />
                <ApiItem method="GET" label="List API keys" />
                <ApiItem method="POST" label="Create API key" />
                <ApiItem method="GET" label="Get API key" />
                <ApiItem method="DEL" label="Delete API key" />
                <ApiItem method="PATCH" label="Update API key" />
              </div>
            )}
          </div>

          {/* Use Cases Section */}
          <div className="mt-2 px-3 py-2">
            <SectionHeader label="Use Cases" />
            <NavItem icon={Key} label="BYOK" active={activeItem === "BYOK"} onClick={() => setActiveItem("BYOK")} />
            <NavItem
              icon={Lock}
              label="Crypto API"
              active={activeItem === "Crypto API"}
              onClick={() => setActiveItem("Crypto API")}
            />
            <NavItem
              icon={Lock}
              label="OAuth PKCE"
              active={activeItem === "OAuth PKCE"}
              onClick={() => setActiveItem("OAuth PKCE")}
            />
            <NavItem
              icon={Cpu}
              label="MCP Servers"
              active={activeItem === "MCP Servers"}
              onClick={() => setActiveItem("MCP Servers")}
            />
            <NavItem
              icon={Cloud}
              label="For Providers"
              active={activeItem === "For Providers"}
              onClick={() => setActiveItem("For Providers")}
            />
            <NavItem
              icon={Lightbulb}
              label="Reasoning Tokens"
              active={activeItem === "Reasoning Tokens"}
              onClick={() => setActiveItem("Reasoning Tokens")}
            />
          </div>

          {/* Community Section */}
          <div className="mt-4 px-3 py-2">
            <SectionHeader label="Community" />
            <NavItem
              icon={Puzzle}
              label="Frameworks"
              active={activeItem === "Frameworks"}
              onClick={() => setActiveItem("Frameworks")}
            />
            <NavItem
              icon={MessageSquare}
              label="Discord"
              active={activeItem === "Discord"}
              onClick={() => setActiveItem("Discord")}
              externalLink
            />
          </div>
        </div>
      </div>
    </DocsSidebarContext.Provider>
  )
}

function SectionHeader({ label, icon }: { label: string; icon?: LucideIcon }) {
  return (
    <div className="flex items-center py-2">
      {icon && (
        <span className="mr-2">
          {React.createElement(icon, { className: "h-4 w-4 text-zinc-900 dark:text-zinc-100" })}
        </span>
      )}
      <span className="text-zinc-900 dark:text-zinc-100 font-medium text-sm">{label}</span>
    </div>
  )
}

function NavItem({
  icon,
  label,
  active = false,
  externalLink = false,
  onClick,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  externalLink?: boolean
  onClick?: () => void
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center py-1.5 px-2 rounded-md cursor-pointer text-left",
        "hover:bg-zinc-200 dark:hover:bg-zinc-800",
        active ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300",
        "focus:bg-zinc-300 dark:focus:bg-zinc-800 focus:text-zinc-900 dark:focus:text-zinc-100 focus:outline-none",
        "active:bg-zinc-300 dark:active:bg-zinc-800",
      )}
      onClick={onClick}
    >
      <span className="mr-2">{React.createElement(icon, { className: "h-4 w-4" })}</span>
      <span className="text-sm font-medium">{label}</span>
      {externalLink && <ExternalLink className="ml-auto h-3 w-3 text-zinc-500 dark:text-zinc-400" />}
    </button>
  )
}

function ApiItem({ method, label }: { method: string; label: string }) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "POST":
        return "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
      case "DEL":
        return "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100"
      case "PATCH":
        return "bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-100"
      default:
        return "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
    }
  }

  // Get access to the activeItem state and setActiveItem function from the parent component
  const { activeItem, setActiveItem } = React.useContext(DocsSidebarContext)
  const itemKey = `${method} ${label}`

  return (
    <button
      className={cn(
        "flex w-full items-center py-1.5 px-2 rounded-md cursor-pointer text-left",
        "text-zinc-700 dark:text-zinc-300",
        "hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100",
        "focus:bg-zinc-300 dark:focus:bg-zinc-800 focus:text-zinc-900 dark:focus:text-zinc-100 focus:outline-none",
        "active:bg-zinc-300 dark:active:bg-zinc-800",
        activeItem === itemKey ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" : "",
      )}
      onClick={() => setActiveItem(itemKey)}
    >
      <span className={`text-xs px-1.5 py-0.5 rounded mr-2 ${getMethodColor(method)}`}>{method}</span>
      <span className="text-sm">{label}</span>
    </button>
  )
}

