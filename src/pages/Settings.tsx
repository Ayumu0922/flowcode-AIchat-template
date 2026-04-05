import { useState } from 'react'
import { Sun, Moon, Monitor, Check, Type } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockUser } from '@/data/mockUser'
import { useThemeStore } from '@/stores/useThemeStore'
import {
  useAppearanceStore,
  fontSizeLabel,
  type FontSize,
} from '@/stores/useAppearanceStore'

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
        <Card>
          <div className="px-4 pb-3">
            <p className="text-sm font-medium">テーマ</p>
          </div>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={theme === t.value ? "flex flex-col items-center gap-1.5 p-3 rounded-lg border border-foreground/30 bg-foreground/[0.04] transition-colors duration-100" : "flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border/60 hover:border-foreground/15 transition-colors duration-100"}
                >
                  <t.icon className={theme === t.value ? "h-5 w-5 text-foreground" : "h-5 w-5 text-muted-foreground"} />
                  <span className={theme === t.value ? "text-xs text-foreground font-medium" : "text-xs text-muted-foreground"}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Font size */}
        <Card>
          <div className="px-4 pb-3">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Type className="h-4 w-4 text-muted-foreground" />
              文字サイズ
            </div>
            <p className="text-xs text-muted-foreground mt-1">アプリ全体の文字サイズを変更します</p>
          </div>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {fontSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={fontSize === size ? "flex flex-col items-center gap-2 p-3 rounded-lg border border-foreground/30 bg-foreground/[0.04] transition-colors duration-100" : "flex flex-col items-center gap-2 p-3 rounded-lg border border-border/60 hover:border-foreground/15 transition-colors duration-100"}
                >
                  <span className={fontSize === size ? (size === 'small' ? "font-medium text-sm text-foreground" : size === 'medium' ? "font-medium text-base text-foreground" : "font-medium text-lg text-foreground") : (size === 'small' ? "font-medium text-sm text-muted-foreground" : size === 'medium' ? "font-medium text-base text-muted-foreground" : "font-medium text-lg text-muted-foreground")}>
                    Aa
                  </span>
                  <span className={fontSize === size ? "text-xs text-foreground font-medium" : "text-xs text-muted-foreground"}>
                    {fontSizeLabel[size]}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">変更は即座に反映されます</p>
          </CardContent>
        </Card>

        {/* Profile */}
        <Card>
          <div className="px-4 pb-3">
            <p className="text-sm font-medium">プロフィール</p>
          </div>
          <div className="px-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex size-12 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten">
                <img src={mockUser.avatar} alt={mockUser.name} className="aspect-square size-full rounded-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{mockUser.name}</p>
                <p className="text-xs text-muted-foreground">{mockUser.role} / {mockUser.department}</p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="flex items-center gap-2 text-xs leading-none font-medium select-none">名前</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="flex items-center gap-2 text-xs leading-none font-medium select-none">メール</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm" />
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <div className="px-4 pb-3">
            <p className="text-sm font-medium">通知</p>
          </div>
          <div className="px-4 space-y-3">
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
                {i < arr.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </Card>

        {/* AI Model */}
        <Card>
          <div className="px-4 pb-3">
            <p className="text-sm font-medium">AIモデル</p>
            <p className="text-xs text-muted-foreground mt-1">使用するモデルを選択</p>
          </div>
          <CardContent>
            <Select value={aiModel} onValueChange={(val) => val && setAiModel(val)}>
              <SelectTrigger>
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
          <button className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground min-w-24 h-8 px-2.5 text-sm font-medium transition-all" onClick={handleSave}>
            {saved ? (
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> 保存済み</span>
            ) : '保存'}
          </button>
        </div>
      </div>
    </div>
  )
}
