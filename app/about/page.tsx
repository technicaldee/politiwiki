import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, FileText, BarChart3, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About PolitiWiki</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <p>
            PolitiWiki is a simple, clean platform where Nigerians can look up politicians, see their records, and
            contribute updates — like a local, political Wikipedia + scorecard.
          </p>
          <p>
            Our mission is to promote transparency and accountability in Nigerian politics by providing citizens with
            accurate, up-to-date information about their elected officials.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Our Core Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <Users className="h-6 w-6 text-green-700 dark:text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Politician Profiles</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Name, picture, and current office
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Party affiliation and state/region
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Contact information and social media
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Educational and professional background
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <FileText className="h-6 w-6 text-green-700 dark:text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Record Tracking</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Campaign promises and delivery status
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Public statements and quotes
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Scandals and investigations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Performance scorecard
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <BarChart3 className="h-6 w-6 text-green-700 dark:text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Public Contributions</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Submit new politicians and updates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Provide evidence with source links
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Rate politicians' performance
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Comment on profiles and updates
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-green-700 dark:text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quality Control</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Moderation system for all submissions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Source verification for all claims
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Fact-checking process
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                      Community reporting system
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <p>PolitiWiki aims to:</p>
          <ul>
            <li>Increase political transparency in Nigeria</li>
            <li>Hold politicians accountable for their promises and actions</li>
            <li>Provide citizens with accurate information to make informed voting decisions</li>
            <li>Create a community of engaged citizens who actively participate in the democratic process</li>
            <li>Promote a culture of evidence-based political discourse</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4">How You Can Help</h2>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <p>PolitiWiki is a community-driven platform. Here's how you can contribute:</p>
          <ul>
            <li>Submit information about politicians with credible sources</li>
            <li>Update existing profiles with new information</li>
            <li>Provide evidence for or against claims and promises</li>
            <li>Share PolitiWiki with friends and family</li>
            <li>Report inaccuracies or issues you find on the platform</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link href="/submit">
            <Button size="lg" className="w-full sm:w-auto bg-green-700 hover:bg-green-800">
              Submit Information
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Contact Us
            </Button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-4">Our Team</h2>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <p>
            PolitiWiki was created by a team of Nigerians passionate about democracy, transparency, and good governance.
            Our team includes:
          </p>
          <ul>
            <li>Journalists and fact-checkers</li>
            <li>Political analysts and researchers</li>
            <li>Software developers and designers</li>
            <li>Civic engagement advocates</li>
          </ul>
          <p>We are committed to maintaining a non-partisan platform that presents factual information without bias.</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Principles</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <span className="font-semibold">Accuracy:</span> We verify all information before publishing.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <span className="font-semibold">Transparency:</span> We cite sources for all claims.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <span className="font-semibold">Non-partisan:</span> We do not favor any political party or ideology.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <span className="font-semibold">Inclusivity:</span> We welcome contributions from all Nigerians.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <span className="font-semibold">Accountability:</span> We correct errors promptly and transparently.
              </div>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
          <p className="text-lg mb-6">Help build a more transparent and accountable political system in Nigeria.</p>
          <Link href="/browse/state">
            <Button size="lg" className="bg-green-700 hover:bg-green-800">
              Start Exploring
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
