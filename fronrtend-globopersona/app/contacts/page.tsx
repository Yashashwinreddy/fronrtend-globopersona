'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Contact } from '@/lib/mock-data'
import { loadContacts, addContact, removeContact } from '@/lib/browser-mock-store'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Tag,
  Calendar,
  UserPlus,
  Pencil,
  Trash2,
  Download
} from 'lucide-react'
import { cn } from '@/lib/utils'

const statusStyles = {
  subscribed: 'bg-success/10 text-success border-success/20',
  unsubscribed: 'bg-muted text-muted-foreground border-muted',
  bounced: 'bg-destructive/10 text-destructive border-destructive/20',
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  })
}

export default function ContactsPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [contacts, setContacts] = useState<Contact[]>(() => loadContacts())

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handlers
  const handleExport = () => {
    const all = contacts
    const header = ['id', 'name', 'email', 'status', 'tags', 'createdAt', 'lastActivity']
    const rows = all.map(c => [c.id, c.name, c.email, c.status, c.tags.join('|'), c.createdAt, c.lastActivity || ''])
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'contacts.csv'
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: 'Export started', description: 'Downloading contacts CSV' })
  }

  const handleAddContact = () => {
    const name = window.prompt('Contact name')
    const email = name ? window.prompt('Contact email') : null
    if (!name || !email) return
    const newContact: Contact = {
      id: String(Date.now()),
      name,
      email,
      status: 'subscribed',
      tags: [],
      createdAt: new Date().toISOString(),
    }
    const next = addContact(newContact)
    setContacts(next)
    toast({ title: 'Contact added', description: `${name} was added.` })
  }

  const handleDelete = (id: string) => {
    const next = removeContact(id)
    setContacts(next)
    toast({ title: 'Contact deleted', description: 'Contact removed.' })
  }

  const handleSendEmail = (contact: Contact) => {
    toast({ title: 'Send email', description: `Pretend sending email to ${contact.email}` })
  }

  const handleEditContact = (id: string) => {
    router.push(`/contacts/${id}/edit`)
  }

  return (
    <DashboardLayout 
      title="Contacts" 
      description="Manage your email subscribers and contacts"
    >
      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-card">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="subscribed">Subscribed</SelectItem>
              <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
              <SelectItem value="bounced">Bounced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport()}>
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button onClick={() => handleAddContact()}>
            <UserPlus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Add Contact</span>
          </Button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="mt-6 rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6 min-w-[200px]">Contact</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[150px]">
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    Tags
                  </div>
                </TableHead>
                <TableHead className="min-w-[120px]">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Added
                  </div>
                </TableHead>
                <TableHead className="min-w-[120px]">Last Activity</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Mail className="h-8 w-8 text-muted-foreground/50" />
                      <p className="mt-2 text-sm text-muted-foreground">No contacts found</p>
                      <Button variant="link" size="sm" className="mt-1" onClick={handleAddContact}>
                        Add your first contact
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
                  <ContactRow key={contact.id} contact={contact} onDelete={() => handleDelete(contact.id)} onSend={() => handleSendEmail(contact)} onEdit={() => handleEditContact(contact.id)} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Contacts</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{contacts.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Subscribed</p>
          <p className="mt-1 text-2xl font-bold text-success">
            {contacts.filter(c => c.status === 'subscribed').length}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Bounced</p>
          <p className="mt-1 text-2xl font-bold text-destructive">
            {contacts.filter(c => c.status === 'bounced').length}
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

function ContactRow({ contact, onDelete, onSend, onEdit }: { contact: Contact; onDelete?: () => void; onSend?: () => void; onEdit?: () => void }) {
  return (
    <TableRow className="group">
      <TableCell className="pl-6">
        <div className="space-y-1">
          <p className="font-medium text-foreground">{contact.name}</p>
          <p className="text-sm text-muted-foreground">{contact.email}</p>
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant="outline"
          className={cn('capitalize', statusStyles[contact.status])}
        >
          {contact.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {contact.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {contact.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{contact.tags.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">
          {formatDate(contact.createdAt)}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">
          {contact.lastActivity ? formatDate(contact.lastActivity) : '-'}
        </span>
      </TableCell>
      <TableCell className="pr-6 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon-sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onSend?.()}>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.()}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Contact
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete?.()}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
