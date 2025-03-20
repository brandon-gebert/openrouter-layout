"use client"

import { useCommand } from "@/context/command-context"
import SearchModels from "./search-models"

export default function CommandWrapper() {
  const { isCommandOpen, closeCommand } = useCommand()

  return <SearchModels isOpen={isCommandOpen} onClose={closeCommand} />
}

