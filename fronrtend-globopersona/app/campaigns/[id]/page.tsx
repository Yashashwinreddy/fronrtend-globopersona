'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { type Campaign } from '@/lib/mock-data'
import { loadCampaigns, addCampaign, removeCampaign } from '@/lib/browser-mock-store'

export default function CampaignDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id?: string }
  const campaigns = loadCampaigns()
  const campaign = campaigns.find((c) => c.id === id)
  const { toast } = useToast()

  if (!campaign) {
    return (
      <DashboardLayout title="Campaign not found" description="No campaign with that id">
        <div className="p-6">Campaign not found.</div>
      </DashboardLayout>
    )
  }

  const handleEdit = () => router.push(`/campaigns/${campaign.id}/edit`)

  const handleDuplicate = () => {
    const copy = {
      ...campaign,
      id: String(Date.now()),
      name: `${campaign.name} (Copy)`,
      createdAt: new Date().toISOString(),
      status: 'draft',
      recipients: 0,
      openRate: 0,
      clickRate: 0,
    }
    addCampaign(copy)
    toast({ title: 'Campaign duplicated', description: `${campaign.name} duplicated.` })
    router.push(`/campaigns/${copy.id}`)
  }

  const handleDelete = () => {
    removeCampaign(campaign.id)
    toast({ title: 'Campaign deleted', description: 'Campaign removed.' })
    router.push('/campaigns')
  }

  return (
    <DashboardLayout title={campaign.name} description={campaign.subject}>
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/campaigns">Back to campaigns</Link>
        </Button>
        <div className="ml-auto flex gap-2">
          <Button onClick={handleEdit}>Edit</Button>
          <Button variant="outline" onClick={handleDuplicate}>Duplicate</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{campaign.name}</CardTitle>
          <CardDescription>{campaign.subject}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <p><strong>Status:</strong> {campaign.status}</p>
            <p><strong>Recipients:</strong> {campaign.recipients}</p>
            <p><strong>Open rate:</strong> {campaign.openRate}%</p>
            <p><strong>Click rate:</strong> {campaign.clickRate}%</p>
            <p><strong>Created:</strong> {new Date(campaign.createdAt).toLocaleString('en-US', { timeZone: 'UTC' })}</p>
            {campaign.scheduledAt && <p><strong>Scheduled:</strong> {new Date(campaign.scheduledAt).toLocaleString('en-US', { timeZone: 'UTC' })}</p>}
            {campaign.sentAt && <p><strong>Sent:</strong> {new Date(campaign.sentAt).toLocaleString('en-US', { timeZone: 'UTC' })}</p>}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
