'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { login, register, adminLogin } from "@/lib/actions"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState({
    login: false,
    register: false,
    admin: false
  })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(prev => ({ ...prev, login: true }))
    setError(null)
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    try {
      await login(email, password)
      toast({
        title: "Login successful",
        description: "Welcome back! Redirecting...",
      })
      router.refresh()
      setTimeout(() => {
        const redirect = searchParams.get("redirectedFrom") || "/"
        router.push(redirect)
      }, 1200)
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.message || "Invalid credentials",
        variant: "destructive",
      })
      setError(err.message || "Login failed")
    } finally {
      setIsLoading(prev => ({ ...prev, login: false }))
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoading(prev => ({ ...prev, register: true }))
      setError(null)
      const formData = new FormData(e.currentTarget)
      const name = formData.get('name') as string
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      await register(email, password, name)
      router.refresh() // Refresh the page to update auth state
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(prev => ({ ...prev, register: false }))
    }
  }

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoading(prev => ({ ...prev, admin: true }))
      setError(null)
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      await adminLogin(email, password)
      router.refresh() // Refresh the page to update auth state
      router.push('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Admin login failed')
    } finally {
      setIsLoading(prev => ({ ...prev, admin: false }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to PolitiWiki</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      disabled={isLoading.login}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      disabled={isLoading.login}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading.login}>
                    {isLoading.login ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      disabled={isLoading.register}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      disabled={isLoading.register}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      required
                      disabled={isLoading.register}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading.register}>
                    {isLoading.register ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      'Register'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Admin Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter admin email"
                      required
                      disabled={isLoading.admin}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter admin password"
                      required
                      disabled={isLoading.admin}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading.admin}>
                    {isLoading.admin ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      'Login as Admin'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 