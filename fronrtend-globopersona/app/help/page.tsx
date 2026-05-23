'use client'

import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, LifeBuoy, Mail } from 'lucide-react'

export default function HelpPage() {
  return (
    <DashboardLayout title="Help & Documentation" description="Quick links for using the mock dashboard">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-primary" />
              Documentation
            </CardTitle>
            <CardDescription>What the demo supports right now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Campaigns and contacts are stored in browser localStorage only.</p>
            <p>Edits, deletes, and duplicates persist in this browser until you clear site data.</p>
            <p>Notifications and theme changes are interactive and shared across pages.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LifeBuoy className="h-5 w-5 text-primary" />
              Support
            </CardTitle>
            <CardDescription>Need help with the mock app?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild>
              <a href="mailto:support@globopersona.local">
                <Mail className="mr-2 h-4 w-4" />
                Contact support
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}