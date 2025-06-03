import { getPoliticianById, getPoliticianPromises, getPoliticianStatements, getPoliticianScandals, getUserRating } from "@/lib/actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { ratePolitician } from "@/lib/actions"

export default async function PoliticianPage({ params }: { params: { id: string } }) {
  const politician = await getPoliticianById(params.id)
  const promises = await getPoliticianPromises(params.id)
  const statements = await getPoliticianStatements(params.id)
  const scandals = await getPoliticianScandals(params.id)
  const userRating = await getUserRating(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <Avatar className="h-32 w-32">
          <AvatarImage src={politician.image_url || undefined} alt={politician.name} />
          <AvatarFallback className="text-4xl">{politician.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{politician.name}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{politician.office}</Badge>
            <Badge variant="secondary">{politician.party}</Badge>
            <Badge variant="secondary">{politician.region}</Badge>
          </div>
          {politician.quote && (
            <blockquote className="text-xl italic text-muted-foreground mb-4">
              "{politician.quote}"
            </blockquote>
          )}
          <div className="flex gap-4">
            {politician.email && (
              <a href={`mailto:${politician.email}`} className="text-sm text-muted-foreground hover:underline">
                {politician.email}
              </a>
            )}
            {politician.twitter && (
              <a href={`https://twitter.com/${politician.twitter}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline">
                @{politician.twitter}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="promises" className="mb-8">
        <TabsList>
          <TabsTrigger value="promises">Promises</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
          <TabsTrigger value="scandals">Scandals</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
        </TabsList>

        <TabsContent value="promises">
          <div className="grid gap-4">
            {promises.map((promise) => (
              <Card key={promise.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{promise.title}</CardTitle>
                    <Badge variant={promise.status === 'delivered' ? 'default' : 'secondary'}>
                      {promise.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{promise.details}</p>
                  <a href={promise.source} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline">
                    Source
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statements">
          <div className="grid gap-4">
            {statements.map((statement) => (
              <Card key={statement.id}>
                <CardContent className="pt-6">
                  <blockquote className="text-lg italic mb-4">"{statement.quote}"</blockquote>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{new Date(statement.date).toLocaleDateString()}</span>
                    <a href={statement.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Source
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scandals">
          <div className="grid gap-4">
            {scandals.map((scandal) => (
              <Card key={scandal.id}>
                <CardHeader>
                  <CardTitle>{scandal.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{scandal.details}</p>
                  <div className="flex flex-wrap gap-2">
                    {scandal.sources.map((source, index) => (
                      <a key={index} href={source} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline">
                        Source {index + 1}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="background">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Education</h3>
              <ul className="list-disc list-inside mb-6">
                {politician.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-4">Previous Roles</h3>
              <ul className="list-disc list-inside mb-6">
                {politician.previous_roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-4">Affiliations</h3>
              <ul className="list-disc list-inside">
                {politician.affiliations.map((affiliation, index) => (
                  <li key={index}>{affiliation}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Rating Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Rate this Politician</h3>
          <form action={async (formData: FormData) => {
            'use server'
            const rating = formData.get('rating') === 'true'
            await ratePolitician(params.id, rating)
          }}>
            <div className="flex gap-4">
              <Button
                type="submit"
                name="rating"
                value="true"
                variant={userRating?.rating === true ? "default" : "outline"}
                className="flex-1"
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                type="submit"
                name="rating"
                value="false"
                variant={userRating?.rating === false ? "default" : "outline"}
                className="flex-1"
              >
                <ThumbsDown className="mr-2 h-4 w-4" />
                Disapprove
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 