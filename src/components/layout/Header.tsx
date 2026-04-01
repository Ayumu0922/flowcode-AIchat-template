import { useLocation, useNavigate } from 'react-router'
import {
  Menu,
  LayoutDashboard,
  MessageSquare,
  Clock,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  Monitor,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockUser } from '@/data/mockUser'
import { useThemeStore } from '@/stores/useThemeStore'
import { useChatStore } from '@/stores/useChatStore'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'ダッシュボード' },
  { to: '/chat', icon: MessageSquare, label: 'チャット' },
  { to: '/history', icon: Clock, label: '会話履歴' },
  { to: '/settings', icon: Settings, label: '設定' },
  { to: '/help', icon: HelpCircle, label: 'ヘルプ' },
]

const pageTitles: Record<string, string> = {
  '/': 'ダッシュボード',
  '/chat': 'チャット',
  '/history': '会話履歴',
  '/settings': '設定',
  '/help': 'ヘルプ',
}

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, setTheme } = useThemeStore()
  const createNewConversation = useChatStore((s) => s.createNewConversation)

  const pathBase = '/' + (location.pathname.split('/')[1] || '')
  const title = pageTitles[pathBase] || 'チャット'

  const handleNewChat = () => {
    const id = createNewConversation()
    navigate(`/chat/${id}`)
  }

  return (
    <header className="md:hidden sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-3 h-12">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="h-8 w-8" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetHeader className="p-4 pb-2">
                <SheetTitle className="text-base font-semibold">AI Assistant</SheetTitle>
              </SheetHeader>

              <div className="px-3 pb-2">
                <Button
                  onClick={handleNewChat}
                  variant="outline"
                  className="w-full justify-start gap-2 rounded-lg text-sm h-9 border-border/60"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                  新しいチャット
                </Button>
              </div>

              <Separator />

              <nav className="p-2 space-y-0.5">
                {navItems.map((item) => (
                  <button
                    key={item.to}
                    onClick={() => navigate(item.to)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left',
                      location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))
                        ? 'bg-surface-active text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover',
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </nav>

              <Separator />

              <div className="p-2 space-y-0.5">
                <button
                  onClick={() => setTheme('light')}
                  className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left', theme === 'light' ? 'bg-surface-active' : 'text-muted-foreground')}
                >
                  <Sun className="h-4 w-4" /> ライト
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left', theme === 'dark' ? 'bg-surface-active' : 'text-muted-foreground')}
                >
                  <Moon className="h-4 w-4" /> ダーク
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left', theme === 'system' ? 'bg-surface-active' : 'text-muted-foreground')}
                >
                  <Monitor className="h-4 w-4" /> システム
                </button>
              </div>

              <Separator />

              <div className="p-3">
                <div className="flex items-center gap-3 px-1">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback className="bg-foreground/10 text-foreground text-[10px]">
                      {mockUser.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{mockUser.name}</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <span className="text-sm font-medium">{title}</span>
        </div>

        <Avatar className="h-7 w-7">
          <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
          <AvatarFallback className="bg-foreground/10 text-foreground text-[10px]">
            {mockUser.name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
