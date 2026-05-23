'use client'

import { useEffect, useState } from 'react'
import { Bell, Search, ChevronDown, SunMoon, CheckCheck, Mail, CalendarDays, MessageSquareText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

interface HeaderProps {
  title: string
  description?: string
}

export function Header({ title, description }: HeaderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    setThemeState(storedTheme)
  }, [])

  const applyTheme = (nextTheme: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    document.documentElement.classList.toggle('light', nextTheme === 'light')
    window.localStorage.setItem('theme', nextTheme)
    setThemeState(nextTheme)
  }
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 lg:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="ml-12 lg:ml-0">
        <h1 className="text-lg lg:text-xl font-semibold text-foreground">{title}</h1>
        {description && (
          <p className="hidden sm:block text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-48 lg:w-64 pl-9 bg-secondary/50 border-transparent focus:border-border"
          />
        </div>

        {/* Mobile Search Button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/campaigns')}>
              <Mail className="mr-2 h-4 w-4" />
              New campaign sent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/analytics')}>
              <CalendarDays className="mr-2 h-4 w-4" />
              Weekly report is ready
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/contacts')}>
              <MessageSquareText className="mr-2 h-4 w-4" />
              New contact activity
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast({ title: 'Notifications', description: 'Marked all as read (mock).' })}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all as read
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <SunMoon className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Change theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => applyTheme('light')}>
              Light {theme === 'light' ? '•' : ''}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyTheme('dark')}>
              Dark {theme === 'dark' ? '•' : ''}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user.jpg" alt="User" />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">John Doe</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
              <ChevronDown className="hidden lg:block h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: 'Billing', description: 'Open billing portal (mock).' })}>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => toast({ title: 'Logged out', description: 'You have been logged out (mock).' })}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
