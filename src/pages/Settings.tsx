import { useState } from 'react'
import { Sun, Moon, Monitor, Check, Type } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockUser } from '@/data/mockUser'
import { useThemeStore } from '@/stores/useThemeStore'
import {
  useAppearanceStore,
  fontSizeLabel,
  type FontSize,
} from '@/stores/useAppearanceStore'
import { cn } from '@/lib/utils'

const fontSizes: FontSize[] = ['small', 'medium', 'large']

export function Settings() {
  const { theme, setTheme } = useThemeStore()
  const { fontSize, setFontSize } = useAppearanceStore()
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState(mockUser.name)
  const [email, setEmail] = useState(mockUser.email)
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    weekly: true,
  })
  const [aiModel, setAiModel] = useState('gpt-4o')

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const themes = [
    { value: 'light' as const, label: 'ライト', icon: Sun },
    { value: 'dark' as const, label: 'ダーク', icon: Moon },
    { value: 'system' as const, label: 'システム', icon: Monitor },
  ]

  return (
    <div className="flex-1 p-6 md:p-8 overflow-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">設定</h1>

        {/* Theme */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">テーマ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-colors duration-100',
                    theme === t.value
                      ? 'border-foreground/30 bg-foreground/[0.04]'
                      : 'border-border/60 hover:border-foreground/15',
                  )}
                >
                  <t.icon className={cn('h-5 w-5', theme === t.value ? 'text-foreground' : 'text-muted-foreground')} />
                  <span className={cn('text-xs', theme === t.value ? 'text-foreground font-medium' : 'text-muted-foreground')}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Font size */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-1.5">
              <Type className="h-4 w-4 text-muted-foreground" />
              文字サイズ
            </CardTitle>
            <CardDescription className="text-xs">アプリ全体の文字サイズを変更します</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {fontSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors duration-100',
                    fontSize === size
                      ? 'border-foreground/30 bg-foreground/[0.04]'
                      : 'border-border/60 hover:border-foreground/15',
                  )}
                >
                  <span
                    className={cn(
                      'font-medium',
                      size === 'small' && 'text-sm',
                      size === 'medium' && 'text-base',
                      size === 'large' && 'text-lg',
                      fontSize === size ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    Aa
                  </span>
                  <span className={cn('text-xs', fontSize === size ? 'text-foreground font-medium' : 'text-muted-foreground')}>
                    {fontSizeLabel[size]}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">変更は即座に反映されます</p>
          </CardContent>
        </Card>

        {/* Profile */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">プロフィール</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="bg-foreground/10 text-foreground font-medium">
                  {mockUser.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{mockUser.name}</p>
                <p className="text-xs text-muted-foreground">{mockUser.role} / {mockUser.department}</p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">名前</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">メール</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg h-9" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">通知</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { key: 'email' as const, label: 'メール通知', desc: '重要な更新をメールで受け取る' },
              { key: 'browser' as const, label: 'ブラウザ通知', desc: 'デスクトップにプッシュ通知を表示' },
              { key: 'weekly' as const, label: '週次レポート', desc: '毎週の利用状況レポート' },
            ].map((item, i, arr) => (
              <div key={item.key}>
                <div className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-sm text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(checked) =>
                      setNotifications((n) => ({ ...n, [item.key]: checked }))
                    }
                  />
                </div>
                {i < arr.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Model */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">AIモデル</CardTitle>
            <CardDescription className="text-xs">使用するモデルを選択</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={aiModel} onValueChange={(val) => val && setAiModel(val)}>
              <SelectTrigger className="rounded-lg h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o（推奨）</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4o mini（高速）</SelectItem>
                <SelectItem value="claude-sonnet">Claude Sonnet</SelectItem>
                <SelectItem value="claude-opus">Claude Opus</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground mt-1.5">次の会話から反映されます</p>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex justify-end pb-8">
          <Button onClick={handleSave} className="rounded-lg min-w-24">
            {saved ? (
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> 保存済み</span>
            ) : '保存'}
          </Button>
        </div>
      </div>
    </div>
  )
}
