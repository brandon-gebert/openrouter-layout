"use client"

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  // Initialize state based on the class that was set in the layout script
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Sync the state with the actual theme when component mounts
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"))

    // Optional: Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      const hasThemePreference = localStorage.getItem("theme") !== null
      if (!hasThemePreference) {
        setIsDarkMode(e.matches)
        document.documentElement.classList.toggle("dark", e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode
    setIsDarkMode(newDarkModeState)

    if (newDarkModeState) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className="relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-500 transition-colors duration-200 ease-in-out focus:outline-none"
      role="switch"
      aria-checked={isDarkMode}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out ${
          isDarkMode ? "translate-x-4" : "translate-x-0"
        }`}
      ></span>
    </button>
  )
}

