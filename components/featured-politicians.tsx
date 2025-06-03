import { getPoliticians } from "@/lib/actions"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default async function FeaturedPoliticians() {
  const politicians = await getPoliticians()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {politicians.slice(0, 6).map((politician) => (
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
                  <p className="text-sm text-muted-foreground">{politician.party}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
