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
import { mockUser } from '@/data/mockUser'
import { useThemeStore } from '@/stores/useThemeStore'
import { useChatStore } from '@/stores/useChatStore'

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
                <Button variant="ghost" size="icon" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>AI Assistant</SheetTitle>
              </SheetHeader>

              <div className="px-3 pb-2">
                <button
                  onClick={handleNewChat}
                  className="w-full inline-flex items-center justify-start gap-2 rounded-lg border border-border/60 bg-background text-sm h-9 px-2.5 font-medium transition-all hover:bg-muted hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                  新しいチャット
                </button>
              </div>

              <Separator />

              <nav className="p-2 space-y-0.5">
                {navItems.map((item) => (
                  <button
                    key={item.to}
                    onClick={() => navigate(item.to)}
                    className={location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to)) ? "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left bg-surface-active text-foreground font-medium" : "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left text-muted-foreground hover:text-foreground hover:bg-surface-hover"}
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
                  className={theme === 'light' ? "flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left bg-surface-active" : "flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left text-muted-foreground"}
                >
                  <Sun className="h-4 w-4" /> ライト
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={theme === 'dark' ? "flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left bg-surface-active" : "flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left text-muted-foreground"}
                >
                  <Moon className="h-4 w-4" /> ダーク
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={theme === 'system' ? "flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left bg-surface-active" : "flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left text-muted-foreground"}
                >
                  <Monitor className="h-4 w-4" /> システム
                </button>
              </div>

              <Separator />

              <div className="p-3">
                <div className="flex items-center gap-3 px-1">
                  <div className="relative flex size-7 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten">
                    <img src={mockUser.avatar} alt={mockUser.name} className="aspect-square size-full rounded-full object-cover" />
                  </div>
                  <span className="text-sm">{mockUser.name}</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <span className="text-sm font-medium">{title}</span>
        </div>

        <div className="relative flex size-7 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten">
          <img src={mockUser.avatar} alt={mockUser.name} className="aspect-square size-full rounded-full object-cover" />
        </div>
      </div>
    </header>
  )
}
