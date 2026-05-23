'use client'

import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { loadContacts, updateContact } from '@/lib/browser-mock-store'

export default function ContactEditPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id?: string }
  const contact = loadContacts().find((c) => c.id === id)
  const { toast } = useToast()

  const [form, setForm] = useState(() => ({
    name: contact?.name ?? '',
    email: contact?.email ?? '',
  }))

  if (!contact) {
    return (
      <DashboardLayout title="Not found" description="Contact not found">
        <div className="p-6">Contact not found.</div>
      </DashboardLayout>
    )
  }

  const handleSave = () => {
    updateContact(contact.id, (current) => ({
      ...current,
      name: form.name,
      email: form.email,
    }))
    toast({ title: 'Saved', description: 'Contact updated.' })
    router.push(`/contacts/${contact.id}`)
  }

  return (
    <DashboardLayout title={`Edit: ${contact.name}`} description="Update contact details">
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/contacts/${contact.id}`)}>Back</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Contact</CardTitle>
          <CardDescription>Update contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => router.push(`/contacts/${contact.id}`)}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
