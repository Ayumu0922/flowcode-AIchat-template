import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'
import { typingDot } from '@/lib/motion'

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="flex gap-3 max-w-3xl"
    >
      <div className="relative flex size-7 shrink-0 mt-0.5 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten">
        <div className="flex size-full items-center justify-center rounded-full bg-icon-accent text-icon-accent-fg">
          <Bot className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="bg-bubble-ai rounded-2xl px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"
            {...typingDot(i)}
          />
        ))}
      </div>
    </motion.div>
  )
}
