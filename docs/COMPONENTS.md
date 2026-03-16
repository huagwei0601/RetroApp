# Win98 Component Library

All components live in `components/win98/`. Build these before any app.

---

## Window

The outermost container for every app and panel.

```typescript
type WindowProps = {
  title: string
  icon?: string           // path to 16x16 icon
  width?: number
  height?: number
  position: { x: number; y: number }
  isActive: boolean
  isMinimized: boolean
  onFocus: () => void
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
  onDrag: (pos: { x: number; y: number }) => void
  children: React.ReactNode
  statusText?: string     // shown in status bar
}
```

**Visual structure:**
```
┌─────────────────────────────────────┐  ← win98-raised outer border
│ [icon] Title Text        [_][□][×]  │  ← title bar
├─────────────────────────────────────┤
│ [Menu Bar if present]               │
├─────────────────────────────────────┤
│                                     │
│  Content Area                       │
│                                     │
├─────────────────────────────────────┤
│ Status text here          Panel 2   │  ← status bar
└─────────────────────────────────────┘
```

**Drag behavior:** Mousedown on title bar → track mousemove → update position → mouseup stops.

---

## TitleBar

Used inside Window. Rarely used standalone.

```typescript
type TitleBarProps = {
  title: string
  icon?: string
  isActive: boolean
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
  onMouseDown: (e: React.MouseEvent) => void  // for drag
}
```

---

## Button

```typescript
type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'default-wide'
  type?: 'button' | 'submit'
}
```

**States:**
- Default: raised border, `#C0C0C0` bg
- Hover: no change (Win98 has no hover state on buttons)
- Active/pressed: sunken border, content shifts 1px down-right
- Disabled: text color `#808080`, no border change, no cursor change

---

## Checkbox

```typescript
type CheckboxProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}
```

Visual: 13x13 sunken box, checkmark drawn with `✓` character or CSS, label to the right with 4px gap.

---

## RadioGroup

```typescript
type RadioGroupProps = {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}
```

Visual: Each option is a 12x12 sunken circle + label. Selected state has filled inner dot.

---

## Dropdown (Select)

```typescript
type DropdownProps = {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  width?: number
}
```

Visual: White sunken input area + raised arrow button on right. Opens a raised list below. Selected item highlighted in `#000080`.

---

## Scrollbar

```typescript
type ScrollbarProps = {
  orientation: 'vertical' | 'horizontal'
  value: number          // 0–100
  onChange: (value: number) => void
  trackLength: number    // px
}
```

Visual: Raised arrow buttons at each end, draggable raised thumb in between. Track is `#C0C0C0` with checkered pattern optional.

---

## StatusBar

```typescript
type StatusBarProps = {
  panels: { text: string; width?: number }[]
}
```

Visual: 20px tall, 1px top border `#808080`. Each panel separated by a sunken 1px divider. Text is 10px.

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

Visual: Centered window (fixed position, no resize), icon on left, message text, buttons right-aligned at bottom. Standard Win98 error/info dialog appearance.

---

## TabPanel

```typescript
type TabPanelProps = {
  tabs: { id: string; label: string; content: React.ReactNode }[]
  activeTab: string
  onTabChange: (id: string) => void
}
```

Visual: Tabs along top. Active tab: `#C0C0C0`, raised on top/left/right, merges with content area (no bottom border). Inactive tab: slightly smaller, with bottom border. Content area has raised border.

---

## ProgressBar

```typescript
type ProgressBarProps = {
  value: number      // 0–100
  width?: number
  animated?: boolean // moves blocks for indeterminate state
}
```

Visual: Sunken container, filled with `#000080` segments separated by 2px gaps. Classic Win98 chunky style.

---

## Icon (Desktop / Menu)

```typescript
type IconProps = {
  src: string          // path to pixel art PNG
  label: string
  size?: 16 | 32
  selected?: boolean
  onDoubleClick?: () => void
  onSingleClick?: () => void
}
```

Visual (desktop): 32x32 image, label below in white text with 1px black shadow. Selected: blue box around icon + label. Font: 11px, center-aligned, max 2 lines with ellipsis.

---

## TextInput

```typescript
type TextInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  width?: number
  multiline?: boolean
  rows?: number
}
```

Visual: White background, sunken border, 11px font, 2px 4px padding.

---

## Slider

```typescript
type SliderProps = {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  label?: string
  showTicks?: boolean
}
```

Visual: Horizontal track (sunken, thin), raised diamond thumb. Optional tick marks below.

---

## Usage Notes

- Always compose with `Window` as the outer container
- Never add border-radius to any of these components
- All interactive components need proper focus styles (dotted 1px outline inside, Win98 style)
- Keyboard navigation: Tab through controls, Enter/Space to activate
- All components should work at base 11px font size
