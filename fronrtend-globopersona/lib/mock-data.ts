// Mock data for the Globopersona email marketing platform

export interface Campaign {
  id: string
  name: string
  subject: string
  preheader?: string
  audienceId?: string
  content?: string
  status: 'draft' | 'scheduled' | 'sent' | 'active'
  openRate: number
  clickRate: number
  recipients: number
  createdAt: string
  scheduledAt?: string
  sentAt?: string
}

export interface Contact {
  id: string
  email: string
  name: string
  status: 'subscribed' | 'unsubscribed' | 'bounced'
  tags: string[]
  createdAt: string
  lastActivity?: string
}

export interface Audience {
  id: string
  name: string
  count: number
}

export interface DashboardStats {
  totalCampaigns: number
  activeCampaigns: number
  totalContacts: number
  averageOpenRate: number
  averageClickRate: number
  emailsSentThisMonth: number
}

export interface ChartDataPoint {
  date: string
  sent: number
  opened: number
  clicked: number
}

export const dashboardStats: DashboardStats = {
  totalCampaigns: 156,
  activeCampaigns: 12,
  totalContacts: 24580,
  averageOpenRate: 32.5,
  averageClickRate: 4.8,
  emailsSentThisMonth: 125420
}

export const campaignPerformanceData: ChartDataPoint[] = [
  { date: 'Jan', sent: 12000, opened: 3800, clicked: 580 },
  { date: 'Feb', sent: 15000, opened: 4900, clicked: 720 },
  { date: 'Mar', sent: 18000, opened: 5800, clicked: 890 },
  { date: 'Apr', sent: 14000, opened: 4600, clicked: 680 },
  { date: 'May', sent: 22000, opened: 7200, clicked: 1100 },
  { date: 'Jun', sent: 19000, opened: 6100, clicked: 920 },
  { date: 'Jul', sent: 25000, opened: 8200, clicked: 1250 },
]

export const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale Announcement',
    subject: 'Exclusive Summer Deals - Up to 50% Off!',
    status: 'sent',
    openRate: 38.2,
    clickRate: 5.4,
    recipients: 15420,
    createdAt: '2024-01-15T10:00:00Z',
    sentAt: '2024-01-16T09:00:00Z'
  },
  {
    id: '2',
    name: 'Weekly Newsletter #45',
    subject: 'This Week in Tech: AI Updates & More',
    status: 'active',
    openRate: 42.1,
    clickRate: 6.8,
    recipients: 12890,
    createdAt: '2024-01-18T14:30:00Z',
    sentAt: '2024-01-19T08:00:00Z'
  },
  {
    id: '3',
    name: 'Product Launch - New Features',
    subject: 'Introducing Our Biggest Update Yet',
    status: 'scheduled',
    openRate: 0,
    clickRate: 0,
    recipients: 18500,
    createdAt: '2024-01-20T09:00:00Z',
    scheduledAt: '2024-01-25T10:00:00Z'
  },
  {
    id: '4',
    name: 'Customer Feedback Survey',
    subject: 'We Value Your Opinion - Quick Survey',
    status: 'draft',
    openRate: 0,
    clickRate: 0,
    recipients: 0,
    createdAt: '2024-01-21T11:00:00Z'
  },
  {
    id: '5',
    name: 'Holiday Greetings',
    subject: 'Season\'s Greetings from Our Team',
    status: 'sent',
    openRate: 45.6,
    clickRate: 3.2,
    recipients: 24580,
    createdAt: '2024-01-10T10:00:00Z',
    sentAt: '2024-01-12T09:00:00Z'
  },
  {
    id: '6',
    name: 'Onboarding Series - Day 1',
    subject: 'Welcome! Let\'s Get Started',
    status: 'active',
    openRate: 68.4,
    clickRate: 12.1,
    recipients: 856,
    createdAt: '2024-01-08T08:00:00Z',
    sentAt: '2024-01-08T08:00:00Z'
  },
  {
    id: '7',
    name: 'Re-engagement Campaign',
    subject: 'We Miss You! Here\'s 20% Off',
    status: 'draft',
    openRate: 0,
    clickRate: 0,
    recipients: 0,
    createdAt: '2024-01-22T15:00:00Z'
  },
  {
    id: '8',
    name: 'Monthly Digest - January',
    subject: 'Your January Highlights',
    status: 'scheduled',
    openRate: 0,
    clickRate: 0,
    recipients: 22400,
    createdAt: '2024-01-23T10:00:00Z',
    scheduledAt: '2024-02-01T09:00:00Z'
  }
]

export const contacts: Contact[] = [
  {
    id: '1',
    email: 'reddychinu1@gmail.com',
    name: 'Keshireddy Yashashwin Reddy',
    status: 'subscribed',
    tags: ['VIP', 'Newsletter'],
    createdAt: '2023-06-15T10:00:00Z',
    lastActivity: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    email: 'jane.smith@company.com',
    name: 'Jane Smith',
    status: 'subscribed',
    tags: ['Enterprise', 'Product Updates'],
    createdAt: '2023-08-22T09:00:00Z',
    lastActivity: '2024-01-19T11:00:00Z'
  },
  {
    id: '3',
    email: 'mike.johnson@startup.io',
    name: 'Mike Johnson',
    status: 'unsubscribed',
    tags: ['Trial User'],
    createdAt: '2023-11-10T15:30:00Z',
    lastActivity: '2024-01-05T08:00:00Z'
  },
  {
    id: '4',
    email: 'sarah.wilson@agency.co',
    name: 'Sarah Wilson',
    status: 'subscribed',
    tags: ['VIP', 'Early Adopter'],
    createdAt: '2023-03-01T12:00:00Z',
    lastActivity: '2024-01-21T16:45:00Z'
  },
  {
    id: '5',
    email: 'david.brown@tech.com',
    name: 'David Brown',
    status: 'bounced',
    tags: ['Newsletter'],
    createdAt: '2023-09-18T10:00:00Z',
    lastActivity: '2023-12-15T09:00:00Z'
  }
]

export const audiences: Audience[] = [
  { id: '1', name: 'All Subscribers', count: 24580 },
  { id: '2', name: 'VIP Customers', count: 1250 },
  { id: '3', name: 'Newsletter Subscribers', count: 18420 },
  { id: '4', name: 'Product Updates', count: 12890 },
  { id: '5', name: 'Trial Users', count: 3450 },
  { id: '6', name: 'Enterprise Accounts', count: 560 }
]
