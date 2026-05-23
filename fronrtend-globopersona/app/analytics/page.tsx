'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Mail,
  MousePointerClick,
  Eye,
  Users
} from 'lucide-react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  BarChart
} from 'recharts'

const monthlyData = [
  { month: 'Jan', sent: 45000, opened: 14400, clicked: 2160 },
  { month: 'Feb', sent: 52000, opened: 17680, clicked: 2600 },
  { month: 'Mar', sent: 48000, opened: 15360, clicked: 2400 },
  { month: 'Apr', sent: 61000, opened: 20740, clicked: 3050 },
  { month: 'May', sent: 55000, opened: 18700, clicked: 2750 },
  { month: 'Jun', sent: 67000, opened: 22780, clicked: 3350 },
]

const campaignPerformance = [
  { name: 'Summer Sale', openRate: 38.2, clickRate: 5.4 },
  { name: 'Newsletter #45', openRate: 42.1, clickRate: 6.8 },
  { name: 'Product Launch', openRate: 35.6, clickRate: 4.2 },
  { name: 'Feedback Survey', openRate: 28.4, clickRate: 8.2 },
  { name: 'Holiday Greetings', openRate: 45.6, clickRate: 3.2 },
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout 
      title="Analytics" 
      description="Track your email marketing performance"
    >
      {/* Time Range Selector */}
      <div className="flex justify-end mb-6">
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px] bg-card">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Emails Sent
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">328,000</div>
            <div className="flex items-center gap-1 text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Rate
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.2%</div>
            <div className="flex items-center gap-1 text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+2.1% from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Click Rate
            </CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.1%</div>
            <div className="flex items-center gap-1 text-xs text-destructive mt-1">
              <TrendingDown className="h-3 w-3" />
              <span>-0.3% from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <div className="flex items-center gap-1 text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+18.2% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 mt-6 lg:grid-cols-2">
        {/* Email Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Email Volume
            </CardTitle>
            <CardDescription>Monthly email sending activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sent"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSent)"
                    name="Emails Sent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Campaign Performance
            </CardTitle>
            <CardDescription>Open and click rates by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis 
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                  <Bar dataKey="openRate" fill="var(--chart-2)" name="Open Rate" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
