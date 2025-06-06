"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  googleAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      // For demo purposes, we'll check if there's a user in localStorage
      // In a real app, you would validate the session with your backend
      const storedUser = localStorage.getItem("user")

      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // For demo purposes, we'll just set a mock user
      // In a real app, you would authenticate with your backend
      const mockUser = {
        id: "1",
        name: "Sarah Johnson",
        email,
        avatar: "/placeholder.svg?height=100&width=100",
      }

      // Set user in state and localStorage
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      // Set a cookie to indicate the user is authenticated
      document.cookie = "authenticated=true; path=/; max-age=86400"

      router.push("/account")
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      // For demo purposes, we'll just set a mock user
      // In a real app, you would register with your backend
      const mockUser = {
        id: "1",
        name,
        email,
        avatar: "/placeholder.svg?height=100&width=100",
      }

      // Set user in state and localStorage
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      // Set a cookie to indicate the user is authenticated
      document.cookie = "authenticated=true; path=/; max-age=86400"

      router.push("/account")
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    // Clear user from state and localStorage
    setUser(null)
    localStorage.removeItem("user")

    // Remove the authenticated cookie
    document.cookie = "authenticated=; path=/; max-age=0"

    router.push("/")
  }

  const googleAuth = async () => {
    setIsLoading(true)

    try {
      // For demo purposes, we'll just set a mock user
      // In a real app, you would authenticate with Google OAuth
      const mockUser = {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "/placeholder.svg?height=100&width=100",
      }

      // Set user in state and localStorage
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      // Set a cookie to indicate the user is authenticated
      document.cookie = "authenticated=true; path=/; max-age=86400"

      router.push("/account")
    } catch (error) {
      console.error("Google auth error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, googleAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

