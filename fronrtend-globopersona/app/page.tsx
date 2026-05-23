import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { StatsCard } from '@/components/dashboard/stats-card'
import { PerformanceChart } from '@/components/dashboard/performance-chart'
import { RecentCampaigns } from '@/components/dashboard/recent-campaigns'
import { 
  dashboardStats, 
  campaignPerformanceData, 
  campaigns 
} from '@/lib/mock-data'
import { 
  Mail, 
  Zap, 
  Users, 
  TrendingUp,
  MousePointerClick,
  Send
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Welcome back! Here&apos;s an overview of your email marketing."
    >
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard
          title="Total Campaigns"
          value={dashboardStats.totalCampaigns}
          change="+12 this month"
          changeType="positive"
          icon={Mail}
          iconColor="bg-primary/10 text-primary"
        />
        <StatsCard
          title="Active Campaigns"
          value={dashboardStats.activeCampaigns}
          change="2 ending soon"
          changeType="neutral"
          icon={Zap}
          iconColor="bg-warning/10 text-warning"
        />
        <StatsCard
          title="Total Contacts"
          value={dashboardStats.totalContacts}
          change="+1,240 this month"
          changeType="positive"
          icon={Users}
          iconColor="bg-success/10 text-success"
        />
        <StatsCard
          title="Avg. Open Rate"
          value={`${dashboardStats.averageOpenRate}%`}
          change="+2.4% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-chart-2/20 text-chart-2"
        />
        <StatsCard
          title="Avg. Click Rate"
          value={`${dashboardStats.averageClickRate}%`}
          change="+0.8% from last month"
          changeType="positive"
          icon={MousePointerClick}
          iconColor="bg-chart-3/20 text-chart-3"
        />
        <StatsCard
          title="Emails This Month"
          value={dashboardStats.emailsSentThisMonth}
          change="125,420 delivered"
          changeType="neutral"
          icon={Send}
          iconColor="bg-chart-4/20 text-chart-4"
        />
      </div>

      {/* Charts and Tables */}
      <div className="mt-6 grid gap-6 lg:grid-cols-1">
        <PerformanceChart data={campaignPerformanceData} />
      </div>

      <div className="mt-6">
        <RecentCampaigns campaigns={campaigns} />
      </div>
    </DashboardLayout>
  )
}
