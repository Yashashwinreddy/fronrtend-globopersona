'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { loadContacts, removeContact } from '@/lib/browser-mock-store'

export default function ContactDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id?: string }
  const contact = loadContacts().find((c) => c.id === id)
  const { toast } = useToast()

  if (!contact) {
    return (
      <DashboardLayout title="Contact not found" description="No contact with that id">
        <div className="p-6">Contact not found.</div>
      </DashboardLayout>
    )
  }

  const handleEdit = () => router.push(`/contacts/${contact.id}/edit`)

  const handleDelete = () => {
    removeContact(contact.id)
    toast({ title: 'Contact deleted', description: 'Contact removed.' })
    router.push('/contacts')
  }

  return (
    <DashboardLayout title={contact.name} description={contact.email}>
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/contacts">Back to contacts</Link>
        </Button>
        <div className="ml-auto flex gap-2">
          <Button onClick={handleEdit}>Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{contact.name}</CardTitle>
          <CardDescription>{contact.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <p><strong>Status:</strong> {contact.status}</p>
            <p><strong>Tags:</strong> {contact.tags.join(', ') || '-'}</p>
            <p><strong>Added:</strong> {new Date(contact.createdAt).toLocaleString('en-US', { timeZone: 'UTC' })}</p>
            <p><strong>Last activity:</strong> {contact.lastActivity ? new Date(contact.lastActivity).toLocaleString('en-US', { timeZone: 'UTC' }) : '-'}</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
