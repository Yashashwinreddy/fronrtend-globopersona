'use client'

import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { loadCampaigns, updateCampaign } from '@/lib/browser-mock-store'

export default function CampaignEditPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id?: string }
  const campaign = loadCampaigns().find((c) => c.id === id)
  const { toast } = useToast()

  const [form, setForm] = useState(() => ({
    name: campaign?.name ?? '',
    subject: campaign?.subject ?? '',
    preheader: campaign?.preheader ?? '',
    content: campaign?.content ?? '',
  }))

  if (!campaign) {
    return (
      <DashboardLayout title="Not found" description="Campaign not found">
        <div className="p-6">Campaign not found.</div>
      </DashboardLayout>
    )
  }

  const handleSave = () => {
    updateCampaign(campaign.id, (current) => ({
      ...current,
      name: form.name,
      subject: form.subject,
      preheader: form.preheader,
      content: form.content,
    }))
    toast({ title: 'Saved', description: 'Campaign updated.' })
    router.push(`/campaigns/${campaign.id}`)
  }

  return (
    <DashboardLayout title={`Edit: ${campaign.name}`} description="Update campaign details">
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/campaigns/${campaign.id}`)}>Back</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Campaign</CardTitle>
          <CardDescription>Update basic campaign fields</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={form.subject} onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => router.push(`/campaigns/${campaign.id}`)}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
