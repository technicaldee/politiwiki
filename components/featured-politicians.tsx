import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

// Mock data for featured politicians
const featuredPoliticians = [
  {
    id: "1",
    name: "Dr. Musa Ibrahim",
    image: "/placeholder.svg?height=300&width=300",
    office: "Senator",
    region: "Kaduna North",
    party: "APC",
    promises: 5,
    delivered: 2,
    quote: "We'll fix power by 2024",
    slug: "musa-ibrahim",
  },
  {
    id: "2",
    name: "Chief Adebayo Ogunlesi",
    image: "/placeholder.svg?height=300&width=300",
    office: "Governor",
    region: "Lagos State",
    party: "PDP",
    promises: 8,
    delivered: 5,
    quote: "Education will be my priority",
    slug: "adebayo-ogunlesi",
  },
  {
    id: "3",
    name: "Hon. Amina Bello",
    image: "/placeholder.svg?height=300&width=300",
    office: "House of Representatives",
    region: "Kano Central",
    party: "NNPP",
    promises: 6,
    delivered: 1,
    quote: "I will create 10,000 jobs",
    slug: "amina-bello",
  },
  {
    id: "4",
    name: "Dr. Chukwuemeka Nwajiuba",
    image: "/placeholder.svg?height=300&width=300",
    office: "Minister",
    region: "Education",
    party: "APC",
    promises: 4,
    delivered: 3,
    quote: "Better schools for all Nigerians",
    slug: "chukwuemeka-nwajiuba",
  },
]

export default function FeaturedPoliticians() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredPoliticians.map((politician) => (
        <Link href={`/politician/${politician.slug}`} key={politician.id}>
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                  <Image
                    src={politician.image || "/placeholder.svg"}
                    alt={politician.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{politician.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="mt-1">
                    {politician.party}
                  </Badge>
                </div>
                <p className="text-sm text-center text-muted-foreground mb-2">
                  {politician.office} – {politician.region}
                </p>
                <p className="text-sm italic text-center mb-4">"{politician.quote}"</p>
                <div className="w-full border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-1" />
                      <span>{politician.delivered} delivered</span>
                    </div>
                    <div className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-1" />
                      <span>{politician.promises - politician.delivered} pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
