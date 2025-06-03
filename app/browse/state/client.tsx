'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from "next/link"
import { Politician } from '@/lib/types'

interface BrowseByStateClientProps {
  politicians: Politician[]
}

export function BrowseByStateClient({ politicians }: BrowseByStateClientProps) {
  // Group politicians by region
  const politiciansByRegion = politicians.reduce((acc, politician) => {
    const region = politician.region || 'Other'
    if (!acc[region]) {
      acc[region] = []
    }
    acc[region].push(politician)
    return acc
  }, {} as Record<string, Politician[]>)

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Browse Politicians by State</h1>
      <SearchPoliticians politicians={politicians} />
      <div className="space-y-8">
        {Object.entries(politiciansByRegion).map(([region, politicians]) => (
          <div key={region}>
            <h2 className="text-2xl font-semibold mb-4">{region}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {politicians.map((politician) => (
                <Link key={politician.id} href={`/politician/${politician.id}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={politician.image_url || undefined} alt={politician.name} />
                          <AvatarFallback>{politician.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{politician.name}</h3>
                          <p className="text-sm text-muted-foreground">{politician.office}</p>
                          <Badge variant="secondary" className="mt-1">{politician.party}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SearchPoliticians({ politicians }: { politicians: Politician[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Politician[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const results = politicians.filter(politician => 
      politician.name.toLowerCase().includes(query.toLowerCase()) ||
      politician.office.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(results)
  }

  return (
    <div className="mb-8">
      <div className="relative">
        <Label htmlFor="search" className="sr-only">Search politicians</Label>
        <Input
          id="search"
          type="search"
          placeholder="Search by name or office..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((politician) => (
            <Link key={politician.id} href={`/politician/${politician.id}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={politician.image_url || undefined} alt={politician.name} />
                      <AvatarFallback>{politician.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{politician.name}</h3>
                      <p className="text-sm text-muted-foreground">{politician.office}</p>
                      <Badge variant="secondary" className="mt-1">{politician.party}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 