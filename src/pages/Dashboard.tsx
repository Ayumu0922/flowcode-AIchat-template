import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Zap,
  Clock,
  Users,
  ArrowRight,
  Plus,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockStats } from '@/data/mockStats'
import { mockConversations } from '@/data/mockConversations'
import { useChatStore } from '@/stores/useChatStore'
import { barGrow } from '@/lib/motion'
import { theme } from '@/lib/theme'

const stats = [
  { label: '今日の会話', value: mockStats.todayConversations, icon: MessageSquare, change: '+12%' },
  { label: '総メッセージ数', value: mockStats.totalMessages.toLocaleString(), icon: Zap, change: '+8%' },
  { label: '平均応答時間', value: mockStats.avgResponseTime, icon: Clock, change: '-15%' },
  { label: 'アクティブユーザー', value: mockStats.activeUsers, icon: Users, change: '+5%' },
]

export function Dashboard() {
  const navigate = useNavigate()
  const createNewConversation = useChatStore((s) => s.createNewConversation)

  const handleNewChat = () => {
    createNewConversation()
    navigate('/chat')
  }

  return (
    <div className="flex-1 p-6 md:p-8 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">ダッシュボード</h1>
            <p className="text-sm text-muted-foreground mt-1">利用状況の概要</p>
          </div>
          <Button onClick={handleNewChat} variant="outline" className="gap-2 rounded-lg">
            <Plus className="h-4 w-4" />
            新しいチャット
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/60">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly trend */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">今週のアクティビティ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-28">
              {mockStats.weeklyTrend.map((val, i) => {
                const maxVal = Math.max(...mockStats.weeklyTrend)
                const height = (val / maxVal) * 100
                const days = ['月', '火', '水', '木', '金', '土', '日']
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      variants={barGrow(0.1 + i * 0.03)}
                      initial="initial"
                      animate="animate"
                      style={{ height: `${height}%`, originY: 1 }}
                      className={`w-full rounded ${theme.bar.fill} ${theme.bar.hover} transition-colors cursor-default relative group`}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {val}
                      </span>
                    </motion.div>
                    <span className="text-[10px] text-muted-foreground">{days[i]}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent conversations */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-muted-foreground">最近の会話</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/history')}
              className="gap-1 text-muted-foreground hover:text-foreground text-xs h-7"
            >
              すべて見る
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-0.5">
            {mockConversations.slice(0, 4).map((conv) => (
              <button
                key={conv.id}
                className={`w-full text-left px-3 py-2.5 rounded-lg ${theme.surface.hover} transition-colors flex items-center gap-3`}
                onClick={() => navigate(`/chat/${conv.id}`)}
              >
                <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground truncate">{conv.title}</span>
                    <Badge variant="secondary" className="text-[10px] shrink-0 font-normal h-4">
                      {conv.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.preview}</p>
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0">
                  {new Date(conv.updatedAt).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
