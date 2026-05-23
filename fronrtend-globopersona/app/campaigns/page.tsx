'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
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
import { type Campaign } from '@/lib/mock-data'
import { loadCampaigns, removeCampaign, addCampaign } from '@/lib/browser-mock-store'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Eye,
  MousePointerClick,
  Calendar,
  Copy,
  Pencil,
  Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'

const statusStyles = {
  draft: 'bg-muted text-muted-foreground border-muted',
  scheduled: 'bg-warning/10 text-warning border-warning/20',
  sent: 'bg-success/10 text-success border-success/20',
  active: 'bg-primary/10 text-primary border-primary/20',
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  })
}

export default function CampaignsPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => loadCampaigns())

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleView = (id: string) => router.push(`/campaigns/${id}`)

  const handleEdit = (id: string) => router.push(`/campaigns/${id}/edit`)

  const handleDuplicate = (c: Campaign) => {
    const copy: Campaign = {
      ...c,
      id: String(Date.now()),
      name: `${c.name} (Copy)`,
      createdAt: new Date().toISOString(),
      status: 'draft',
      recipients: 0,
      openRate: 0,
      clickRate: 0,
    }
    const next = addCampaign(copy)
    setCampaigns(next)
    toast({ title: 'Campaign duplicated', description: `${c.name} was duplicated.` })
  }

  const handleDelete = (id: string) => {
    const next = removeCampaign(id)
    setCampaigns(next)
    toast({ title: 'Campaign deleted', description: 'Campaign removed.' })
  }

  return (
    <DashboardLayout 
      title="Campaigns" 
      description="Create and manage your email campaigns"
    >
      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search campaigns..."
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href="/campaigns/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </div>

      {/* Campaigns Table */}
      <div className="mt-6 rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px] pl-6">Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  Open Rate
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                  Click Rate
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Recipients
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Created
                </div>
              </TableHead>
              <TableHead className="pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Mail className="h-8 w-8 text-muted-foreground/50" />
                    <p className="mt-2 text-sm text-muted-foreground">No campaigns found</p>
                    <Button variant="link" size="sm" asChild className="mt-1">
                      <Link href="/campaigns/create">Create your first campaign</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCampaigns.map((campaign) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                  onView={() => handleView(campaign.id)}
                  onEdit={() => handleEdit(campaign.id)}
                  onDuplicate={() => handleDuplicate(campaign)}
                  onDelete={() => handleDelete(campaign.id)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredCampaigns.length} of {campaigns.length} campaigns</p>
      </div>
    </DashboardLayout>
  )
}

function CampaignRow({ campaign, onView, onEdit, onDuplicate, onDelete }: { campaign: Campaign; onView?: () => void; onEdit?: () => void; onDuplicate?: () => void; onDelete?: () => void }) {
  return (
    <TableRow className="group">
      <TableCell className="pl-6">
        <div className="space-y-1">
          <Link 
            href={`/campaigns/${campaign.id}`}
            className="font-medium text-foreground hover:text-primary transition-colors"
          >
            {campaign.name}
          </Link>
          <p className="text-sm text-muted-foreground truncate max-w-[280px]">
            {campaign.subject}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant="outline"
          className={cn('capitalize', statusStyles[campaign.status])}
        >
          {campaign.status}
        </Badge>
      </TableCell>
      <TableCell>
        <span className={cn(
          'font-medium',
          campaign.openRate > 0 ? 'text-foreground' : 'text-muted-foreground'
        )}>
          {campaign.openRate > 0 ? `${campaign.openRate}%` : '-'}
        </span>
      </TableCell>
      <TableCell>
        <span className={cn(
          'font-medium',
          campaign.clickRate > 0 ? 'text-foreground' : 'text-muted-foreground'
        )}>
          {campaign.clickRate > 0 ? `${campaign.clickRate}%` : '-'}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">
          {campaign.recipients > 0 ? campaign.recipients.toLocaleString() : '-'}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">
          {formatDate(campaign.createdAt)}
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
            <DropdownMenuItem onClick={() => onView?.()}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.()}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Campaign
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate?.()}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
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
