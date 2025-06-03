'use client'

import { useState, useEffect } from 'react'
import { getPoliticians } from "@/lib/actions"
import { createContribution } from "@/lib/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Politician } from "@/lib/types"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command"

export default function SubmitPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [politicians, setPoliticians] = useState<Politician[]>([])
  const [search, setSearch] = useState("");
  const [selectedPolitician, setSelectedPolitician] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        const data = await getPoliticians()
        setPoliticians(data)
      } catch (err) {
        setError('Failed to load politicians')
      }
    }
    fetchPoliticians()
  }, [])

  const filteredPoliticians = politicians.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.office.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setError(null)
      const formData = new FormData(e.currentTarget)
      await createContribution({
        politician_id: formData.get('politician_id') as string,
        type: formData.get('type') as any,
        title: formData.get('title') as string,
        details: formData.get('details') as string,
        source_url: formData.get('source_url') as string,
        source_date: formData.get('source_date') as string,
        status: 'pending'
      })
      router.push('/')
    } catch (err) {
      if (err instanceof Error && err.message === 'User must be authenticated') {
        router.push('/login')
      } else {
        setError(err instanceof Error ? err.message : 'Failed to submit information')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Submit Information</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Contribute to PolitiWiki</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="politician">Select Politician</Label>
                <div>
                  <button
                    type="button"
                    className="w-full border rounded-md px-3 py-2 text-left text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    onClick={() => setOpen(true)}
                    disabled={isLoading}
                  >
                    {selectedPolitician
                      ? politicians.find(p => p.id === selectedPolitician)?.name +
                        " - " +
                        politicians.find(p => p.id === selectedPolitician)?.office
                      : "Choose a politician"}
                  </button>
                  <input
                    type="hidden"
                    name="politician_id"
                    value={selectedPolitician}
                    required
                  />
                  <Command
                    className={`absolute z-50 w-full bg-popover border rounded-md shadow-lg ${open ? '' : 'hidden'}`}
                  >
                    <CommandInput placeholder="Search politicians..." />
                    <CommandList>
                      <CommandEmpty>No politicians found.</CommandEmpty>
                      <CommandGroup>
                        {politicians.map((politician) => (
                          <CommandItem
                            key={politician.id}
                            value={politician.id}
                            onSelect={() => {
                              setSelectedPolitician(politician.id);
                              setOpen(false);
                            }}
                          >
                            {politician.name} - {politician.office}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type of Information</Label>
                <Select name="type" required disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new_promise">New Promise</SelectItem>
                    <SelectItem value="promise_update">Promise Update</SelectItem>
                    <SelectItem value="statement">Public Statement</SelectItem>
                    <SelectItem value="scandal">Scandal</SelectItem>
                    <SelectItem value="background">Background Information</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter a title for this information"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  placeholder="Provide detailed information"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source_url">Source URL</Label>
                <Input
                  id="source_url"
                  name="source_url"
                  type="url"
                  placeholder="https://example.com/news"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source_date">Source Date</Label>
                <Input
                  id="source_date"
                  name="source_date"
                  type="date"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Information'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
