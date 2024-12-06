'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import ThemeToggle from "./ThemeToggle"
import { Toaster } from "@/components/ui/sonner"
import useAuth from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState(false)
  const { data } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setClient(true)
  }, [])

  useEffect(() => {
    if (client) {
      if (!data && (pathname !== '/login' && pathname !== '/register')) {
        router.push('/login')
      }
      if (data && (pathname === '/login' || pathname === '/register')) {
        router.push('/chat');
      }
    }
  }, [data, client, pathname, router])

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