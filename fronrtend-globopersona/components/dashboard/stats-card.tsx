import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  iconColor?: string
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'bg-primary/10 text-primary'
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-border/80 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-card-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <p className={cn(
              'text-xs font-medium',
              changeType === 'positive' && 'text-success',
              changeType === 'negative' && 'text-destructive',
              changeType === 'neutral' && 'text-muted-foreground'
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn('rounded-lg p-2.5', iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
