import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users, FileText, BarChart3 } from "lucide-react"
import FeaturedPoliticians from "@/components/featured-politicians"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Track Nigerian Politicians
            <span className="text-green-700 dark:text-green-500"> Transparently</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            A simple, clean platform where Nigerians can look up politicians, see their records, and contribute updates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/browse/state">
              <Button size="lg" className="bg-green-700 hover:bg-green-800">
                Browse Politicians
              </Button>
            </Link>
            <Link href="/submit">
              <Button size="lg" variant="outline">
                Submit Information
              </Button>
            </Link>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search for a politician..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How PolitiWiki Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                    <Users className="h-8 w-8 text-green-700 dark:text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Politician Profiles</h3>
                  <p className="text-muted-foreground">
                    Comprehensive profiles with background, current office, party affiliation, and contact information.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-green-700 dark:text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Record Tracking</h3>
                  <p className="text-muted-foreground">
                    Track promises made, what they've delivered, public statements, and any scandals or investigations.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                    <BarChart3 className="h-8 w-8 text-green-700 dark:text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Public Contributions</h3>
                  <p className="text-muted-foreground">
                    Citizens can submit updates with source links, which are reviewed by moderators before publishing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Politicians */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Politicians</h2>
            <Link href="/browse/state">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <FeaturedPoliticians />
        </div>
      </section>

      {/* Browse Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Browse Politicians</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/browse/state">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 flex flex-col items-center">
                  <h3 className="text-2xl font-semibold mb-4">By State</h3>
                  <p className="text-muted-foreground mb-6">Browse politicians by their state or region</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge>Lagos</Badge>
                    <Badge>Abuja</Badge>
                    <Badge>Kano</Badge>
                    <Badge>Rivers</Badge>
                    <Badge>+33 more</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/browse/office">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 flex flex-col items-center">
                  <h3 className="text-2xl font-semibold mb-4">By Office</h3>
                  <p className="text-muted-foreground mb-6">Browse politicians by their current office</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge>President</Badge>
                    <Badge>Governors</Badge>
                    <Badge>Senators</Badge>
                    <Badge>Ministers</Badge>
                    <Badge>+10 more</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Help Build Political Transparency</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join our community of contributors and help keep Nigerian politicians accountable.
          </p>
          <Link href="/submit">
            <Button size="lg" variant="outline" className="bg-white text-green-700 hover:bg-green-50">
              Submit Information
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
