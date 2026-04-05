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
    <aside className={open ? "hidden md:flex flex-col bg-sidebar h-screen sticky top-0 border-r border-border transition-[width] duration-200 ease-out overflow-hidden w-[260px]" : "hidden md:flex flex-col bg-sidebar h-screen sticky top-0 border-r border-border transition-[width] duration-200 ease-out overflow-hidden w-[52px]"}>
      {/* Top */}
      <div className={open ? "flex items-center gap-1 p-2" : "flex items-center gap-1 p-2 flex-col"}>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          title={open ? 'サイドバーを閉じる' : 'サイドバーを開く'}
        >
          {open ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </Button>

        {open ? (
          <button
            onClick={handleNewChat}
            className="flex-1 inline-flex items-center justify-start gap-2 rounded-lg border border-border/60 bg-background text-sm h-8 px-2.5 font-medium transition-all hover:bg-muted hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
            新しいチャット
          </button>
        ) : (
          <Button
            onClick={handleNewChat}
            variant="ghost"
            size="icon"
            title="新しいチャット"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className={open ? "flex-1 overflow-auto space-y-0.5 px-2" : "flex-1 overflow-auto space-y-0.5 px-1.5"}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={open ? undefined : item.label}
            className={({ isActive }) =>
              isActive
                ? (open ? "flex items-center rounded-lg transition-colors duration-100 gap-3 px-3 py-2 text-sm bg-surface-active text-foreground font-medium" : "flex items-center rounded-lg transition-colors duration-100 justify-center h-8 w-8 mx-auto bg-surface-active text-foreground font-medium")
                : (open ? "flex items-center rounded-lg transition-colors duration-100 gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-surface-hover" : "flex items-center rounded-lg transition-colors duration-100 justify-center h-8 w-8 mx-auto text-muted-foreground hover:text-foreground hover:bg-surface-hover")
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {open && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <Separator />

      {/* Bottom */}
      <div className={open ? "space-y-0.5 p-2" : "space-y-0.5 p-1.5"}>
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
          <DropdownMenuContent align="start">
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
        <div className={open ? "flex items-center gap-3 px-3 py-2" : "flex items-center justify-center py-1"}>
          <div className="relative flex size-7 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten" title={open ? undefined : mockUser.name}>
            <img src={mockUser.avatar} alt={mockUser.name} className="aspect-square size-full rounded-full object-cover" />
          </div>
          {open && <span className="text-sm text-foreground truncate">{mockUser.name}</span>}
        </div>
      </div>
    </aside>
  )
}
