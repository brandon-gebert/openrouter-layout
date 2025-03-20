"use client"

import { useState } from "react"
import { Search, ChevronDown, Layers, DollarSign, Layers2, Box, Tag, Code, Check, Building } from "lucide-react"
import { useSidebar } from "@/context/sidebar-context"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export default function ModelSidebar() {
  const { sidebarOpen } = useSidebar()
  const { toast } = useToast()

  const [modality, setModality] = useState("text-to-text")
  const [contextLength, setContextLength] = useState(4)
  const [pricing, setPricing] = useState<[number, number]>([0, 5])
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAllModels, setShowAllModels] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllParameters, setShowAllParameters] = useState(false)
  const [showAllProviders, setShowAllProviders] = useState(false)
  const [selectedParameters, setSelectedParameters] = useState<string[]>([])
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])

  const models = [
    { id: "gpt", name: "GPT" },
    { id: "claude", name: "Claude" },
    { id: "gemini", name: "Gemini" },
    { id: "grok", name: "Grok" },
    { id: "cohere", name: "Cohere" },
    { id: "nova", name: "Nova" },
    { id: "qwen", name: "Qwen" },
    { id: "yi", name: "Yi" },
    { id: "deepseek", name: "DeepSeek" },
    { id: "mistral", name: "Mistral" },
    { id: "llama2", name: "Llama2" },
    { id: "llama3", name: "Llama3" },
    { id: "rwkv", name: "RWKV" },
    { id: "router", name: "Router" },
    { id: "media", name: "Media" },
    { id: "other", name: "Other" },
    { id: "palm", name: "PaLM" },
  ]

  const categories = [
    { id: "roleplay", name: "Roleplay", color: "bg-red-500" },
    { id: "programming", name: "Programming", color: "bg-orange-500" },
    { id: "marketing", name: "Marketing", color: "bg-amber-500" },
    { id: "marketing-seo", name: "Marketing/Seo", color: "bg-lime-500" },
    { id: "technology", name: "Technology", color: "bg-green-500" },
    { id: "science", name: "Science", color: "bg-emerald-500" },
    { id: "translation", name: "Translation", color: "bg-teal-500" },
    { id: "legal", name: "Legal", color: "bg-sky-500" },
    { id: "finance", name: "Finance", color: "bg-blue-500" },
    { id: "health", name: "Health", color: "bg-indigo-500" },
    { id: "trivia", name: "Trivia", color: "bg-violet-500" },
    { id: "academia", name: "Academia", color: "bg-purple-500" },
  ]

  const parameters = [
    { id: "tools", name: "tools" },
    { id: "temperature", name: "temperature" },
    { id: "top_p", name: "top_p" },
    { id: "top_k", name: "top_k" },
    { id: "min_p", name: "min_p" },
    { id: "top_a", name: "top_a" },
    { id: "frequency_penalty", name: "frequency_penalty" },
    { id: "presence_penalty", name: "presence_penalty" },
    { id: "repetition_penalty", name: "repetition_penalty" },
    { id: "max_tokens", name: "max_tokens" },
    { id: "max_price", name: "max_price" },
    { id: "logit_bias", name: "logit_bias" },
    { id: "logprobs", name: "logprobs" },
    { id: "top_logprobs", name: "top_logprobs" },
    { id: "seed", name: "seed" },
    { id: "response_format", name: "response_format" },
    { id: "structured_outputs", name: "structured_outputs" },
    { id: "stop", name: "stop" },
    { id: "include_reasoning", name: "include_reasoning" },
    { id: "reasoning", name: "reasoning" },
  ]

  const providers = [
    { id: "ai21", name: "AI21" },
    { id: "aionlabs", name: "AionLabs" },
    { id: "alibaba", name: "Alibaba" },
    { id: "amazon-bedrock", name: "Amazon Bedrock" },
    { id: "anthropic", name: "Anthropic" },
    { id: "avian", name: "Avian.io" },
    { id: "azure", name: "Azure" },
    { id: "chutes", name: "Chutes" },
    { id: "cloudflare", name: "Cloudflare" },
    { id: "cohere", name: "Cohere" },
    { id: "crusoe", name: "Crusoe" },
    { id: "deepinfra", name: "DeepInfra" },
    { id: "deepseek", name: "DeepSeek" },
    { id: "featherless", name: "Featherless" },
    { id: "fireworks", name: "Fireworks" },
    { id: "friendli", name: "Friendli" },
    { id: "google-ai-studio", name: "Google AI Studio" },
    { id: "google-vertex", name: "Google Vertex" },
    { id: "groq", name: "Groq" },
    { id: "hyperbolic", name: "Hyperbolic" },
    { id: "hyperbolic-quantized", name: "Hyperbolic (quantized)" },
    { id: "inference-net", name: "inference.net" },
    { id: "infermatic", name: "Infermatic" },
    { id: "inflection", name: "Inflection" },
    { id: "kluster-ai", name: "kluster.ai" },
    { id: "lambda", name: "Lambda" },
    { id: "lepton", name: "Lepton" },
    { id: "liquid", name: "Liquid" },
    { id: "mancer", name: "Mancer" },
    { id: "mancer-private", name: "Mancer (private)" },
    { id: "minimax", name: "Minimax" },
    { id: "mistral", name: "Mistral" },
    { id: "ncompass", name: "NCompass" },
    { id: "nebius-ai-studio", name: "Nebius AI Studio" },
    { id: "nineteen", name: "Nineteen" },
    { id: "novitai", name: "NovitAI" },
    { id: "openai", name: "OpenAI" },
    { id: "parasail", name: "Parasail" },
    { id: "perplexity", name: "Perplexity" },
    { id: "reflection", name: "Reflection" },
    { id: "sambanova", name: "SambaNova" },
    { id: "sf-compute", name: "SF Compute" },
    { id: "targon", name: "Targon" },
    { id: "together", name: "Together" },
    { id: "together-lite", name: "Together (lite)" },
    { id: "ubicloud", name: "Ubicloud" },
    { id: "xai", name: "xAI" },
  ]

  const visibleModels = showAllModels ? models : models.slice(0, 3)
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 3)
  const visibleParameters = showAllParameters ? parameters : parameters.slice(0, 3)
  const visibleProviders = showAllProviders ? providers : providers.slice(0, 3)

  if (!sidebarOpen) {
    return null
  }

  return (
    <div className="w-80 h-full bg-zinc-100 dark:bg-zinc-900 flex flex-col">
      <div className="w-full border-b py-2 px-3 border-zinc-300 dark:border-zinc-800 flex justify-between items-center">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Models</h2>
        <button
          className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
          aria-label="Search models"
          onClick={() => {
            toast({
              title: "Search models",
              description: "This feature is not implemented yet.",
            })
          }}
        >
          <Search className="size-5 text-zinc-700 dark:text-zinc-300" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 custom-scrollbar">
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

          /* Add this to the style jsx section */
          .custom-scrollbar .slider-track {
            background-color: #d4d4d8 !important; /* A darker shade for light mode */
          }
          .dark .custom-scrollbar .slider-track {
            background-color: #27272a !important; /* Keep dark mode as is */
          }
        `}</style>
        <Accordion
          type="multiple"
          defaultValue={["modality", "context", "pricing", "series", "category", "parameters", "providers"]}
          className="space-y-4"
        >
          <AccordionItem value="modality" className="border-b-0">
            <AccordionTrigger className="py-2.5 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-sm border border-border p-0.5">
                  <Box className="size-full text-primary/70" />
                </div>
                <span className="text-sm font-medium">Modality</span>
              </div>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="pt-3 pb-1">
              <RadioGroup value={modality} onValueChange={setModality} className="flex flex-col gap-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="text-to-text" id="text-to-text" />
                  <label htmlFor="text-to-text" className="text-sm font-normal cursor-pointer">
                    Text to Text
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="text-image-to-text" id="text-image-to-text" />
                  <label htmlFor="text-image-to-text" className="text-sm font-normal cursor-pointer">
                    Text & Image to Text
                  </label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="context" className="border-b-0">
            <AccordionTrigger className="py-2.5 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-sm border border-border p-0.5">
                  <Layers2 className="size-full text-primary/70" />
                </div>
                <span className="text-sm font-medium">Context length</span>
              </div>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2">
              <div className="space-y-5">
                <Slider
                  value={[contextLength]}
                  min={4}
                  max={1024}
                  step={1}
                  onValueChange={(value) => setContextLength(value[0])}
                  className="py-3"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>4K</span>
                  <span>64K</span>
                  <span>1M</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pricing" className="border-b-0">
            <AccordionTrigger className="py-2.5 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-sm border border-border p-0.5">
                  <DollarSign className="size-full text-primary/70" />
                </div>
                <span className="text-sm font-medium">Prompt pricing</span>
              </div>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2">
              <div className="space-y-5">
                <Slider
                  value={[pricing[0], pricing[1]]}
                  min={0}
                  max={10}
                  step={0.1}
                  onValueChange={(value) => setPricing([value[0], value[1]])}
                  className="py-3"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>FREE</span>
                  <span className="text-primary">
                    ${pricing[0]} - ${pricing[1]}
                  </span>
                  <span>$10+</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="series" className="border-b-0">
            <AccordionTrigger className="py-2.5 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-sm border border-border p-0.5">
                  <Layers className="size-full text-primary/70" />
                </div>
                <span className="text-sm font-medium">Series</span>
              </div>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="pt-3 pb-1">
              <div className="flex flex-col">
                {visibleModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id === selectedModel ? null : model.id)}
                    className={cn(
                      "flex items-center space-x-3 text-left rounded-md py-1.5 px-2 transition-colors",
                      selectedModel === model.id
                        ? "bg-zinc-300 dark:bg-zinc-800 text-foreground"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="text-sm font-normal">{model.name}</span>
                  </button>
                ))}
                {!showAllModels ? (
                  <button
                    onClick={() => setShowAllModels(true)}
                    className="text-sm text-muted-foreground hover:text-foreground mt-1 pl-2"
                  >
                    More...
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAllModels(false)}
                    className="text-sm text-muted-foreground hover:text-foreground mt-1 pl-2"
                  >
                    Less
                  </button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="category" className="border-b-0">
            <AccordionTrigger className="py-2.5 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-sm border border-border p-0.5">
                  <Tag className="size-full text-primary/70" />
                </div>
                <span className="text-sm font-medium">Category</span>
              </div>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="pt-3 pb-1">
              <div className="flex flex-col">
                {visibleCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                    className={cn(
                      "flex items-center space-x-3 text-left rounded-md py-1.5 px-2 transition-colors",
                      selectedCategory === category.id
                        ? "bg-zinc-300 dark:bg-zinc-800 text-foreground"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <div className={cn("size-3 rounded-full", category.color)} />
                    <span className="text-sm font-normal">{category.name}</span>
                  </button>
                ))}
                {!showAllCategories ? (
                  <button
                    onClick={() => setShowAllCategories(true)}
                    className="text-sm text-muted-foreground hover:text-foreground mt-1 pl-2"
                  >
                    More...
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAllCategories(false)}
                    className="text-sm text-muted-foreground hover:text-foreground mt-1 pl-2"
                  >
                    Less
                  </button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="parameters" className="border-b-0">
            <AccordionTrigger className="py-2.5 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-sm border border-border p-0.5">
                  <Code className="size-full text-primary/70" />
                </div>
                <span className="text-sm font-medium">Supported Parameters</span>
              </div>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="pt-3 pb-1">
              <div className="flex flex-col">
                {visibleParameters.map((param) => (
                  <button
                    key={param.id}
                    onClick={() => {
                      setSelectedParameters((prev) =>
                        prev.includes(param.id) ? prev.filter((id) => id !== param.id) : [...prev, param.id],
                      )
                    }}
                    className={cn(
                      "flex items-center justify-between text-left rounded-md py-1.5 px-2 transition-colors",
                      selectedParameters.includes(param.id)
                        ? "bg-zinc-300 dark:bg-zinc-800 text-foreground"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="text-sm font-normal">{param.name}</span>
                    {selectedParameters.includes(param.id) && <Check className="size-4 text-primary" />}
                  </button>
                ))}
                {!showAllParameters ? (
                  <button
                    onClick={() => setShowAllParameters(true)}
                    className="text-sm text-muted-foreground hover:text-foreground mt-1 pl-2"
                  >
                    More...
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAllParameters(false)}
                    className="text-sm text-muted-foreground hover:text-foreground mt-1 pl-2"
                  >
                    Less
                  </button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="providers" className="border-b-0">
            <AccordionTrigger className="py-2.5 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-sm border border-border p-0.5">
                  <Building className="size-full text-primary/70" />
                </div>
                <span className="text-sm font-medium">Providers</span>
              </div>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="pt-3 pb-1">
              <div className="flex flex-col">
                {visibleProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => {
                      setSelectedProviders((prev) =>
                        prev.includes(provider.id) ? prev.filter((id) => id !== provider.id) : [...prev, provider.id],
                      )
                    }}
                    className={cn(
                      "flex items-center justify-between text-left rounded-md py-1.5 px-2 transition-colors",
                      selectedProviders.includes(provider.id)
                        ? "bg-zinc-300 dark:bg-zinc-800 text-foreground"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="text-sm font-normal">{provider.name}</span>
                    {selectedProviders.includes(provider.id) && <Check className="size-4 text-primary" />}
                  </button>
                ))}
                {!showAllProviders ? (
                  <button
                    onClick={() => setShowAllProviders(true)}
                    className="text-sm text-muted-foreground hover:text-foreground mt-1 pl-2"
                  >
                    More...
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAllProviders(false)}
                    className="text-sm text-muted-foreground hover:text-foreground mt-1 pl-2"
                  >
                    Less
                  </button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

