# 自定義滾動條使用指南

## 概述

這個自定義滾動條取代了原生的瀏覽器滾動條，提供了更好的使用者體驗和視覺效果。

## 特色功能

### 1. 🎯 **隱藏原生滾動條**

- 完全隱藏瀏覽器的原生滾動條
- 支援所有主流瀏覽器（Chrome、Firefox、Safari、Edge）
- 保持原生的滾動功能（滑鼠滾輪、觸控等）

### 2. 📊 **視覺化滾動進度**

- 實時顯示滾動進度百分比
- 漸層色彩設計（藍色到紫色）
- 動態高度調整的滾動指示器

### 3. 🖱️ **互動功能**

- **點擊跳轉**：點擊滾動條任意位置快速跳轉
- **拖拽滑動**：拖拽滾動條進行精確控制
- **懸停效果**：滑鼠懸停時顯示詳細資訊

### 4. ✨ **動畫效果**

- 滑順的過渡動畫
- 懸停時的縮放效果
- 進度百分比的淡入淡出

## 組件結構

### CustomScrollBar.tsx

```typescript
// 主要功能：
;-滾動進度追蹤 - 點擊 / 拖拽事件處理 - 動畫效果管理 - 響應式設計
```

### 關鍵部分：

1. **滾動軌道**：背景灰色圓角軌道
2. **滾動指示器**：動態高度的漸層色條
3. **拖拽手柄**：白色圓形手柄，可拖拽
4. **進度百分比**：懸停時顯示的數值

## CSS 設定

### 隱藏原生滾動條

```css
/* 隱藏 Webkit 滾動條 */
::-webkit-scrollbar {
  display: none;
}

/* 隱藏 Firefox 滾動條 */
html {
  scrollbar-width: none;
}

/* 隱藏 IE/Edge 滾動條 */
html {
  -ms-overflow-style: none;
}
```

## 使用方法

### 1. 基本整合

組件已經整合到 `layout.tsx` 中，會自動在所有頁面顯示：

```tsx
<LenisProvider>
  <Header />
  {children}
  <CustomScrollBar />
</LenisProvider>
```

### 2. 自訂樣式

可以透過修改 `CustomScrollBar.tsx` 來調整：

```typescript
// 位置調整
className = 'fixed right-4 top-0 h-full'

// 尺寸調整
className = 'h-[80vh] w-2'

// 顏色調整
className = 'bg-gradient-to-b from-blue-500 to-purple-600'
```

### 3. 響應式設計

組件包含響應式設計，會根據螢幕尺寸自動調整：

```typescript
// 手機裝置上的調整
@media (max-width: 768px) {
  // 可以在 CSS 中添加特定樣式
}
```

## 高階自訂

### 1. 修改動畫效果

```typescript
// 調整動畫持續時間
transition={{ duration: 0.3 }}

// 調整懸停縮放比例
animate={{ scale: isHovered ? 1.5 : 1 }}
```

### 2. 自訂顏色主題

```typescript
// 暗色主題
className = 'bg-gray-800 dark:bg-gray-200'

// 自訂漸層
className = 'bg-gradient-to-b from-red-500 to-yellow-500'
```

### 3. 調整滾動敏感度

```typescript
// 在 LenisProvider 中調整
wheelMultiplier: 1.5,     // 增加滾輪敏感度
touchMultiplier: 3,       // 增加觸控敏感度
```

## 效能考量

### 1. 記憶體優化

- 使用 `useCallback` 包裝事件處理函數
- 適當的 dependency array 設定
- 及時清理事件監聽器

### 2. 渲染優化

- 使用 `motion.div` 的 `style` 屬性進行動畫
- 避免不必要的重新渲染
- 使用 `useTransform` 進行高效的值轉換

### 3. 無障礙性

- 提供鍵盤導航支援
- 適當的 ARIA 標籤
- 高對比度模式支援

## 故障排除

### 1. 滾動條不顯示

- 確認 `LenisProvider` 正確包裝
- 檢查 CSS 是否正確載入
- 確認頁面內容足夠長

### 2. 拖拽功能異常

- 檢查事件監聽器是否正確綁定
- 確認滑鼠事件沒有被其他元素攔截
- 檢查 `z-index` 設定

### 3. 動畫效果卡頓

- 減少動畫複雜度
- 使用 `will-change` CSS 屬性
- 檢查是否有其他高耗能動畫

## 最佳實踐

1. **保持簡潔**：不要添加過多的視覺效果
2. **注意可用性**：確保在所有裝置上都能正常使用
3. **測試thoroughly**：在不同瀏覽器和裝置上測試
4. **效能監控**：定期檢查滾動效能
5. **使用者回饋**：收集使用者對滾動體驗的反饋

這個自定義滾動條為你的網站提供了專業且現代化的滾動體驗！
