import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock data for Nigerian states
const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT (Abuja)",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
]

// Mock data for politicians count per state
const getPoliticianCount = (state: string) => {
  // This would come from a database in a real application
  const counts: Record<string, number> = {
    Lagos: 42,
    "FCT (Abuja)": 38,
    Kano: 35,
    Rivers: 30,
    Kaduna: 28,
  }

  return counts[state] || Math.floor(Math.random() * 30) + 5
}

export default function BrowseByStatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Politicians by State</h1>

      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search states..." className="pl-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {states.map((state) => (
          <Link href={`/browse/state/${state.toLowerCase().replace(/\s+/g, "-")}`} key={state}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{state}</h2>
                  <Badge variant="outline">{getPoliticianCount(state)}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
