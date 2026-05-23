'use client'

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'
import { ChartDataPoint } from '@/lib/mock-data'

interface PerformanceChartProps {
  data: ChartDataPoint[]
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Campaign Performance</h3>
          <p className="text-sm text-muted-foreground">Email metrics over time</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-chart-1" />
            <span className="text-xs text-muted-foreground">Sent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-chart-2" />
            <span className="text-xs text-muted-foreground">Opened</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-chart-3" />
            <span className="text-xs text-muted-foreground">Clicked</span>
          </div>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorClicked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis 
              dataKey="date" 
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
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
              itemStyle={{ color: 'var(--muted-foreground)' }}
              formatter={(value: number) => [value.toLocaleString(), '']}
            />
            <Area
              type="monotone"
              dataKey="sent"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSent)"
              name="Sent"
            />
            <Area
              type="monotone"
              dataKey="opened"
              stroke="var(--chart-2)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOpened)"
              name="Opened"
            />
            <Area
              type="monotone"
              dataKey="clicked"
              stroke="var(--chart-3)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorClicked)"
              name="Clicked"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
