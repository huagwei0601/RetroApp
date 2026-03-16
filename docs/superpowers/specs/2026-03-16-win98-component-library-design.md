# Win98 Component Library — Design Spec
_Date: 2026-03-16_

## Overview

Build the Win98 UI component library for the Win98 UI Museum portfolio project. This is the first step per CLAUDE.md build order. All components live in `components/win98/`. A `/showcase` route renders all components in isolation for visual development and portfolio demonstration.

---

## Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| Styling approach | Custom CSS classes in `globals.css` + Tailwind for layout | Single source of truth for Win98 visual rules; prevents Tailwind utilities from leaking (e.g. `rounded-*`) |
| Showcase page | Yes — `app/showcase/page.tsx` | Fast visual feedback loop during development; doubles as portfolio demo |
| Project root | In-place at `/Users/weihuang/RetroApp` | Matches CLAUDE.md directory structure exactly |
| Title bar active | `linear-gradient(to right, var(--win98-titlebar), #1084d0)` | Matches Win98 reference screenshot; `#1084d0` has no standard variable — define `--win98-titlebar-gradient-end: #1084d0` |
| Title bar inactive | `linear-gradient(to right, var(--win98-titlebar-inactive), #b0b0b0)` | Matches reference; define `--win98-titlebar-inactive-gradient-end: #b0b0b0` |
| TitleBar buttons | `16×14px`, `gap: 2px`, raised bevel, `_` bottom-aligned, `□` centered, bold `X` | Validated against reference screenshot |
| Primary button | Raised bevel + wrapper `div` with `outline: 1px solid var(--win98-text)` | Matches Win98 default button indicator from reference screenshot |
| Button states | Secondary (raised), Primary (raised + black ring), Pressed (sunken + 1px offset), Disabled (gray text) | Validated against reference screenshot |

---

## Foundation

### Next.js Scaffold
- Framework: Next.js 14, App Router, TypeScript, Tailwind CSS
- Scaffold in-place at project root (alongside existing `docs/` and `apps/` folders)

### `app/globals.css`
CSS variables match CLAUDE.md exactly, with two additions for gradient endpoints:

```css
:root {
  /* Surfaces */
  --win98-desktop:                    #008080;
  --win98-silver:                     #C0C0C0;

  /* Borders */
  --win98-light:                      #FFFFFF;  /* raised highlight */
  --win98-dark:                       #808080;  /* mid shadow */
  --win98-darker:                     #404040;  /* dark shadow */

  /* Title bars */
  --win98-titlebar:                   #000080;
  --win98-titlebar-inactive:          #808080;
  --win98-titletext:                  #FFFFFF;
  --win98-titlebar-gradient-end:      #1084d0;  /* active titlebar gradient endpoint */
  --win98-titlebar-inactive-gradient-end: #b0b0b0; /* inactive gradient endpoint */

  /* Text */
  --win98-text:                       #000000;
  --win98-disabled:                   #808080;

  /* Selection / highlight */
  --win98-highlight:                  #000080;
  --win98-highlight-text:             #FFFFFF;
}

/* Win98 utility border classes — use CSS variables so Configurator Panel theming works */
.win98-raised {
  border-top:    2px solid var(--win98-light);
  border-left:   2px solid var(--win98-light);
  border-bottom: 2px solid var(--win98-darker);
  border-right:  2px solid var(--win98-darker);
}

.win98-sunken {
  border-top:    2px solid var(--win98-darker);
  border-left:   2px solid var(--win98-darker);
  border-bottom: 2px solid var(--win98-light);
  border-right:  2px solid var(--win98-light);
}

.win98-flat {
  border: 1px solid var(--win98-dark);
}

.win98-window {
  border-top:    2px solid var(--win98-light);
  border-left:   2px solid var(--win98-light);
  border-bottom: 2px solid var(--win98-darker);
  border-right:  2px solid var(--win98-darker);
  background:    var(--win98-silver);
}
```

> **Utility classes use CSS variables** so the Configurator Panel's live variable tweaking propagates through bevel borders automatically. Components must use these class names — never write border values inline in TSX files.

### `app/layout.tsx`
- `font-family: 'MS Sans Serif', Tahoma, sans-serif` (matches CLAUDE.md exactly)
- `font-size: 11px`
- `background: var(--win98-desktop)`
- No `rounded-*`, no `box-shadow`, no transitions

### `lib/types.ts`
Types from ARCHITECTURE.md: `AppConfig`, `AppId`, `WindowState`, `DesktopState`

---

## Components

All components in `components/win98/`. No component imports from modern UI libraries (no shadcn, radix, lucide).

CLAUDE.md `components/win98/` file listing does not include `TextInput.tsx` or `Slider.tsx` — these are defined in `docs/COMPONENTS.md` and must be added to the directory.

### Build Order
Window depends on TitleBar and StatusBar; all others are independent of each other.

1. `Button`
2. `TitleBar`
3. `StatusBar`
4. `Window` (composes TitleBar + StatusBar)
5. `TextInput`
6. `Checkbox`
7. `RadioGroup`
8. `Dropdown`
9. `Scrollbar`
10. `ProgressBar`
11. `Slider`
12. `TabPanel`
13. `Dialog`
14. `Icon`

### Component Specs

All components use CSS variables (`var(--win98-*)`) or the utility classes (`.win98-raised` etc.) for all colors and borders. No hardcoded hex values in TSX files.

#### Button
```typescript
type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  isPrimary?: boolean   // wraps button in <div style="outline: 1px solid var(--win98-text)">
  variant?: 'default' | 'default-wide'
  type?: 'button' | 'submit'
}
```
- Default: `win98-raised`, `background: var(--win98-silver)`, `min-width: 75px`, `height: 23px`, `padding: 0 12px`
- Pressed (`mousedown`): `win98-sunken`, content shifts `1px` down-right (`padding: 1px 11px 0 13px`)
- Disabled: `color: var(--win98-disabled)`, `pointer-events: none`
- Primary: wrapper `<div style={{ outline: '1px solid var(--win98-text)' }}>` around the button element
- No hover state (Win98 has none)
- Keyboard accelerators via `<u>` inside children

#### TitleBar
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
- Active: `background: linear-gradient(to right, var(--win98-titlebar), var(--win98-titlebar-gradient-end))`
- Inactive: `background: linear-gradient(to right, var(--win98-titlebar-inactive), var(--win98-titlebar-inactive-gradient-end))`
- Height: `18px`, padding: `2px 2px 2px 4px`
- Text: `color: var(--win98-titletext)`, `font-weight: 700`, `font-size: 11px`
- Control buttons: `width: 16px`, `height: 14px`, `gap: 2px`, `win98-raised`, `background: var(--win98-silver)`
  - `_` (minimize): `align-items: flex-end`, `padding-bottom: 1px`
  - `□` (maximize): centered
  - `X` (close): centered, `font-weight: 700`, `margin-left: 2px` extra gap from the minimize/maximize pair

#### StatusBar
```typescript
type StatusBarProps = {
  panels: { text: string; width?: number }[]
}
```
- Height: `20px`, `border-top: 1px solid var(--win98-dark)`
- Each panel: `font-size: 10px`, `padding: 0 8px`
- Panels separated by sunken 1px dividers (`:after` pseudo or `<span>` with sunken border)
- `background: var(--win98-silver)`

#### Window
```typescript
type WindowProps = {
  title: string
  icon?: string
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
  statusPanels?: { text: string; width?: number }[]  // passed to StatusBar; omit to hide StatusBar
}
```
- Outer: `win98-window`, `position: fixed`, inline `left/top/width/height` from `position` prop
- Composes `<TitleBar>` and (if `statusPanels` provided) `<StatusBar>`
- Hidden (`display: none`) when `isMinimized`
- `onClick` on outer div calls `onFocus` for z-index management by Desktop
- Drag: `mousedown` on TitleBar `onMouseDown` → track `mousemove` on `document` → call `onDrag({x, y})` → `mouseup` stops

> **statusText removed:** The `statusText?: string` pattern from CLAUDE.md's Window spec is replaced by `statusPanels` which maps directly to `StatusBarProps['panels']`. This avoids an ambiguous string-to-array conversion at the Window boundary.

#### TextInput
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
- Single line: `<input>`, `height: 21px`, `win98-sunken`, `background: var(--win98-light)`, `padding: 2px 4px`
- Disabled: `background: var(--win98-silver)`, `color: var(--win98-disabled)`
- Multiline: `<textarea>`, height via `rows` prop (default 3)

#### Checkbox
```typescript
type CheckboxProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}
```
- Box: `13×13px`, `win98-sunken`, `background: var(--win98-light)`
- Checked: `✓` at `font-size: 10px`
- Disabled: `background: var(--win98-silver)`, `color: var(--win98-disabled)`

#### RadioGroup
```typescript
type RadioGroupProps = {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}
```
- Circle: `12×12px`, `win98-sunken`, `border-radius: 50%`, `background: var(--win98-light)`
- Selected: inner dot `5×5px`, `background: var(--win98-text)`, `border-radius: 50%`
- Disabled: `background: var(--win98-silver)`, label `color: var(--win98-disabled)`

#### Dropdown
```typescript
type DropdownProps = {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  width?: number
}
```
- Input area: `win98-sunken`, `background: var(--win98-light)`, `height: 21px`, `padding: 2px 4px`
- Arrow button: `win98-raised`, `width: 17px`, `▼` at `font-size: 9px`, `background: var(--win98-silver)`
- Open state: `win98-raised` list below, `background: var(--win98-light)`, selected item `background: var(--win98-highlight); color: var(--win98-highlight-text)`
- Disabled: input `background: var(--win98-silver)`, `color: var(--win98-disabled)`
- Close on outside click (`useEffect` + `mousedown` listener)

#### Scrollbar
```typescript
type ScrollbarProps = {
  orientation: 'vertical' | 'horizontal'
  value: number        // 0–100
  onChange: (value: number) => void
  trackLength: number  // px
  disabled?: boolean
}
```
- Width/height: `17px`
- Arrow buttons: `win98-raised`, `background: var(--win98-silver)`, `▲▼◀▶` at `font-size: 8px`
- Thumb: `win98-raised`, `background: var(--win98-silver)`, draggable, positioned by `value` percentage
- Track: `background: var(--win98-silver)`

#### ProgressBar
```typescript
type ProgressBarProps = {
  value: number     // 0–100
  width?: number    // px, default 100%
  animated?: boolean
}
```
- Container: `win98-sunken`, `background: var(--win98-light)`, `height: 16px`, `padding: 2px`
- Fill: `background: var(--win98-highlight)` segments, each `14px` wide, `gap: 2px`
- Segment count scales proportionally to container width: `Math.floor((containerWidth - 4) / 16)` total slots, fill `Math.round(value / 100 * totalSlots)` of them (the `16` = `14px` segment + `2px` gap)
- `animated` prop: cycles filled segments for indeterminate state

#### Slider
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
- Track: `win98-sunken`, `height: 4px`
- Thumb: `win98-raised`, `width: 11px`, `height: 20px`, positioned absolutely by `((value - min) / (max - min)) * 100%`
- Disabled: thumb `background: var(--win98-silver)` (no interaction), `color: var(--win98-disabled)` on label
- Ticks: `font-size: 9px`, `color: var(--win98-disabled)`, rendered below track at `min`, midpoint, `max`

#### TabPanel
```typescript
type TabPanelProps = {
  tabs: { id: string; label: string; content: React.ReactNode }[]
  activeTab: string
  onTabChange: (id: string) => void
}
```
- Active tab: `win98-raised` on top/left/right only (no `border-bottom`), `z-index: 1`, `margin-bottom: -1px` to merge with content area
- Inactive tab: `win98-raised` all sides (normal), slightly shorter via padding, `color: var(--win98-disabled)`
- Content area: `win98-raised` border, `background: var(--win98-silver)`. Active tab's bottom-border removal creates a seamless join with the content border — no double-border artifact at the seam

#### Dialog
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
- Fixed position, centered (`position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%)`)
- Non-resizable, non-draggable (no `onMouseDown` on TitleBar)
- Title bar: rendered inline (not via `<TitleBar>` component) — intentionally avoids importing `<TitleBar>` to prevent null-prop overrides for minimize/maximize. Accepts the one-off gradient duplication. Always rendered as active gradient. Only `X` close button.
- Icon mapping: `info → ℹ️`, `warning → ⚠️`, `error → ❌`, `question → ❓` at `font-size: 32px`
- Icon + message: side-by-side, `gap: 8px`, `padding: 12px`
- Buttons: right-aligned, `gap: 4px`, `padding: 8px`, `border-top: 1px solid var(--win98-dark)`
- Primary button uses `isPrimary` prop on `<Button>` component

#### Icon
```typescript
type IconProps = {
  src: string
  label: string
  size?: 16 | 32
  selected?: boolean
  onDoubleClick?: () => void
  onSingleClick?: () => void
}
```
- Desktop (32px): `<img>` `32×32` + label below, `color: var(--win98-titletext)`, `text-shadow: 1px 1px 0 var(--win98-text)`
- Selected: `background: var(--win98-highlight)` on icon + label area
- Label: `font-size: 11px`, center-aligned, max 2 lines, `overflow: hidden`, `text-overflow: ellipsis`
- Small (16px): inline, no label

---

## Showcase Page

**Route:** `app/showcase/page.tsx`

- Background: `var(--win98-desktop)`
- Header: `color: var(--win98-titletext)`, `font-size: 13px`, bold — "🪟 Win98 Component Library"
- 3-column grid of `win98-raised` panels, each `background: var(--win98-silver)`, `padding: 8px`
- Each panel: component name as bold title + all states rendered (default, pressed/active, disabled where applicable)
- StatusBar at bottom: panels `["14 components", "Win98 UI Museum · v0.1"]`

---

## Prohibited Patterns (enforced across all components)

- No `rounded` or `rounded-*` Tailwind classes
- No `box-shadow`
- No CSS transitions (except window open/close)
- No `blur`, `backdrop-filter`, opacity effects
- No shadcn, radix, lucide, or heroicons
- No hardcoded hex values in TSX component files — use `var(--win98-*)` CSS variables or `.win98-*` utility classes
- No `Inter`, `Geist`, or modern fonts
- No `'Microsoft Sans Serif'` in font stack — use `'MS Sans Serif', Tahoma, sans-serif` per CLAUDE.md
