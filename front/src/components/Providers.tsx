'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import ThemeToggle from "./ThemeToggle"
import { Toaster } from "@/components/ui/sonner"

const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="fixed top-5 right-5">
        <ThemeToggle />
      </div>
      <Toaster />
      {children}
    </NextThemesProvider>
  )
}

export default Providers
