import { NavLink, useNavigate } from 'react-router'
import {
  LayoutDashboard,
  MessageSquare,
  Clock,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  Monitor,
  Plus,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { mockUser } from '@/data/mockUser'
import { useThemeStore } from '@/stores/useThemeStore'
import { useSidebarStore } from '@/stores/useSidebarStore'
import { useChatStore } from '@/stores/useChatStore'
import { cn } from '@/lib/utils'
import { theme as t } from '@/lib/theme'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'ダッシュボード' },
  { to: '/chat', icon: MessageSquare, label: 'チャット' },
  { to: '/history', icon: Clock, label: '会話履歴' },
  { to: '/settings', icon: Settings, label: '設定' },
  { to: '/help', icon: HelpCircle, label: 'ヘルプ' },
]

export function Sidebar() {
  const { theme, setTheme } = useThemeStore()
  const { open, toggle } = useSidebarStore()
  const createNewConversation = useChatStore((s) => s.createNewConversation)
  const navigate = useNavigate()

  const handleNewChat = () => {
    const id = createNewConversation()
    navigate(`/chat/${id}`)
  }

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col bg-sidebar h-screen sticky top-0 border-r border-border transition-[width] duration-200 ease-out overflow-hidden',
        open ? 'w-[260px]' : 'w-[52px]',
      )}
    >
      {/* Top */}
      <div className={cn('flex items-center gap-1 p-2', open ? '' : 'flex-col')}>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="h-8 w-8 shrink-0"
          title={open ? 'サイドバーを閉じる' : 'サイドバーを開く'}
        >
          {open ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </Button>

        {open ? (
          <Button
            onClick={handleNewChat}
            variant="outline"
            className="flex-1 justify-start gap-2 rounded-lg text-sm h-8 border-border/60"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            新しいチャット
          </Button>
        ) : (
          <Button
            onClick={handleNewChat}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="新しいチャット"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className={cn('flex-1 overflow-auto space-y-0.5', open ? 'px-2' : 'px-1.5')}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={open ? undefined : item.label}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-lg transition-colors duration-100',
                open ? 'gap-3 px-3 py-2 text-sm' : 'justify-center h-8 w-8 mx-auto',
                isActive
                  ? cn(t.surface.active, 'text-foreground font-medium')
                  : cn('text-muted-foreground hover:text-foreground', t.surface.hover),
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {open && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <Separator />

      {/* Bottom */}
      <div className={cn('space-y-0.5', open ? 'p-2' : 'p-1.5')}>
        {/* Theme */}
        <DropdownMenu>
          {open ? (
            <DropdownMenuTrigger
              render={
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors w-full text-left" />
              }
            >
              {theme === 'light' && <Sun className="h-4 w-4 shrink-0" />}
              {theme === 'dark' && <Moon className="h-4 w-4 shrink-0" />}
              {theme === 'system' && <Monitor className="h-4 w-4 shrink-0" />}
              テーマ
            </DropdownMenuTrigger>
          ) : (
            <DropdownMenuTrigger
              render={
                <button
                  className="flex items-center justify-center h-8 w-8 mx-auto rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
                  title="テーマ"
                />
              }
            >
              {theme === 'light' && <Sun className="h-4 w-4" />}
              {theme === 'dark' && <Moon className="h-4 w-4" />}
              {theme === 'system' && <Monitor className="h-4 w-4" />}
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun className="h-4 w-4 mr-2" /> ライト
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon className="h-4 w-4 mr-2" /> ダーク
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <Monitor className="h-4 w-4 mr-2" /> システム
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User */}
        <div className={cn('flex items-center', open ? 'gap-3 px-3 py-2' : 'justify-center py-1')}>
          <Avatar className="h-7 w-7 shrink-0" title={open ? undefined : mockUser.name}>
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback className="bg-foreground/10 text-foreground text-[10px] font-medium">
              {mockUser.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          {open && <span className="text-sm text-foreground truncate">{mockUser.name}</span>}
        </div>
      </div>
    </aside>
  )
}
