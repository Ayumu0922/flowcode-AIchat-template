export interface DashboardStats {
  todayConversations: number
  totalMessages: number
  avgResponseTime: string
  activeUsers: number
  weeklyTrend: number[]
}

export const mockStats: DashboardStats = {
  todayConversations: 24,
  totalMessages: 1847,
  avgResponseTime: '1.2秒',
  activeUsers: 156,
  weeklyTrend: [12, 18, 15, 22, 28, 24, 31],
}
