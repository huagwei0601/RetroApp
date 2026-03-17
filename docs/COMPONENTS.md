# Win98 Component Library

All components live in `components/win98/`.

---

## Window

The outermost container for every app.

```typescript
type WindowProps = {
  title: string
  icon?: string           // path to 16x16 icon
  width?: number
  height?: number
  position: { x: number; y: number }
  isActive: boolean
  isMinimized: boolean
  noPadding?: boolean     // set true for apps with their own menu bar
  onFocus: () => void
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
  onDrag: (pos: { x: number; y: number }) => void
  children: React.ReactNode
}
```

---

## TitleBar

Used inside Window.

```typescript
type TitleBarProps = {
  title: string
  icon?: string
  isActive: boolean
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
  onMouseDown: (e: React.MouseEvent) => void
}
```

---

## Button

```typescript
type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  isPrimary?: boolean
}
```

**States:** Default: raised. Pressed: sunken, content shifts 1px. Disabled: grey text.

---

## Dialog

```typescript
type DialogProps = {
  title: string
  icon?: 'info' | 'warning' | 'error' | 'question'
  message: string
  buttons: { label: string; onClick: () => void; isPrimary?: boolean }[]
  isOpen: boolean
  onClose: () => void
}
```

Draggable. Centered by default (fixed position).

---

## Scrollbar

```typescript
type ScrollbarProps = {
  orientation: 'vertical' | 'horizontal'
  value: number          // 0–100
  onChange: (value: number) => void
  trackLength?: number   // px — used for horizontal only; vertical uses 100% height
  disabled?: boolean
}
```

Vertical scrollbar uses `ResizeObserver` to measure its own height.

---

## Slider

```typescript
type SliderProps = {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  disabled?: boolean
  label?: string
  showTicks?: boolean
}
```

Square 12×12 thumb, centered on 4px track.

---

## PixelAvatar

Canvas-based circular avatar with pixel-art upscaling.

```typescript
type PixelAvatarProps = {
  size: number
  src?: string
  background?: string
  borderColor?: string
  borderWidth?: number
  scale?: number
  smooth?: boolean
  children?: ReactNode
  style?: CSSProperties
}
```

Uses `image-rendering: pixelated` for retro look. No CORS restrictions (never calls `getImageData`).

---

## Usage Notes

- Always wrap app content in `<Window>`
- Set `noPadding` on Window for apps that have their own menu bar (Spotify, Instagram)
- Never add `border-radius` to any component (except RadioGroup — removed)
- All components use `var(--win98-*)` CSS variables — no hardcoded hex in TSX
