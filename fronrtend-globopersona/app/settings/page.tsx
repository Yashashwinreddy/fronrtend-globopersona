'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  Save
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { loadBrowserSettings, saveBrowserSettings, type BrowserSettings } from '@/lib/browser-mock-store'

export default function SettingsPage() {
  const [settings, setSettings] = useState<BrowserSettings>(() => loadBrowserSettings())
  const { toast } = useToast()

  const updateProfile = (field: keyof BrowserSettings['profile'], value: string) => {
    setSettings((prev) => {
      const next = { ...prev, profile: { ...prev.profile, [field]: value } }
      saveBrowserSettings(next)
      return next
    })
  }

  const updateCompany = (field: keyof BrowserSettings['company'], value: string) => {
    setSettings((prev) => {
      const next = { ...prev, company: { ...prev.company, [field]: value } }
      saveBrowserSettings(next)
      return next
    })
  }

  const updateNotifications = (field: keyof BrowserSettings['notifications'], value: boolean) => {
    setSettings((prev) => {
      const next = { ...prev, notifications: { ...prev.notifications, [field]: value } }
      saveBrowserSettings(next)
      return next
    })
  }

  const handleSaveProfile = () => {
    saveBrowserSettings(settings)
    toast({ title: 'Saved', description: 'Profile changes saved in browser storage.' })
  }

  const handleSaveCompany = () => {
    saveBrowserSettings(settings)
    toast({ title: 'Saved', description: 'Company details saved in browser storage.' })
  }

  const handleUpdatePassword = () => {
    toast({ title: 'Password', description: 'Password updated (mock).' })
  }

  return (
    <DashboardLayout 
      title="Settings" 
      description="Manage your account and preferences"
    >
      <div className="max-w-3xl space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={settings.profile.firstName} onChange={(e) => updateProfile('firstName', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={settings.profile.lastName} onChange={(e) => updateProfile('lastName', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={settings.profile.email} onChange={(e) => updateProfile('email', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" value={settings.profile.timezone} onChange={(e) => updateProfile('timezone', e.target.value)} />
            </div>
            <Button className="mt-2" onClick={handleSaveProfile}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Company Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Company Details
            </CardTitle>
            <CardDescription>
              Information displayed in your email campaigns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" value={settings.company.companyName} onChange={(e) => updateCompany('companyName', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Physical Address</Label>
              <Textarea 
                id="address" 
                value={settings.company.address}
                onChange={(e) => updateCompany('address', e.target.value)}
                className="min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                Required for CAN-SPAM compliance
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="replyTo">Default Reply-To Email</Label>
              <Input id="replyTo" type="email" value={settings.company.replyTo} onChange={(e) => updateCompany('replyTo', e.target.value)} />
            </div>
            <Button className="mt-2" onClick={handleSaveCompany}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Reports</p>
                <p className="text-sm text-muted-foreground">
                  Receive campaign performance reports via email
                </p>
              </div>
              <Switch 
                checked={settings.notifications.emailReports}
                onCheckedChange={(checked) => updateNotifications('emailReports', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Campaign Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when campaigns are sent or fail
                </p>
              </div>
              <Switch 
                checked={settings.notifications.campaignAlerts}
                onCheckedChange={(checked) => updateNotifications('campaignAlerts', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Digest</p>
                <p className="text-sm text-muted-foreground">
                  Summary of your weekly email marketing activity
                </p>
              </div>
              <Switch 
                checked={settings.notifications.weeklyDigest}
                onCheckedChange={(checked) => updateNotifications('weeklyDigest', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Security Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Important account security notifications
                </p>
              </div>
              <Switch 
                checked={settings.notifications.securityAlerts}
                onCheckedChange={(checked) => updateNotifications('securityAlerts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your password and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            <Button className="mt-2" onClick={handleUpdatePassword}>
              Update Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
