import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ExternalLink, ThumbsUp, ThumbsDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// This would come from a database in a real application
const getPolitician = (id: string) => {
  // Mock data for Dr. Musa Ibrahim
  return {
    id: "1",
    name: "Dr. Musa Ibrahim",
    image: "/placeholder.svg?height=400&width=400",
    office: "Senator",
    region: "Kaduna North",
    party: "APC",
    quote: "We'll fix power by 2024",
    contact: {
      email: "musa.ibrahim@assembly.gov.ng",
      twitter: "@MusaIbrahim",
      phone: "+234 800 123 4567",
    },
    background: {
      education: ["BSc, ABU Zaria", "PhD, University of Lagos"],
      previousRoles: ["Lecturer, ABU Zaria", "Commissioner for Education, Kaduna State"],
      affiliations: ["Tinubu Loyalist", "GAC Member"],
    },
    promises: [
      {
        id: "p1",
        title: "Fix power supply in Kaduna North",
        status: "pending",
        details: "Promised to ensure 24/7 electricity by 2024",
        source: "Campaign speech, January 2023",
      },
      {
        id: "p2",
        title: "Build 10 new schools",
        status: "pending",
        details: "Promised to build 10 new secondary schools",
        source: "Interview with Channels TV, March 2023",
      },
      {
        id: "p3",
        title: "Vote for electricity bill",
        status: "delivered",
        details: "Voted in favor of the Electricity Reform Bill",
        source: "Senate voting record, April 2023",
      },
      {
        id: "p4",
        title: "Construct health center",
        status: "in-progress",
        details: "Construction of health center in Kaduna North delayed",
        source: "Project update, July 2023",
      },
      {
        id: "p5",
        title: "Sponsor youth empowerment bill",
        status: "delivered",
        details: "Successfully sponsored and passed the Youth Empowerment Bill",
        source: "Senate records, September 2023",
      },
    ],
    statements: [
      {
        id: "s1",
        quote: "We'll fix power by 2024",
        date: "January 15, 2023",
        source: "Campaign rally in Kaduna",
      },
      {
        id: "s2",
        quote: "Education is the key to development",
        date: "March 22, 2023",
        source: "Interview with Channels TV",
      },
      {
        id: "s3",
        quote: "I will not support any bill that increases taxes",
        date: "May 10, 2023",
        source: "Senate plenary session",
      },
    ],
    scandals: [
      {
        id: "sc1",
        title: "EFCC probe (2022)",
        details: "Investigated for alleged misappropriation of funds during tenure as Commissioner",
        status: "Denied charges, investigation ongoing",
        sources: ["Punch Newspaper, December 2022", "BBC Hausa, January 2023"],
      },
    ],
    scorecard: {
      overall: 60,
      transparency: 70,
      effectiveness: 50,
      attendance: 85,
    },
  }
}

export default function PoliticianPage({ params }: { params: { id: string } }) {
  const politician = getPolitician(params.id)

  const deliveredCount = politician.promises.filter((p) => p.status === "delivered").length
  const inProgressCount = politician.promises.filter((p) => p.status === "in-progress").length
  const pendingCount = politician.promises.filter((p) => p.status === "pending").length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4">
                  <Image
                    src={politician.image || "/placeholder.svg"}
                    alt={politician.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold text-center">{politician.name}</h1>
                <div className="flex items-center gap-2 my-2">
                  <Badge>{politician.party}</Badge>
                </div>
                <p className="text-lg text-center text-muted-foreground mb-2">
                  {politician.office} – {politician.region}
                </p>
                <p className="text-sm italic text-center mb-6">"{politician.quote}"</p>

                <div className="w-full border-t pt-4 mt-2">
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="font-medium mr-2">Email:</span>
                      <a href={`mailto:${politician.contact.email}`} className="text-blue-600 hover:underline">
                        {politician.contact.email}
                      </a>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium mr-2">Twitter:</span>
                      <a
                        href={`https://twitter.com/${politician.contact.twitter.replace("@", "")}`}
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {politician.contact.twitter}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium mr-2">Phone:</span>
                      <a
                        href={`tel:${politician.contact.phone.replace(/\s/g, "")}`}
                        className="text-blue-600 hover:underline"
                      >
                        {politician.contact.phone}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="w-full border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Background</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium">Education</h4>
                      <ul className="list-disc list-inside">
                        {politician.background.education.map((edu, index) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Previous Roles</h4>
                      <ul className="list-disc list-inside">
                        {politician.background.previousRoles.map((role, index) => (
                          <li key={index}>{role}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Known Affiliations</h4>
                      <ul className="list-disc list-inside">
                        {politician.background.affiliations.map((aff, index) => (
                          <li key={index}>{aff}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="w-full border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Scorecard</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Performance</span>
                        <span>{politician.scorecard.overall}%</span>
                      </div>
                      <Progress value={politician.scorecard.overall} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Transparency</span>
                        <span>{politician.scorecard.transparency}%</span>
                      </div>
                      <Progress value={politician.scorecard.transparency} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Effectiveness</span>
                        <span>{politician.scorecard.effectiveness}%</span>
                      </div>
                      <Progress value={politician.scorecard.effectiveness} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance</span>
                        <span>{politician.scorecard.attendance}%</span>
                      </div>
                      <Progress value={politician.scorecard.attendance} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs with Record */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="promises">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="promises">Promises</TabsTrigger>
              <TabsTrigger value="statements">Statements</TabsTrigger>
              <TabsTrigger value="scandals">Scandals</TabsTrigger>
              <TabsTrigger value="contribute">Contribute</TabsTrigger>
            </TabsList>

            <TabsContent value="promises">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Promises & Delivery</CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">{deliveredCount} Delivered</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">{inProgressCount} In Progress</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">{pendingCount} Pending</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {politician.promises.map((promise) => (
                      <div key={promise.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{promise.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{promise.details}</p>
                            <p className="text-xs mt-2">Source: {promise.source}</p>
                          </div>
                          <div>
                            {promise.status === "delivered" && <Badge className="bg-green-500">Delivered</Badge>}
                            {promise.status === "in-progress" && <Badge className="bg-yellow-500">In Progress</Badge>}
                            {promise.status === "pending" && <Badge className="bg-red-500">Pending</Badge>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statements">
              <Card>
                <CardHeader>
                  <CardTitle>Public Statements & Quotes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {politician.statements.map((statement) => (
                      <div key={statement.id} className="border rounded-lg p-4">
                        <blockquote className="italic text-lg border-l-4 border-green-700 pl-4 py-1">
                          "{statement.quote}"
                        </blockquote>
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>{statement.date}</span>
                          <span>Source: {statement.source}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scandals">
              <Card>
                <CardHeader>
                  <CardTitle>Scandals & Investigations</CardTitle>
                </CardHeader>
                <CardContent>
                  {politician.scandals.length > 0 ? (
                    <div className="space-y-4">
                      {politician.scandals.map((scandal) => (
                        <div key={scandal.id} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <h3 className="font-semibold">{scandal.title}</h3>
                              <p className="text-sm mt-1">{scandal.details}</p>
                              <p className="text-sm mt-1">Status: {scandal.status}</p>
                              <div className="mt-2">
                                <h4 className="text-sm font-medium">Sources:</h4>
                                <ul className="list-disc list-inside text-sm">
                                  {scandal.sources.map((source, index) => (
                                    <li key={index}>{source}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p>No scandals or investigations reported.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contribute">
              <Card>
                <CardHeader>
                  <CardTitle>Contribute Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Information Type</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>New Promise</option>
                        <option>Promise Update</option>
                        <option>Public Statement</option>
                        <option>Scandal/Investigation</option>
                        <option>Background Information</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Title/Summary</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Brief title or summary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Details</label>
                      <textarea
                        className="w-full p-2 border rounded-md min-h-[100px]"
                        placeholder="Provide detailed information"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Source URL</label>
                      <input
                        type="url"
                        className="w-full p-2 border rounded-md"
                        placeholder="https://example.com/source"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Source Date</label>
                      <input type="date" className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="pt-2">
                      <Button className="w-full bg-green-700 hover:bg-green-800">Submit Information</Button>
                      <p className="text-xs text-center mt-2 text-muted-foreground">
                        All submissions are reviewed by our team before publishing.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex gap-4">
            <Button variant="outline" className="flex-1">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Rate Positively
            </Button>
            <Button variant="outline" className="flex-1">
              <ThumbsDown className="h-4 w-4 mr-2" />
              Rate Negatively
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Sources & References</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Official Senate Records
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Punch Newspaper Archives
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Channels TV Interviews
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  BBC Hausa Reports
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
