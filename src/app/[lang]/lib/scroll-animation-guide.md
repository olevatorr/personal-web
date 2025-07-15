# Lenis + Motion 滑順滾動動畫使用指南

## 基本設定

### 1. 安裝套件

```bash
npm install lenis motion
```

### 2. 基本配置

已經在 `layout.tsx` 中設定了 `LenisProvider`，包含以下配置：

```typescript
new Lenis({
  duration: 1.2, // 滾動動畫持續時間
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 緩動函數
  orientation: 'vertical', // 滾動方向
  smoothWheel: true, // 啟用滑鼠滾輪平滑
  wheelMultiplier: 1, // 滾輪靈敏度
  touchMultiplier: 2, // 觸控靈敏度
  infinite: false // 無限滾動
})
```

## 主要 Hook 使用方法

### 1. useScrollMotion()

獲取滾動狀態和 Lenis 實例：

```typescript
import { useScrollMotion } from '@/app/[lang]/lib/useScrollMotion'

const { scrollY, scrollProgress, lenis } = useScrollMotion()
```

### 2. useParallax(offset)

建立視差效果：

```typescript
import { useParallax } from '@/app/[lang]/lib/useScrollMotion'

const parallaxY = useParallax(0.5) // 0.5 倍的視差效果
```

### 3. useScrollOpacity(start, end)

基於滾動位置控制透明度：

```typescript
import { useScrollOpacity } from '@/app/[lang]/lib/useScrollMotion'

const opacity = useScrollOpacity(0, 300) // 從 0px 到 300px 的滾動範圍
```

## 實用範例

### 1. 基本滾動動畫

```typescript
import { motion } from 'motion/react'
import { useScrollMotion } from '@/app/[lang]/lib/useScrollMotion'

export default function ScrollComponent() {
  const { scrollY } = useScrollMotion()

  return (
    <motion.div
      style={{ y: scrollY }}
      className="h-screen bg-blue-500"
    >
      內容會跟著滾動移動
    </motion.div>
  )
}
```

### 2. 視差效果

```typescript
import { motion } from 'motion/react'
import { useParallax } from '@/app/[lang]/lib/useScrollMotion'

export default function ParallaxSection() {
  const parallaxY = useParallax(0.5)

  return (
    <motion.div
      style={{ y: parallaxY }}
      className="h-screen bg-gradient-to-br from-purple-500 to-blue-600"
    >
      背景會以不同速度移動
    </motion.div>
  )
}
```

### 3. 滾動進度指示器

```typescript
import { motion } from 'motion/react'
import { useScrollMotion } from '@/app/[lang]/lib/useScrollMotion'

export default function ScrollProgress() {
  const { scrollProgress } = useScrollMotion()

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
      style={{ scaleX: scrollProgress, originX: 0 }}
    />
  )
}
```

### 4. 滾動觸發動畫

```typescript
import { motion } from 'motion/react'

export default function ScrollTrigger() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="p-8"
    >
      進入視窗時觸發動畫
    </motion.div>
  )
}
```

## 最佳實踐

1. **效能優化**：
   - 使用 `viewport={{ once: true }}` 避免重複觸發
   - 適度使用視差效果，避免過度渲染

2. **使用者體驗**：
   - 設定合適的 `duration` 和 `easing`
   - 在行動裝置上調整 `touchMultiplier`

3. **無障礙性**：
   - 提供關閉動畫的選項
   - 確保重要內容不依賴滾動動畫

## 進階功能

### 程式化滾動

```typescript
const { lenis } = useScrollMotion()

// 滾動到特定位置
lenis?.scrollTo(1000)

// 滾動到特定元素
lenis?.scrollTo('#target-element')

// 滾動到頂部
lenis?.scrollTo(0)
```

### 監聽滾動事件

```typescript
useEffect(() => {
  if (!lenis) return

  const handleScroll = ({ scroll, limit, velocity, direction, progress }) => {
    console.log('滾動資訊:', { scroll, limit, velocity, direction, progress })
  }

  lenis.on('scroll', handleScroll)

  return () => {
    lenis.off('scroll', handleScroll)
  }
}, [lenis])
```

這個配置為你提供了完整的 Lenis + Motion 滑順滾動解決方案！
