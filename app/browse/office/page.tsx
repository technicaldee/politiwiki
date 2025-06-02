import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock data for political offices
const offices = [
  {
    title: "President",
    count: 1,
    description: "Head of state and government",
  },
  {
    title: "Vice President",
    count: 1,
    description: "Deputy to the President",
  },
  {
    title: "Senators",
    count: 109,
    description: "Members of the Senate",
  },
  {
    title: "House of Representatives",
    count: 360,
    description: "Members of the House of Representatives",
  },
  {
    title: "Governors",
    count: 36,
    description: "Heads of state governments",
  },
  {
    title: "Deputy Governors",
    count: 36,
    description: "Deputies to the Governors",
  },
  {
    title: "Ministers",
    count: 42,
    description: "Federal cabinet members",
  },
  {
    title: "State Assembly Members",
    count: 990,
    description: "Members of state legislatures",
  },
  {
    title: "Local Government Chairmen",
    count: 774,
    description: "Heads of local governments",
  },
  {
    title: "Commissioners",
    count: 720,
    description: "State cabinet members",
  },
  {
    title: "Judges",
    count: 250,
    description: "Judicial officers",
  },
  {
    title: "Ambassadors",
    count: 109,
    description: "Diplomatic representatives",
  },
]

export default function BrowseByOfficePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Politicians by Office</h1>

      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search offices..." className="pl-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {offices.map((office) => (
          <Link href={`/browse/office/${office.title.toLowerCase().replace(/\s+/g, "-")}`} key={office.title}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold">{office.title}</h2>
                    <p className="text-sm text-muted-foreground">{office.description}</p>
                  </div>
                  <Badge variant="outline">{office.count}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
