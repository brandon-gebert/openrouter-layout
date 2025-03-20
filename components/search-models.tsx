"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

// Define types for our data structure
type ModelItem = {
  provider: string
  name: string
  isFree: boolean
}

type ModelGroup = {
  month: string
  year: string
  models: ModelItem[]
}

// Parse the model data
const modelData: ModelGroup[] = [
  {
    month: "March",
    year: "2025",
    models: [
      { provider: "Mistral", name: "Mistral Small 3.124B", isFree: false },
      { provider: "OlympicCoder", name: "OlympicCoder 7B", isFree: true },
      { provider: "OlympicCoder", name: "OlympicCoder 32B", isFree: true },
      { provider: "SteelSkull", name: "L.3.3 Electra R1 70B", isFree: false },
      { provider: "AllenAI", name: "Olmo 2 32B Instruct", isFree: false },
      { provider: "Google", name: "Gemma 3 1B", isFree: true },
      { provider: "Google", name: "Gemma 3 4B", isFree: true },
      { provider: "Google", name: "Gemma 3 12B", isFree: true },
      { provider: "AI21", name: "Jamba 1.6 Large", isFree: false },
      { provider: "AI21", name: "Jamba Mini 1.6", isFree: false },
      { provider: "Cohere", name: "Command A", isFree: false },
      { provider: "OpenAI", name: "GPT-4o-mini Search Preview", isFree: false },
      { provider: "OpenAI", name: "GPT-4o Search Preview", isFree: false },
      { provider: "Swallow", name: "Llama 3.1 Swallow 70B Instruct", isFree: false },
      { provider: "Reka", name: "Flash 3", isFree: true },
      { provider: "Google", name: "Gemma 3 27B", isFree: true },
      { provider: "Google", name: "Gemma 3 27B", isFree: false },
      { provider: "TheDrummer", name: "Anubis Pro 105B V1", isFree: false },
      { provider: "LatitudeGames", name: "Wayfarer Large 70B", isFree: false },
      { provider: "TheDrummer", name: "Skyfall 36B V2", isFree: false },
      { provider: "Microsoft", name: "Phi 4 Multimodal Instruct", isFree: false },
      { provider: "Perplexity", name: "Sonar Reasoning Pro", isFree: false },
      { provider: "Perplexity", name: "Sonar Pro", isFree: false },
      { provider: "Perplexity", name: "Sonar Deep Research", isFree: false },
      { provider: "DeepSeek", name: "DeepSeek R1 Zero", isFree: true },
      { provider: "Qwen", name: "QwQ 32B", isFree: true },
      { provider: "Qwen", name: "QwQ 32B", isFree: false },
      { provider: "Qwen", name: "Qwen2.5 32B Instruct", isFree: false },
    ],
  },
  {
    month: "February",
    year: "2025",
    models: [
      { provider: "Moonshot AI", name: "Moonlight 16B A3B Instruct", isFree: false },
      { provider: "Nous", name: "DeepHermes 3 Llama 3 8B Pro", isFree: false },
      { provider: "OpenAI", name: "GPT-4.5 (Preview)", isFree: false },
      { provider: "Google", name: "Gemini 2.0 Flash Lite", isFree: false },
      { provider: "Anthropic", name: "Claude 3.7 Sonnet (self-)", isFree: false },
      { provider: "Anthropic", name: "Claude 3.7 Sonnet", isFree: false },
      { provider: "Anthropic", name: "Claude 3.7 Sonnet (thinking)", isFree: false },
      { provider: "Perplexity", name: "R1 1776", isFree: false },
      { provider: "Mistral", name: "Saba", isFree: false },
      { provider: "Dolphin", name: "Dolphin3.0 R1 Mistral 24B", isFree: true },
      { provider: "Dolphin", name: "Dolphin3.0 Mistral 24B", isFree: true },
      { provider: "Llama", name: "Llama Guard 3 8B", isFree: false },
      { provider: "OpenAI", name: "o3 Mini High", isFree: false },
      { provider: "Llama", name: "Llama 3.1 Tulu 3 405B", isFree: false },
      { provider: "DeepSeek", name: "R1 Distill Llama 8B", isFree: false },
      { provider: "Google", name: "Gemini Flash 2.0", isFree: false },
      { provider: "Google", name: "Gemini Flash Lite 2.0 Preview", isFree: false },
      { provider: "Google", name: "Gemini Pro 2.0 Experimental", isFree: false },
      { provider: "Qwen", name: "Qwen VL Plus", isFree: false },
      { provider: "AionLabs", name: "Aion-1.0", isFree: false },
      { provider: "AionLabs", name: "Aion-1.0-Mini", isFree: false },
      { provider: "AionLabs", name: "Aion-RP 1.0 (8B)", isFree: false },
      { provider: "Qwen", name: "Qwen VL Max", isFree: false },
      { provider: "Qwen", name: "Qwen-Turbo", isFree: false },
      { provider: "Qwen", name: "Qwen2.5 VL 72B Instruct", isFree: true },
      { provider: "Qwen", name: "Qwen2.5 VL 72B Instruct", isFree: false },
      { provider: "Qwen", name: "Qwen-Plus", isFree: false },
      { provider: "Qwen", name: "Qwen-Max", isFree: false },
    ],
  },
  {
    month: "January",
    year: "2025",
    models: [
      { provider: "OpenAI", name: "o3 Mini", isFree: false },
      { provider: "DeepSeek", name: "R1 Distill Qwen 1.5B", isFree: false },
      { provider: "Mistral", name: "Mistral Small 3", isFree: true },
      { provider: "Mistral", name: "Mistral Small 3", isFree: false },
      { provider: "DeepSeek", name: "R1 Distill Qwen 32B", isFree: true },
      { provider: "DeepSeek", name: "R1 Distill Qwen 32B", isFree: false },
      { provider: "DeepSeek", name: "R1 Distill Qwen 14B", isFree: true },
      { provider: "DeepSeek", name: "R1 Distill Qwen 14B", isFree: false },
      { provider: "Perplexity", name: "Sonar Reasoning", isFree: false },
      { provider: "Perplexity", name: "Sonar", isFree: false },
      { provider: "Liquid", name: "LFM 7B", isFree: false },
      { provider: "Liquid", name: "LFM 3B", isFree: false },
      { provider: "DeepSeek", name: "R1 Distill Llama 70B", isFree: true },
      { provider: "DeepSeek", name: "R1 Distill Llama 70B", isFree: false },
      { provider: "Google", name: "Gemini 2.0 Flash Thinking E", isFree: false },
      { provider: "DeepSeek", name: "R1", isFree: true },
      { provider: "DeepSeek", name: "R1", isFree: false },
      { provider: "Rogue Rose", name: "103B v0.2", isFree: true },
      { provider: "Rogue Rose", name: "103B v0.2", isFree: false },
      { provider: "MiniMax", name: "MiniMax-01", isFree: false },
      { provider: "Mistral", name: "Codestral 2501", isFree: false },
      { provider: "Microsoft", name: "Phi 4", isFree: false },
      { provider: "Sao10K", name: "Llama 3.1 70B Hanami x1", isFree: false },
    ],
  },
]

type SearchModelsProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModels({ isOpen, onClose }: SearchModelsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const commandListRef = useRef<HTMLDivElement>(null)

  // Filter models based on search query
  const filteredModels = modelData.flatMap((group) => {
    const filteredGroupModels = group.models.filter((model) => {
      const fullModelName = `${model.provider}: ${model.name}`.toLowerCase()
      return fullModelName.includes(searchQuery.toLowerCase())
    })

    if (filteredGroupModels.length === 0) return []

    return [
      {
        month: group.month,
        year: group.year,
        models: filteredGroupModels,
      },
    ]
  })

  // Calculate total number of models after filtering
  const totalFilteredModels = filteredModels.reduce((acc, group) => acc + group.models.length, 0)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % totalFilteredModels)
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + totalFilteredModels) % totalFilteredModels)
          break
        case "Enter":
          // Handle selection
          console.log("Selected model:", getSelectedModel())
          onClose()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, totalFilteredModels, onClose])

  // Scroll selected item into view
  useEffect(() => {
    if (commandListRef.current) {
      const selectedElement = commandListRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

  // Get the currently selected model
  const getSelectedModel = () => {
    let currentIndex = 0
    for (const group of filteredModels) {
      for (const model of group.models) {
        if (currentIndex === selectedIndex) {
          return `${model.provider}: ${model.name}`
        }
        currentIndex++
      }
    }
    return null
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with gaussian blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Command palette */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden mt-[-5vh]">
        {/* Search input */}
        <div className="flex items-center border-b border-zinc-200 dark:border-zinc-700 p-4">
          <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-3" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search models..."
            className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSelectedIndex(0)
            }}
          />
          <button onClick={onClose} className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          </button>
        </div>

        {/* Command list */}
        <div ref={commandListRef} className="max-h-[60vh] overflow-y-auto custom-scrollbar">
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
          {filteredModels.length > 0 ? (
            filteredModels.map((group, groupIndex) => (
              <div key={`${group.month}-${group.year}`} className="py-2">
                <div className="px-4 py-1 flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {group.month} {group.year}
                  </span>
                </div>

                {group.models.map((model, modelIndex) => {
                  // Calculate the absolute index across all groups
                  let absoluteIndex = 0
                  for (let i = 0; i < groupIndex; i++) {
                    absoluteIndex += filteredModels[i].models.length
                  }
                  absoluteIndex += modelIndex

                  return (
                    <div
                      key={`${model.provider}-${model.name}-${modelIndex}`}
                      data-index={absoluteIndex}
                      className={cn(
                        "px-4 py-2 flex items-center cursor-pointer rounded-md transition-colors",
                        absoluteIndex === selectedIndex
                          ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 focus:bg-zinc-300 dark:focus:bg-zinc-800 focus:text-zinc-900 dark:focus:text-zinc-100 focus:outline-none active:bg-zinc-300 dark:active:bg-zinc-800",
                      )}
                      onClick={() => {
                        console.log("Selected:", `${model.provider}: ${model.name}`)
                        onClose()
                      }}
                      tabIndex={0}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">{model.provider}:</span>
                          <span className="ml-1 text-zinc-700 dark:text-zinc-300">{model.name}</span>
                        </div>
                      </div>
                      {model.isFree && (
                        <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
                          Free
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-zinc-500 dark:text-zinc-400">
              No models found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

