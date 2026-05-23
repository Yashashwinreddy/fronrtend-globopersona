'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { audiences } from '@/lib/mock-data'
import { addCampaign } from '@/lib/browser-mock-store'
import { 
  ArrowLeft, 
  Save, 
  Send,
  Mail,
  Users,
  FileText,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  subject: string
  preheader: string
  audience: string
  content: string
}

interface FormErrors {
  name?: string
  subject?: string
  audience?: string
  content?: string
}

export default function CreateCampaignPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    subject: '',
    preheader: '',
    audience: '',
    content: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Campaign name is required'
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Email subject is required'
    }
    if (!formData.audience) {
      newErrors.audience = 'Please select an audience'
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Email content is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    const newCampaignId = String(Date.now())
    addCampaign({
      id: newCampaignId,
      name: formData.name || 'Untitled Draft',
      subject: formData.subject || 'Draft campaign',
      preheader: formData.preheader,
      audienceId: formData.audience,
      content: formData.content,
      status: 'draft',
      openRate: 0,
      clickRate: 0,
      recipients: audiences.find((audience) => audience.id === formData.audience)?.count ?? 0,
      createdAt: new Date().toISOString(),
    })
    setIsSaving(false)
    toast({ title: 'Draft saved', description: 'Your campaign was saved as a draft.' })
    router.push('/campaigns')
  }

  const handleSendCampaign = async () => {
    if (!validateForm()) return
    
    setIsSaving(true)
    addCampaign({
      id: String(Date.now()),
      name: formData.name,
      subject: formData.subject,
      preheader: formData.preheader,
      audienceId: formData.audience,
      content: formData.content,
      status: 'sent',
      openRate: 0,
      clickRate: 0,
      recipients: audiences.find((audience) => audience.id === formData.audience)?.count ?? 0,
      createdAt: new Date().toISOString(),
      sentAt: new Date().toISOString(),
    })
    setIsSaving(false)
    toast({ title: 'Campaign sent', description: 'Your campaign has been queued for delivery.' })
    router.push('/campaigns')
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <DashboardLayout 
      title="Create Campaign" 
      description="Design and send a new email campaign"
    >
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/campaigns" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Campaigns
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Campaign Details
              </CardTitle>
              <CardDescription>
                Basic information about your email campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Campaign Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Summer Sale Announcement"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={cn(errors.name && 'border-destructive')}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">
                  Email Subject <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="subject"
                  placeholder="e.g., Exclusive Summer Deals - Up to 50% Off!"
                  value={formData.subject}
                  onChange={(e) => updateField('subject', e.target.value)}
                  className={cn(errors.subject && 'border-destructive')}
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preheader">Preview Text (Optional)</Label>
                <Input
                  id="preheader"
                  placeholder="Text that appears after the subject in inbox"
                  value={formData.preheader}
                  onChange={(e) => updateField('preheader', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  This text appears next to the subject line in most email clients
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Audience Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Audience
              </CardTitle>
              <CardDescription>
                Select who will receive this campaign
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="audience">
                  Select Audience <span className="text-destructive">*</span>
                </Label>
                <Select 
                  value={formData.audience}
                  onValueChange={(value) => updateField('audience', value)}
                >
                  <SelectTrigger className={cn(errors.audience && 'border-destructive')}>
                    <SelectValue placeholder="Choose an audience segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {audiences.map((audience) => (
                      <SelectItem key={audience.id} value={audience.id}>
                        <div className="flex items-center justify-between gap-4">
                          <span>{audience.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {audience.count.toLocaleString()} contacts
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.audience && (
                  <p className="text-sm text-destructive">{errors.audience}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Email Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Email Content
              </CardTitle>
              <CardDescription>
                Write your email message
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="content">
                  Email Body <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="content"
                  placeholder="Write your email content here...

You can include:
- Product announcements
- Special offers
- Company updates
- Call-to-action buttons"
                  value={formData.content}
                  onChange={(e) => updateField('content', e.target.value)}
                  className={cn(
                    'min-h-[250px] resize-y',
                    errors.content && 'border-destructive'
                  )}
                />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Supports basic formatting. Use {"{{firstName}}"} for personalization.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Save or send your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleSaveDraft}
                disabled={isSaving}
              >
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              <Button 
                className="w-full justify-start"
                onClick={handleSendCampaign}
                disabled={isSaving}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Campaign
              </Button>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-5 w-5 text-primary" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Subject Line:</strong> Keep it under 50 characters for best open rates.
              </p>
              <p>
                <strong className="text-foreground">Personalization:</strong> Emails with personalized subject lines have 26% higher open rates.
              </p>
              <p>
                <strong className="text-foreground">Best Time:</strong> Tuesday and Thursday mornings typically see the highest engagement.
              </p>
            </CardContent>
          </Card>

          {/* Preview Stats */}
          {formData.audience && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Campaign Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Recipients</span>
                  <span className="font-medium text-foreground">
                    {audiences.find(a => a.id === formData.audience)?.count.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Est. Open Rate</span>
                  <span className="font-medium text-foreground">~32%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Est. Click Rate</span>
                  <span className="font-medium text-foreground">~4.5%</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
