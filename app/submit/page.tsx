import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadIcon as FileUpload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Submit Information</h1>
        <p className="text-muted-foreground mb-8">
          Help improve PolitiWiki by submitting verified information about Nigerian politicians.
        </p>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            All submissions are reviewed by our team before publishing. Please provide credible sources.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="politician">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="politician">New Politician</TabsTrigger>
            <TabsTrigger value="update">Update Existing</TabsTrigger>
            <TabsTrigger value="evidence">Submit Evidence</TabsTrigger>
          </TabsList>

          <TabsContent value="politician">
            <Card>
              <CardHeader>
                <CardTitle>Submit a New Politician</CardTitle>
                <CardDescription>Add a politician who is not yet in our database</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Input placeholder="e.g., Dr. Musa Ibrahim" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Office</label>
                      <Input placeholder="e.g., Senator, Governor" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">State/Region</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lagos">Lagos</SelectItem>
                          <SelectItem value="abuja">FCT (Abuja)</SelectItem>
                          <SelectItem value="kano">Kano</SelectItem>
                          <SelectItem value="rivers">Rivers</SelectItem>
                          {/* More states would be added here */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Political Party</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select party" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apc">APC</SelectItem>
                          <SelectItem value="pdp">PDP</SelectItem>
                          <SelectItem value="lp">Labour Party</SelectItem>
                          <SelectItem value="nnpp">NNPP</SelectItem>
                          {/* More parties would be added here */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Background Information</label>
                    <Textarea placeholder="Education, previous roles, known affiliations" className="min-h-[100px]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Information (if public)</label>
                    <Textarea placeholder="Email, social media handles, phone number" className="min-h-[80px]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Notable Quotes or Promises</label>
                    <Textarea placeholder="Campaign promises or notable public statements" className="min-h-[80px]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Sources</label>
                    <Textarea
                      placeholder="URLs to credible sources that verify this information"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Upload Photo (optional)</label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <FileUpload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Drag and drop a photo here, or click to browse</p>
                      <Input type="file" className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Your Email (for verification)</label>
                    <Input type="email" placeholder="your.email@example.com" />
                    <p className="text-xs text-muted-foreground mt-1">
                      We may contact you to verify information. Your email will not be published.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full bg-green-700 hover:bg-green-800">Submit Politician</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="update">
            <Card>
              <CardHeader>
                <CardTitle>Update Existing Politician</CardTitle>
                <CardDescription>Add or update information for a politician already in our database</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Politician</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Search for a politician" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="musa-ibrahim">Dr. Musa Ibrahim</SelectItem>
                        <SelectItem value="adebayo-ogunlesi">Chief Adebayo Ogunlesi</SelectItem>
                        <SelectItem value="amina-bello">Hon. Amina Bello</SelectItem>
                        {/* More politicians would be added here */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Update Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select update type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promise">New Promise</SelectItem>
                        <SelectItem value="promise-update">Promise Update</SelectItem>
                        <SelectItem value="statement">Public Statement</SelectItem>
                        <SelectItem value="scandal">Scandal/Investigation</SelectItem>
                        <SelectItem value="background">Background Information</SelectItem>
                        <SelectItem value="contact">Contact Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Title/Summary</label>
                    <Input placeholder="Brief title or summary of the update" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Details</label>
                    <Textarea placeholder="Provide detailed information about this update" className="min-h-[150px]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Source URLs</label>
                    <Textarea
                      placeholder="URLs to credible sources that verify this information"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Date of Information</label>
                    <Input type="date" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Your Email (for verification)</label>
                    <Input type="email" placeholder="your.email@example.com" />
                    <p className="text-xs text-muted-foreground mt-1">
                      We may contact you to verify information. Your email will not be published.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full bg-green-700 hover:bg-green-800">Submit Update</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence">
            <Card>
              <CardHeader>
                <CardTitle>Submit Evidence</CardTitle>
                <CardDescription>Provide evidence for an existing claim or promise</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Politician</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Search for a politician" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="musa-ibrahim">Dr. Musa Ibrahim</SelectItem>
                        <SelectItem value="adebayo-ogunlesi">Chief Adebayo Ogunlesi</SelectItem>
                        <SelectItem value="amina-bello">Hon. Amina Bello</SelectItem>
                        {/* More politicians would be added here */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Select Promise/Claim</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a promise or claim" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="power-2024">Fix power supply by 2024</SelectItem>
                        <SelectItem value="schools">Build 10 new schools</SelectItem>
                        <SelectItem value="health-center">Construct health center</SelectItem>
                        {/* More promises would be added here */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Evidence Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select evidence type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fulfilled">Evidence of Fulfillment</SelectItem>
                        <SelectItem value="progress">Evidence of Progress</SelectItem>
                        <SelectItem value="contradiction">Evidence of Contradiction</SelectItem>
                        <SelectItem value="delay">Evidence of Delay</SelectItem>
                        <SelectItem value="abandonment">Evidence of Abandonment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Evidence Description</label>
                    <Textarea placeholder="Describe the evidence in detail" className="min-h-[150px]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Source URLs</label>
                    <Textarea
                      placeholder="URLs to news articles, official documents, or other credible sources"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Upload Evidence (optional)</label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <FileUpload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop evidence files here, or click to browse
                      </p>
                      <Input type="file" className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Date of Evidence</label>
                    <Input type="date" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Your Email (for verification)</label>
                    <Input type="email" placeholder="your.email@example.com" />
                    <p className="text-xs text-muted-foreground mt-1">
                      We may contact you to verify information. Your email will not be published.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full bg-green-700 hover:bg-green-800">Submit Evidence</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
