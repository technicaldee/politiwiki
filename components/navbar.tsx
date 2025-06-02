"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Input } from "@/components/ui/input"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-700 dark:text-green-500">
                Politi<span className="text-black dark:text-white">Wiki</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search politicians..." className="pl-8" />
            </div>
            <Link href="/browse/state" className="hover:text-green-600">
              Browse by State
            </Link>
            <Link href="/browse/office" className="hover:text-green-600">
              Browse by Office
            </Link>
            <Link href="/about" className="hover:text-green-600">
              About
            </Link>
            <Link href="/submit">
              <Button variant="default" className="bg-green-700 hover:bg-green-800">
                Submit Info
              </Button>
            </Link>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search politicians..." className="pl-8" />
            </div>
            <div className="flex flex-col space-y-3 pt-3">
              <Link href="/browse/state" className="hover:text-green-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Browse by State
              </Link>
              <Link href="/browse/office" className="hover:text-green-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Browse by Office
              </Link>
              <Link href="/about" className="hover:text-green-600 py-2" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/submit" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-green-700 hover:bg-green-800">Submit Info</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
