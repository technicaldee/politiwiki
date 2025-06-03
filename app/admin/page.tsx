'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Contribution } from '@/lib/types'
import { useRouter } from 'next/navigation'

type ContributionWithPolitician = Contribution & {
  politicians: {
    name: string
    office: string
  }
}

export default function AdminPage() {
  const [contributions, setContributions] = useState<ContributionWithPolitician[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    fetchContributions()
  }, [])

  const fetchContributions = async () => {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select(`
          *,
          politicians (
            name,
            office
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setContributions(data || [])
    } catch (error) {
      console.error('Error fetching contributions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleModeration = async (contributionId: string, status: 'approved' | 'rejected') => {
    try {
      if (status === 'approved') {
        // Find the contribution
        const contribution = contributions.find(c => c.id === contributionId)
        if (contribution) {
          if (contribution.type === 'new_promise' || contribution.type === 'promise_update') {
            await supabase.from('promises').insert({
              politician_id: contribution.politician_id,
              title: contribution.title,
              details: contribution.details,
              source_url: contribution.source_url,
              source_date: contribution.source_date,
              status: 'pending',
              created_by: contribution["user_id"]
            })
          } else if (contribution.type === 'statement') {
            await supabase.from('statements').insert({
              politician_id: contribution.politician_id,
              content: contribution.details,
              source_url: contribution.source_url,
              date: contribution.source_date,
              created_by: contribution["user_id"]
            })
          } else if (contribution.type === 'scandal') {
            await supabase.from('scandals').insert({
              politician_id: contribution.politician_id,
              title: contribution.title,
              details: contribution.details,
              source_url: contribution.source_url,
              date: contribution.source_date,
              created_by: contribution["user_id"]
            })
          }
        }
      }
      const { error } = await supabase
        .from('contributions')
        .update({ status })
        .eq('id', contributionId)
      if (error) throw error
      fetchContributions()
    } catch (error) {
      console.error('Error moderating contribution:', error)
    }
  }

  const pendingContributions = contributions.filter(c => c.status === 'pending')
  const approvedContributions = contributions.filter(c => c.status === 'approved')
  const rejectedContributions = contributions.filter(c => c.status === 'rejected')

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingContributions.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedContributions.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedContributions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid gap-4">
            {pendingContributions.map((contribution) => (
              <ContributionCard
                key={contribution.id}
                contribution={contribution}
                onModerate={handleModeration}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="grid gap-4">
            {approvedContributions.map((contribution) => (
              <ContributionCard
                key={contribution.id}
                contribution={contribution}
                onModerate={handleModeration}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="grid gap-4">
            {rejectedContributions.map((contribution) => (
              <ContributionCard
                key={contribution.id}
                contribution={contribution}
                onModerate={handleModeration}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ContributionCard({
  contribution,
  onModerate,
}: {
  contribution: ContributionWithPolitician
  onModerate: (id: string, status: 'approved' | 'rejected') => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{contribution.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              For: {contribution.politicians.name} ({contribution.politicians.office})
            </p>
          </div>
          <Badge variant={contribution.status === 'pending' ? 'secondary' : contribution.status === 'approved' ? 'default' : 'destructive'}>
            {contribution.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{contribution.details}</p>
        <div className="flex gap-2">
          {contribution.status === 'pending' && (
            <>
              <Button
                variant="outline"
                onClick={() => onModerate(contribution.id, 'approved')}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => onModerate(contribution.id, 'rejected')}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 