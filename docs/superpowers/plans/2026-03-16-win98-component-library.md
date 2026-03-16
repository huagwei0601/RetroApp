# Win98 Component Library Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js 14 app and build 14 Win98 UI components plus a `/showcase` page that renders all of them.

**Architecture:** Custom Win98 utility classes (`win98-raised`, `win98-sunken`, etc.) defined in `globals.css` using CSS variables. Components are thin TSX wrappers that apply these classes — no hardcoded hex in TSX files. Showcase page acts as the visual test harness.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS (layout only), React Testing Library + Jest for unit tests

**Spec:** `docs/superpowers/specs/2026-03-16-win98-component-library-design.md`

---

## Chunk 1: Project Scaffold + Foundation

### Task 1: Scaffold Next.js 14 project

**Files:**
- Create: `package.json`, `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`

- [ ] **Step 1: Scaffold the project**

Run from `/Users/weihuang/RetroApp`:
```bash
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir --no-eslint --import-alias "@/*"
```
When prompted "would you like to overwrite?" — accept. The scaffold adds `app/`, `public/`, config files alongside the existing `docs/` folder.

- [ ] **Step 2: Remove boilerplate**

```bash
rm -f app/page.tsx app/globals.css public/vercel.svg public/next.svg
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```
Expected: server starts on `http://localhost:3000` with no errors (404 on `/` is fine). Kill with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 14 project"
```

---

### Task 2: Write `globals.css`

**Files:**
- Create: `app/globals.css`

- [ ] **Step 1: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Surfaces */
  --win98-desktop:                        #008080;
  --win98-silver:                         #C0C0C0;

  /* Borders */
  --win98-light:                          #FFFFFF;
  --win98-dark:                           #808080;
  --win98-darker:                         #404040;

  /* Title bars */
  --win98-titlebar:                       #000080;
  --win98-titlebar-inactive:              #808080;
  --win98-titletext:                      #FFFFFF;
  --win98-titlebar-gradient-end:          #1084d0;
  --win98-titlebar-inactive-gradient-end: #b0b0b0;

  /* Text */
  --win98-text:                           #000000;
  --win98-disabled:                       #808080;

  /* Selection */
  --win98-highlight:                      #000080;
  --win98-highlight-text:                 #FFFFFF;
}

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

/* Reset browser button defaults */
.win98-btn-reset {
  appearance: none;
  -webkit-appearance: none;
  border-radius: 0;
  cursor: default;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  font-size: 11px;
}
```

- [ ] **Step 2: Verify Tailwind processes the file**

```bash
npm run dev
```
Expected: no CSS errors in terminal. Kill with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add globals.css with Win98 CSS variables and utility classes"
```

---

### Task 3: Write `app/layout.tsx` and `app/page.tsx`

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Create `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Win98 UI Museum',
  description: 'Modern apps reimagined in Windows 98',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
          fontSize: '11px',
          background: 'var(--win98-desktop)',
          margin: 0,
          padding: 0,
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main style={{ padding: '16px', color: 'var(--win98-titletext)' }}>
      Win98 UI Museum — Desktop coming soon
    </main>
  )
}
```

- [ ] **Step 3: Verify page loads**

```bash
npm run dev
```
Open `http://localhost:3000`. Expected: teal background, white text "Win98 UI Museum — Desktop coming soon". Kill with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: add root layout with Win98 font and desktop background"
```

---

### Task 4: Write `lib/types.ts` and set up Jest

**Files:**
- Create: `lib/types.ts`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Modify: `package.json` (add test scripts)

- [ ] **Step 1: Create `lib/types.ts`**

```typescript
export type AppId =
  | 'spotify'
  | 'slack'
  | 'twitter'
  | 'chatgpt'
  | 'notion'
  | 'instagram'

export type AppConfig = {
  density: 'minimal' | 'comfortable' | 'compact'
  notificationLevel: 'silent' | 'normal' | 'aggressive'
  dataVolume: 'empty' | 'normal' | 'overwhelmed'
  userRole: 'free' | 'pro' | 'admin'
  currentView: string
}

export type WindowState = {
  id: string
  appId: AppId
  position: { x: number; y: number }
  isMinimized: boolean
  zIndex: number
}

export type DesktopState = {
  openWindows: WindowState[]
  configs: Record<AppId, AppConfig>
}
```

- [ ] **Step 2: Install testing dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest
```

- [ ] **Step 3: Add test scripts to `package.json`**

Open `package.json` and add to the `scripts` block:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 4: Create `jest.config.ts`**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 5: Create `jest.setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Verify Jest is wired up correctly**

```bash
npx jest --showConfig 2>&1 | grep setupFilesAfterEnv
```
Expected: output includes the path to `jest.setup.ts`. If empty, re-check the key name in `jest.config.ts`.

- [ ] **Step 7: Commit**

```bash
git add lib/types.ts jest.config.ts jest.setup.ts package.json package-lock.json
git commit -m "feat: add shared types and Jest test setup"
```

---

## Chunk 2: Button, TitleBar, StatusBar, Window

### Task 5: Build `Button` component

**Files:**
- Create: `components/win98/Button.tsx`
- Create: `components/win98/__tests__/Button.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/Button.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>OK</Button>)
    expect(screen.getByText('OK')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>OK</Button>)
    fireEvent.click(screen.getByText('OK'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} disabled>OK</Button>)
    fireEvent.click(screen.getByText('OK'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('wraps in outline div when isPrimary', () => {
    const { container } = render(<Button isPrimary>Next</Button>)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.outline).toBe('1px solid var(--win98-text)')
  })

  it('applies win98-raised class by default', () => {
    render(<Button>OK</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('win98-raised')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/Button.test.tsx --no-coverage
```
Expected: FAIL — `Cannot find module '../Button'`

- [ ] **Step 3: Implement `components/win98/Button.tsx`**

```tsx
'use client'

import { useState } from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  isPrimary?: boolean
  variant?: 'default' | 'default-wide'
  type?: 'button' | 'submit'
}

export function Button({
  children,
  onClick,
  disabled = false,
  isPrimary = false,
  variant = 'default',
  type = 'button',
}: ButtonProps) {
  const [pressed, setPressed] = useState(false)
  const minWidth = variant === 'default-wide' ? '100px' : '75px'

  const button = (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`win98-btn-reset ${pressed ? 'win98-sunken' : 'win98-raised'}`}
      style={{
        minWidth,
        height: '23px',
        padding: pressed ? '1px 11px 0 13px' : '0 12px',
        background: 'var(--win98-silver)',
        color: disabled ? 'var(--win98-disabled)' : 'var(--win98-text)',
        pointerEvents: disabled ? 'none' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  )

  if (isPrimary) {
    return (
      <div style={{ outline: '1px solid var(--win98-text)', display: 'inline-flex' }}>
        {button}
      </div>
    )
  }

  return button
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/Button.test.tsx --no-coverage
```
Expected: PASS — 5 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/Button.tsx components/win98/__tests__/Button.test.tsx
git commit -m "feat: add Win98 Button component with all states"
```

---

### Task 6: Build `TitleBar` component

**Files:**
- Create: `components/win98/TitleBar.tsx`
- Create: `components/win98/__tests__/TitleBar.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/TitleBar.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TitleBar } from '../TitleBar'

const noop = () => {}

describe('TitleBar', () => {
  it('renders title text', () => {
    render(<TitleBar title="My App" isActive onMinimize={noop} onMaximize={noop} onClose={noop} onMouseDown={noop} />)
    expect(screen.getByText('My App')).toBeInTheDocument()
  })

  it('calls onMinimize when _ clicked', () => {
    const handleMinimize = jest.fn()
    render(<TitleBar title="App" isActive onMinimize={handleMinimize} onMaximize={noop} onClose={noop} onMouseDown={noop} />)
    fireEvent.click(screen.getByTitle('Minimize'))
    expect(handleMinimize).toHaveBeenCalledTimes(1)
  })

  it('calls onMaximize when □ clicked', () => {
    const handleMaximize = jest.fn()
    render(<TitleBar title="App" isActive onMinimize={noop} onMaximize={handleMaximize} onClose={noop} onMouseDown={noop} />)
    fireEvent.click(screen.getByTitle('Maximize'))
    expect(handleMaximize).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when X clicked', () => {
    const handleClose = jest.fn()
    render(<TitleBar title="App" isActive onMinimize={noop} onMaximize={noop} onClose={handleClose} onMouseDown={noop} />)
    fireEvent.click(screen.getByTitle('Close'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('uses active gradient when isActive is true', () => {
    const { container } = render(<TitleBar title="App" isActive onMinimize={noop} onMaximize={noop} onClose={noop} onMouseDown={noop} />)
    const bar = container.firstChild as HTMLElement
    expect(bar.style.background).toContain('var(--win98-titlebar)')
  })

  it('uses inactive gradient when isActive is false', () => {
    const { container } = render(<TitleBar title="App" isActive={false} onMinimize={noop} onMaximize={noop} onClose={noop} onMouseDown={noop} />)
    const bar = container.firstChild as HTMLElement
    expect(bar.style.background).toContain('var(--win98-titlebar-inactive)')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/TitleBar.test.tsx --no-coverage
```
Expected: FAIL — `Cannot find module '../TitleBar'`

- [ ] **Step 3: Implement `components/win98/TitleBar.tsx`**

Note: control buttons use `win98-btn-reset win98-raised` classes — do NOT set `border: none` inline, as that would override the raised bevel.

```tsx
'use client'

type TitleBarProps = {
  title: string
  icon?: string
  isActive: boolean
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
  onMouseDown: (e: React.MouseEvent) => void
}

export function TitleBar({
  title,
  icon,
  isActive,
  onMinimize,
  onMaximize,
  onClose,
  onMouseDown,
}: TitleBarProps) {
  const gradient = isActive
    ? 'linear-gradient(to right, var(--win98-titlebar), var(--win98-titlebar-gradient-end))'
    : 'linear-gradient(to right, var(--win98-titlebar-inactive), var(--win98-titlebar-inactive-gradient-end))'

  const ctrlBtnStyle: React.CSSProperties = {
    width: '16px',
    height: '14px',
    background: 'var(--win98-silver)',
    color: 'var(--win98-text)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    padding: 0,
  }

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2px 2px 2px 4px',
        height: '18px',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
        {icon && <img src={icon} width={16} height={16} alt="" />}
        <span style={{ color: 'var(--win98-titletext)', fontWeight: 700, fontSize: '11px' }}>
          {title}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '2px' }}>
        <button
          className="win98-btn-reset win98-raised"
          title="Minimize"
          onClick={(e) => { e.stopPropagation(); onMinimize() }}
          style={{ ...ctrlBtnStyle, alignItems: 'flex-end', paddingBottom: '1px' }}
        >
          _
        </button>
        <button
          className="win98-btn-reset win98-raised"
          title="Maximize"
          onClick={(e) => { e.stopPropagation(); onMaximize() }}
          style={ctrlBtnStyle}
        >
          □
        </button>
        <button
          className="win98-btn-reset win98-raised"
          title="Close"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          style={{ ...ctrlBtnStyle, fontWeight: 700, marginLeft: '2px' }}
        >
          X
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/TitleBar.test.tsx --no-coverage
```
Expected: PASS — 6 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/TitleBar.tsx components/win98/__tests__/TitleBar.test.tsx
git commit -m "feat: add Win98 TitleBar with gradient and beveled control buttons"
```

---

### Task 7: Build `StatusBar` component

**Files:**
- Create: `components/win98/StatusBar.tsx`
- Create: `components/win98/__tests__/StatusBar.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/StatusBar.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { StatusBar } from '../StatusBar'

describe('StatusBar', () => {
  it('renders all panel texts', () => {
    render(<StatusBar panels={[{ text: 'Ready' }, { text: '5 objects' }]} />)
    expect(screen.getByText('Ready')).toBeInTheDocument()
    expect(screen.getByText('5 objects')).toBeInTheDocument()
  })

  it('renders a single panel', () => {
    render(<StatusBar panels={[{ text: 'Done' }]} />)
    expect(screen.getByText('Done')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/StatusBar.test.tsx --no-coverage
```
Expected: FAIL — `Cannot find module '../StatusBar'`

- [ ] **Step 3: Implement `components/win98/StatusBar.tsx`**

Note: panel dividers use a two-line sunken bevel (`borderLeft: darker`, `borderRight: light`) to match the Win98 inset divider appearance.

```tsx
type StatusBarProps = {
  panels: { text: string; width?: number }[]
}

export function StatusBar({ panels }: StatusBarProps) {
  return (
    <div
      style={{
        height: '20px',
        borderTop: '1px solid var(--win98-dark)',
        background: 'var(--win98-silver)',
        display: 'flex',
        alignItems: 'center',
        fontSize: '10px',
      }}
    >
      {panels.map((panel, i) => (
        <span
          key={i}
          style={{
            padding: '0 8px',
            whiteSpace: 'nowrap',
            width: panel.width,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            /* Sunken divider between panels: dark on left, light on right */
            borderLeft: i > 0 ? '1px solid var(--win98-darker)' : undefined,
            boxShadow: i > 0 ? 'inset 1px 0 0 var(--win98-light)' : undefined,
          }}
        >
          {panel.text}
        </span>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/StatusBar.test.tsx --no-coverage
```
Expected: PASS — 2 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/StatusBar.tsx components/win98/__tests__/StatusBar.test.tsx
git commit -m "feat: add Win98 StatusBar with sunken panel dividers"
```

---

### Task 8: Build `Window` component

**Files:**
- Create: `components/win98/Window.tsx`
- Create: `components/win98/__tests__/Window.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/Window.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Window } from '../Window'

const baseProps = {
  title: 'Test Window',
  position: { x: 100, y: 100 },
  isActive: true,
  isMinimized: false,
  onFocus: jest.fn(),
  onMinimize: jest.fn(),
  onMaximize: jest.fn(),
  onClose: jest.fn(),
  onDrag: jest.fn(),
}

describe('Window', () => {
  it('renders title and children', () => {
    render(<Window {...baseProps}><div>content</div></Window>)
    expect(screen.getByText('Test Window')).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('is hidden when minimized', () => {
    const { container } = render(<Window {...baseProps} isMinimized><div>content</div></Window>)
    const win = container.firstChild as HTMLElement
    expect(win.style.display).toBe('none')
  })

  it('renders status bar when statusPanels provided', () => {
    render(
      <Window {...baseProps} statusPanels={[{ text: 'Ready' }]}>
        <div>content</div>
      </Window>
    )
    expect(screen.getByText('Ready')).toBeInTheDocument()
  })

  it('does not render status bar when statusPanels omitted', () => {
    render(<Window {...baseProps}><div>content</div></Window>)
    expect(screen.queryByText('Ready')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/Window.test.tsx --no-coverage
```
Expected: FAIL — `Cannot find module '../Window'`

- [ ] **Step 3: Implement `components/win98/Window.tsx`**

Note: `onDrag` is stored in a ref so the `useEffect` that registers `mousemove`/`mouseup` listeners runs only once (empty dep array), avoiding listener churn during dragging.

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { TitleBar } from './TitleBar'
import { StatusBar } from './StatusBar'

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
  statusPanels?: { text: string; width?: number }[]
}

export function Window({
  title,
  icon,
  width = 400,
  height = 300,
  position,
  isActive,
  isMinimized,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onDrag,
  children,
  statusPanels,
}: WindowProps) {
  // Store onDrag in a ref so the mousemove listener doesn't re-register on every render
  const onDragRef = useRef(onDrag)
  useEffect(() => { onDragRef.current = onDrag }, [onDrag])

  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      onDragRef.current({ x: dragRef.current.originX + dx, y: dragRef.current.originY + dy })
    }
    const handleMouseUp = () => { dragRef.current = null }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, []) // empty dep array — safe because we use onDragRef.current

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
    }
  }

  return (
    <div
      className="win98-window"
      onClick={onFocus}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width,
        height,
        display: isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <TitleBar
        title={title}
        icon={icon}
        isActive={isActive}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        onMouseDown={handleTitleBarMouseDown}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
        {children}
      </div>
      {statusPanels && <StatusBar panels={statusPanels} />}
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/Window.test.tsx --no-coverage
```
Expected: PASS — 4 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/Window.tsx components/win98/__tests__/Window.test.tsx
git commit -m "feat: add Win98 Window with drag, minimize, status bar"
```

---

## Chunk 3: Form Controls

### Task 9: Build `TextInput` component

**Files:**
- Create: `components/win98/TextInput.tsx`
- Create: `components/win98/__tests__/TextInput.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/TextInput.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TextInput } from '../TextInput'

describe('TextInput', () => {
  it('renders current value', () => {
    render(<TextInput value="hello" onChange={jest.fn()} />)
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument()
  })

  it('calls onChange with new value', () => {
    const handleChange = jest.fn()
    render(<TextInput value="" onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'world' } })
    expect(handleChange).toHaveBeenCalledWith('world')
  })

  it('renders placeholder', () => {
    render(<TextInput value="" onChange={jest.fn()} placeholder="Type here" />)
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
  })

  it('renders textarea when multiline', () => {
    render(<TextInput value="" onChange={jest.fn()} multiline />)
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/TextInput.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement `components/win98/TextInput.tsx`**

```tsx
type TextInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  width?: number
  multiline?: boolean
  rows?: number
}

export function TextInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  width,
  multiline = false,
  rows = 3,
}: TextInputProps) {
  const sharedStyle: React.CSSProperties = {
    background: disabled ? 'var(--win98-silver)' : 'var(--win98-light)',
    color: disabled ? 'var(--win98-disabled)' : 'var(--win98-text)',
    padding: '2px 4px',
    fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
    fontSize: '11px',
    width: '100%',
    resize: 'none',
    outline: 'none',
    border: 'none',
    display: 'block',
    boxSizing: 'border-box',
  }

  const wrapper = (child: React.ReactNode) => (
    <div className="win98-sunken" style={{ display: 'inline-block', width: width ?? '100%' }}>
      {child}
    </div>
  )

  if (multiline) {
    return wrapper(
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        style={sharedStyle}
      />
    )
  }

  return wrapper(
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={{ ...sharedStyle, height: '21px' }}
    />
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/TextInput.test.tsx --no-coverage
```
Expected: PASS — 4 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/TextInput.tsx components/win98/__tests__/TextInput.test.tsx
git commit -m "feat: add Win98 TextInput component"
```

---

### Task 10: Build `Checkbox` component

**Files:**
- Create: `components/win98/Checkbox.tsx`
- Create: `components/win98/__tests__/Checkbox.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/Checkbox.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from '../Checkbox'

describe('Checkbox', () => {
  it('renders label', () => {
    render(<Checkbox label="Enable" checked={false} onChange={jest.fn()} />)
    expect(screen.getByText('Enable')).toBeInTheDocument()
  })

  it('shows checkmark when checked', () => {
    render(<Checkbox label="Enable" checked onChange={jest.fn()} />)
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('calls onChange with toggled value on click', () => {
    const handleChange = jest.fn()
    render(<Checkbox label="Enable" checked={false} onChange={handleChange} />)
    fireEvent.click(screen.getByText('Enable'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('does not call onChange when disabled', () => {
    const handleChange = jest.fn()
    render(<Checkbox label="Enable" checked={false} onChange={handleChange} disabled />)
    fireEvent.click(screen.getByText('Enable'))
    expect(handleChange).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/Checkbox.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement `components/win98/Checkbox.tsx`**

```tsx
type CheckboxProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        cursor: 'default',
        color: disabled ? 'var(--win98-disabled)' : 'var(--win98-text)',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        fontSize: '11px',
        userSelect: 'none',
      }}
      onClick={() => !disabled && onChange(!checked)}
    >
      <div
        className="win98-sunken"
        style={{
          width: '13px',
          height: '13px',
          background: disabled ? 'var(--win98-silver)' : 'var(--win98-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          flexShrink: 0,
          color: disabled ? 'var(--win98-disabled)' : 'var(--win98-text)',
        }}
      >
        {checked ? '✓' : null}
      </div>
      {label}
    </label>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/Checkbox.test.tsx --no-coverage
```
Expected: PASS — 4 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/Checkbox.tsx components/win98/__tests__/Checkbox.test.tsx
git commit -m "feat: add Win98 Checkbox component"
```

---

### Task 11: Build `RadioGroup` component

**Files:**
- Create: `components/win98/RadioGroup.tsx`
- Create: `components/win98/__tests__/RadioGroup.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/RadioGroup.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { RadioGroup } from '../RadioGroup'

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
]

describe('RadioGroup', () => {
  it('renders all option labels', () => {
    render(<RadioGroup options={options} value="a" onChange={jest.fn()} />)
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('calls onChange with clicked value', () => {
    const handleChange = jest.fn()
    render(<RadioGroup options={options} value="a" onChange={handleChange} />)
    fireEvent.click(screen.getByText('Option B'))
    expect(handleChange).toHaveBeenCalledWith('b')
  })

  it('does not call onChange when disabled', () => {
    const handleChange = jest.fn()
    render(<RadioGroup options={options} value="a" onChange={handleChange} disabled />)
    fireEvent.click(screen.getByText('Option B'))
    expect(handleChange).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/RadioGroup.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement `components/win98/RadioGroup.tsx`**

```tsx
type RadioGroupProps = {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function RadioGroup({ options, value, onChange, disabled = false }: RadioGroupProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {options.map((opt) => (
        <label
          key={opt.value}
          onClick={() => !disabled && onChange(opt.value)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'default',
            color: disabled ? 'var(--win98-disabled)' : 'var(--win98-text)',
            fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
            fontSize: '11px',
            userSelect: 'none',
          }}
        >
          <div
            className="win98-sunken"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: disabled ? 'var(--win98-silver)' : 'var(--win98-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {value === opt.value && (
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--win98-text)' }} />
            )}
          </div>
          {opt.label}
        </label>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/RadioGroup.test.tsx --no-coverage
```
Expected: PASS — 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/RadioGroup.tsx components/win98/__tests__/RadioGroup.test.tsx
git commit -m "feat: add Win98 RadioGroup component"
```

---

### Task 12: Build `Dropdown` component

**Files:**
- Create: `components/win98/Dropdown.tsx`
- Create: `components/win98/__tests__/Dropdown.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/Dropdown.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Dropdown } from '../Dropdown'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]

describe('Dropdown', () => {
  it('renders selected label', () => {
    render(<Dropdown options={options} value="apple" onChange={jest.fn()} />)
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('opens list on click', () => {
    render(<Dropdown options={options} value="apple" onChange={jest.fn()} />)
    fireEvent.click(screen.getByText('Apple'))
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('calls onChange and closes on option click', () => {
    const handleChange = jest.fn()
    render(<Dropdown options={options} value="apple" onChange={handleChange} />)
    fireEvent.click(screen.getByText('Apple'))
    fireEvent.click(screen.getAllByText('Banana')[0])
    expect(handleChange).toHaveBeenCalledWith('banana')
  })

  it('does not open when disabled', () => {
    render(<Dropdown options={options} value="apple" onChange={jest.fn()} disabled />)
    fireEvent.click(screen.getByText('Apple'))
    expect(screen.queryByText('Banana')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/Dropdown.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement `components/win98/Dropdown.tsx`**

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'

type DropdownProps = {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  width?: number
}

export function Dropdown({ options, value, onChange, disabled = false, width }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selectedLabel = options.find((o) => o.value === value)?.label ?? value

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', width: width ?? '100%', display: 'inline-block' }}>
      <div style={{ display: 'flex', height: '21px' }} onClick={() => !disabled && setOpen((o) => !o)}>
        <div
          className="win98-sunken"
          style={{
            flex: 1,
            background: disabled ? 'var(--win98-silver)' : 'var(--win98-light)',
            color: disabled ? 'var(--win98-disabled)' : 'var(--win98-text)',
            padding: '2px 4px',
            fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
            fontSize: '11px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {selectedLabel}
        </div>
        <div
          className="win98-raised"
          style={{
            width: '17px',
            background: 'var(--win98-silver)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '9px',
            flexShrink: 0,
            cursor: 'default',
          }}
        >
          ▼
        </div>
      </div>

      {open && (
        <div
          className="win98-raised"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--win98-light)',
            zIndex: 1000,
          }}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              style={{
                padding: '2px 4px',
                fontSize: '11px',
                fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                background: opt.value === value ? 'var(--win98-highlight)' : 'transparent',
                color: opt.value === value ? 'var(--win98-highlight-text)' : 'var(--win98-text)',
                cursor: 'default',
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/Dropdown.test.tsx --no-coverage
```
Expected: PASS — 4 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/Dropdown.tsx components/win98/__tests__/Dropdown.test.tsx
git commit -m "feat: add Win98 Dropdown component"
```

---

## Chunk 4: Interactive Controls + Composite Components

### Task 13: Build `Scrollbar` component

**Files:**
- Create: `components/win98/Scrollbar.tsx`
- Create: `components/win98/__tests__/Scrollbar.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/Scrollbar.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Scrollbar } from '../Scrollbar'

describe('Scrollbar', () => {
  it('renders up and down arrows for vertical', () => {
    render(<Scrollbar orientation="vertical" value={50} onChange={jest.fn()} trackLength={200} />)
    expect(screen.getByTitle('Scroll up')).toBeInTheDocument()
    expect(screen.getByTitle('Scroll down')).toBeInTheDocument()
  })

  it('renders left and right arrows for horizontal', () => {
    render(<Scrollbar orientation="horizontal" value={50} onChange={jest.fn()} trackLength={200} />)
    expect(screen.getByTitle('Scroll left')).toBeInTheDocument()
    expect(screen.getByTitle('Scroll right')).toBeInTheDocument()
  })

  it('calls onChange with decremented value when up arrow clicked', () => {
    const handleChange = jest.fn()
    render(<Scrollbar orientation="vertical" value={50} onChange={handleChange} trackLength={200} />)
    fireEvent.click(screen.getByTitle('Scroll up'))
    expect(handleChange).toHaveBeenCalledWith(40)
  })

  it('calls onChange with incremented value when down arrow clicked', () => {
    const handleChange = jest.fn()
    render(<Scrollbar orientation="vertical" value={50} onChange={handleChange} trackLength={200} />)
    fireEvent.click(screen.getByTitle('Scroll down'))
    expect(handleChange).toHaveBeenCalledWith(60)
  })

  it('clamps value at 0 when already at minimum', () => {
    const handleChange = jest.fn()
    render(<Scrollbar orientation="vertical" value={0} onChange={handleChange} trackLength={200} />)
    fireEvent.click(screen.getByTitle('Scroll up'))
    expect(handleChange).toHaveBeenCalledWith(0)
  })

  it('clamps value at 100 when already at maximum', () => {
    const handleChange = jest.fn()
    render(<Scrollbar orientation="vertical" value={100} onChange={handleChange} trackLength={200} />)
    fireEvent.click(screen.getByTitle('Scroll down'))
    expect(handleChange).toHaveBeenCalledWith(100)
  })

  it('does not call onChange when disabled', () => {
    const handleChange = jest.fn()
    render(<Scrollbar orientation="vertical" value={50} onChange={handleChange} trackLength={200} disabled />)
    fireEvent.click(screen.getByTitle('Scroll up'))
    expect(handleChange).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/Scrollbar.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement `components/win98/Scrollbar.tsx`**

The thumb is draggable: `mousedown` on the thumb starts tracking `mousemove` on `document`, computes the new value from mouse delta, calls `onChange`. Uses a ref to avoid stale closures.

```tsx
'use client'

import { useEffect, useRef } from 'react'

type ScrollbarProps = {
  orientation: 'vertical' | 'horizontal'
  value: number       // 0–100
  onChange: (value: number) => void
  trackLength: number // px
  disabled?: boolean
}

const ARROW_SIZE = 17
const STEP = 10

export function Scrollbar({ orientation, value, onChange, trackLength, disabled = false }: ScrollbarProps) {
  const isVertical = orientation === 'vertical'
  const onChangeRef = useRef(onChange)
  useEffect(() => { onChangeRef.current = onChange }, [onChange])

  const thumbSize = Math.max(20, (trackLength - ARROW_SIZE * 2) * 0.25)
  const trackInner = trackLength - ARROW_SIZE * 2 - thumbSize
  const thumbOffset = (value / 100) * trackInner

  const dragRef = useRef<{ startPos: number; startValue: number } | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return
      const delta = (isVertical ? e.clientY : e.clientX) - dragRef.current.startPos
      const pct = (delta / trackInner) * 100
      const next = Math.max(0, Math.min(100, dragRef.current.startValue + pct))
      onChangeRef.current(Math.round(next))
    }
    const handleMouseUp = () => { dragRef.current = null }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isVertical, trackInner])

  const handleArrow = (delta: number) => {
    if (disabled) return
    onChangeRef.current(Math.max(0, Math.min(100, value + delta)))
  }

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    e.stopPropagation()
    dragRef.current = { startPos: isVertical ? e.clientY : e.clientX, startValue: value }
  }

  const arrowBtnStyle: React.CSSProperties = {
    width: `${ARROW_SIZE}px`,
    height: `${ARROW_SIZE}px`,
    background: 'var(--win98-silver)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    flexShrink: 0,
    border: 'none',
    fontFamily: 'inherit',
    cursor: 'default',
  }

  if (isVertical) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: `${ARROW_SIZE}px`, height: `${trackLength}px` }}>
        <button className="win98-btn-reset win98-raised" style={arrowBtnStyle} title="Scroll up" onClick={() => handleArrow(-STEP)}>▲</button>
        <div style={{ flex: 1, background: 'var(--win98-silver)', position: 'relative', overflow: 'hidden' }}>
          <div
            className="win98-raised"
            onMouseDown={handleThumbMouseDown}
            style={{
              position: 'absolute',
              top: thumbOffset,
              left: '1px',
              width: '15px',
              height: `${thumbSize}px`,
              background: 'var(--win98-silver)',
              cursor: disabled ? 'default' : 'ns-resize',
            }}
          />
        </div>
        <button className="win98-btn-reset win98-raised" style={arrowBtnStyle} title="Scroll down" onClick={() => handleArrow(STEP)}>▼</button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: `${ARROW_SIZE}px`, width: `${trackLength}px` }}>
      <button className="win98-btn-reset win98-raised" style={arrowBtnStyle} title="Scroll left" onClick={() => handleArrow(-STEP)}>◀</button>
      <div style={{ flex: 1, background: 'var(--win98-silver)', position: 'relative', overflow: 'hidden' }}>
        <div
          className="win98-raised"
          onMouseDown={handleThumbMouseDown}
          style={{
            position: 'absolute',
            left: thumbOffset,
            top: '1px',
            height: '13px',
            width: `${thumbSize}px`,
            background: 'var(--win98-silver)',
            cursor: disabled ? 'default' : 'ew-resize',
          }}
        />
      </div>
      <button className="win98-btn-reset win98-raised" style={arrowBtnStyle} title="Scroll right" onClick={() => handleArrow(STEP)}>▶</button>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/Scrollbar.test.tsx --no-coverage
```
Expected: PASS — 7 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/Scrollbar.tsx components/win98/__tests__/Scrollbar.test.tsx
git commit -m "feat: add Win98 Scrollbar with draggable thumb and arrow buttons"
```

---

### Task 14: Build `ProgressBar` component

**Files:**
- Create: `components/win98/ProgressBar.tsx`
- Create: `components/win98/__tests__/ProgressBar.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/ProgressBar.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { ProgressBar } from '../ProgressBar'

describe('ProgressBar', () => {
  it('renders without crashing at 0', () => {
    const { container } = render(<ProgressBar value={0} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders without crashing at 100', () => {
    const { container } = render(<ProgressBar value={100} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders correct filled segments for 50% at width 200', () => {
    // totalSlots = floor((200-4)/16) = 12, filled = round(50/100*12) = 6
    const { container } = render(<ProgressBar value={50} width={200} />)
    const filled = container.querySelectorAll('[data-filled="true"]')
    expect(filled.length).toBe(6)
  })

  it('renders no filled segments at 0%', () => {
    const { container } = render(<ProgressBar value={0} width={200} />)
    const filled = container.querySelectorAll('[data-filled="true"]')
    expect(filled.length).toBe(0)
  })

  it('renders all slots filled at 100%', () => {
    const { container } = render(<ProgressBar value={100} width={200} />)
    const filled = container.querySelectorAll('[data-filled="true"]')
    const total = container.querySelectorAll('[data-filled]')
    expect(filled.length).toBe(total.length)
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/ProgressBar.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement `components/win98/ProgressBar.tsx`**

Note: the `animated` prop cycles a CSS animation offset to create the indeterminate scrolling effect — implemented with a `@keyframes` style tag.

```tsx
'use client'

import { useEffect, useRef } from 'react'

type ProgressBarProps = {
  value: number     // 0–100
  width?: number
  animated?: boolean
}

export function ProgressBar({ value, width = 200, animated = false }: ProgressBarProps) {
  const totalSlots = Math.floor((width - 4) / 16)
  const filledSlots = animated ? totalSlots : Math.round((value / 100) * totalSlots)
  const offsetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated) return
    let frame = 0
    const tick = () => {
      frame = (frame + 1) % totalSlots
      if (containerRef.current) {
        const segments = containerRef.current.querySelectorAll<HTMLDivElement>('[data-slot]')
        segments.forEach((seg, i) => {
          const filled = i < totalSlots - frame
          seg.style.background = filled ? 'var(--win98-highlight)' : 'transparent'
        })
      }
      rafRef.current = window.setTimeout(tick, 80) as unknown as number
    }
    rafRef.current = window.setTimeout(tick, 80) as unknown as number
    return () => { if (rafRef.current) clearTimeout(rafRef.current) }
  }, [animated, totalSlots])

  return (
    <div
      ref={containerRef}
      className="win98-sunken"
      style={{
        background: 'var(--win98-light)',
        height: '16px',
        width,
        padding: '2px',
        display: 'flex',
        gap: '2px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: totalSlots }).map((_, i) => (
        <div
          key={i}
          data-slot={i}
          data-filled={i < filledSlots ? 'true' : 'false'}
          style={{
            width: '14px',
            height: '100%',
            background: i < filledSlots ? 'var(--win98-highlight)' : 'transparent',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/ProgressBar.test.tsx --no-coverage
```
Expected: PASS — 5 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/ProgressBar.tsx components/win98/__tests__/ProgressBar.test.tsx
git commit -m "feat: add Win98 ProgressBar with proportional segments and animated mode"
```

---

### Task 15: Build `Slider` component

**Files:**
- Create: `components/win98/Slider.tsx`
- Create: `components/win98/__tests__/Slider.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/Slider.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Slider } from '../Slider'

describe('Slider', () => {
  it('renders label when provided', () => {
    render(<Slider value={50} min={0} max={100} onChange={jest.fn()} label="Volume" />)
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('renders tick marks when showTicks is true', () => {
    render(<Slider value={50} min={0} max={100} onChange={jest.fn()} showTicks />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    const { container } = render(<Slider value={30} min={0} max={100} onChange={jest.fn()} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('does not respond to thumb interaction when disabled', () => {
    const handleChange = jest.fn()
    render(<Slider value={50} min={0} max={100} onChange={handleChange} disabled />)
    const thumb = document.querySelector('[data-thumb]') as HTMLElement
    if (thumb) fireEvent.mouseDown(thumb)
    expect(handleChange).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/Slider.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement `components/win98/Slider.tsx`**

The thumb is draggable: `mousedown` starts tracking `mousemove` on `document`, computes new value from the track's bounding rect, calls `onChange`. Uses a ref to avoid stale closures.

```tsx
'use client'

import { useEffect, useRef } from 'react'

type SliderProps = {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  disabled?: boolean
  label?: string
  showTicks?: boolean
}

export function Slider({ value, min, max, onChange, disabled = false, label, showTicks = false }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  const trackRef = useRef<HTMLDivElement>(null)
  const onChangeRef = useRef(onChange)
  useEffect(() => { onChangeRef.current = onChange }, [onChange])

  const dragRef = useRef(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current || !trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const rawPct = (e.clientX - rect.left) / rect.width
      const clamped = Math.max(0, Math.min(1, rawPct))
      const next = Math.round(min + clamped * (max - min))
      onChangeRef.current(next)
    }
    const handleMouseUp = () => { dragRef.current = false }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [min, max])

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    dragRef.current = true
  }

  return (
    <div style={{ fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: '11px' }}>
      {label && (
        <div style={{ marginBottom: '4px', color: disabled ? 'var(--win98-disabled)' : 'var(--win98-text)' }}>
          {label}
        </div>
      )}
      <div style={{ position: 'relative', paddingTop: '8px', paddingBottom: '4px' }}>
        <div
          ref={trackRef}
          className="win98-sunken"
          style={{ height: '4px', background: 'var(--win98-silver)', position: 'relative' }}
        />
        <div
          data-thumb
          className="win98-raised"
          onMouseDown={handleThumbMouseDown}
          style={{
            position: 'absolute',
            top: '0',
            left: `calc(${pct}% - 5px)`,
            width: '11px',
            height: '20px',
            background: 'var(--win98-silver)',
            cursor: disabled ? 'default' : 'ew-resize',
          }}
        />
      </div>
      {showTicks && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--win98-disabled)' }}>
          <span>{min}</span>
          <span>{Math.round((min + max) / 2)}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/Slider.test.tsx --no-coverage
```
Expected: PASS — 4 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/Slider.tsx components/win98/__tests__/Slider.test.tsx
git commit -m "feat: add Win98 Slider with draggable thumb"
```

---

### Task 16: Build `TabPanel` component

**Files:**
- Create: `components/win98/TabPanel.tsx`
- Create: `components/win98/__tests__/TabPanel.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/TabPanel.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TabPanel } from '../TabPanel'

const tabs = [
  { id: 'general', label: 'General', content: <div>General content</div> },
  { id: 'details', label: 'Details', content: <div>Details content</div> },
]

describe('TabPanel', () => {
  it('renders all tab labels', () => {
    render(<TabPanel tabs={tabs} activeTab="general" onTabChange={jest.fn()} />)
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('renders active tab content', () => {
    render(<TabPanel tabs={tabs} activeTab="general" onTabChange={jest.fn()} />)
    expect(screen.getByText('General content')).toBeInTheDocument()
  })

  it('calls onTabChange when inactive tab clicked', () => {
    const handleChange = jest.fn()
    render(<TabPanel tabs={tabs} activeTab="general" onTabChange={handleChange} />)
    fireEvent.click(screen.getByText('Details'))
    expect(handleChange).toHaveBeenCalledWith('details')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/TabPanel.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement `components/win98/TabPanel.tsx`**

```tsx
type Tab = { id: string; label: string; content: React.ReactNode }

type TabPanelProps = {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
}

export function TabPanel({ tabs, activeTab, onTabChange }: TabPanelProps) {
  const activeContent = tabs.find((t) => t.id === activeTab)?.content

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <div
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                padding: isActive ? '3px 10px' : '2px 10px',
                fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                fontSize: '11px',
                cursor: 'default',
                userSelect: 'none',
                background: 'var(--win98-silver)',
                color: isActive ? 'var(--win98-text)' : 'var(--win98-disabled)',
                borderTop: '2px solid var(--win98-light)',
                borderLeft: '2px solid var(--win98-light)',
                borderRight: '2px solid var(--win98-darker)',
                borderBottom: isActive ? 'none' : '2px solid var(--win98-darker)',
                marginBottom: isActive ? '-1px' : '0',
                zIndex: isActive ? 1 : 0,
                position: 'relative',
              }}
            >
              {tab.label}
            </div>
          )
        })}
      </div>
      <div
        className="win98-raised"
        style={{ background: 'var(--win98-silver)', padding: '8px', minHeight: '60px', position: 'relative', zIndex: 0 }}
      >
        {activeContent}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/TabPanel.test.tsx --no-coverage
```
Expected: PASS — 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/TabPanel.tsx components/win98/__tests__/TabPanel.test.tsx
git commit -m "feat: add Win98 TabPanel component"
```

---

### Task 17: Build `Dialog` component

**Files:**
- Create: `components/win98/Dialog.tsx`
- Create: `components/win98/__tests__/Dialog.test.tsx`

Note: `Dialog` imports `<Button>` from Task 5. Ensure Task 5 is complete before running this task.

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/Dialog.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Dialog } from '../Dialog'

const baseProps = {
  title: 'Confirm',
  message: 'Are you sure?',
  buttons: [{ label: 'OK', onClick: jest.fn(), isPrimary: true }],
  isOpen: true,
  onClose: jest.fn(),
}

describe('Dialog', () => {
  it('renders title and message when open', () => {
    render(<Dialog {...baseProps} />)
    expect(screen.getByText('Confirm')).toBeInTheDocument()
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
  })

  it('renders nothing when closed', () => {
    render(<Dialog {...baseProps} isOpen={false} />)
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument()
  })

  it('calls button onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Dialog {...baseProps} buttons={[{ label: 'OK', onClick: handleClick }]} />)
    fireEvent.click(screen.getByText('OK'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders warning icon for warning type', () => {
    render(<Dialog {...baseProps} icon="warning" />)
    expect(screen.getByText('⚠️')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/Dialog.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement `components/win98/Dialog.tsx`**

Note: Title bar is rendered inline (not via `<TitleBar>`) — intentionally avoids importing `<TitleBar>` to prevent null-prop overrides for minimize/maximize. Always renders as active gradient.

```tsx
'use client'

import { Button } from './Button'

const ICONS = { info: 'ℹ️', warning: '⚠️', error: '❌', question: '❓' } as const

type DialogProps = {
  title: string
  icon?: keyof typeof ICONS
  message: string
  buttons: { label: string; onClick: () => void; isPrimary?: boolean }[]
  isOpen: boolean
  onClose: () => void
}

export function Dialog({ title, icon, message, buttons, isOpen, onClose }: DialogProps) {
  if (!isOpen) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="win98-window" style={{ minWidth: '240px', maxWidth: '360px' }}>
        {/* Inline title bar — always active gradient, close button only */}
        <div
          style={{
            background: 'linear-gradient(to right, var(--win98-titlebar), var(--win98-titlebar-gradient-end))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2px 2px 2px 4px',
            height: '18px',
          }}
        >
          <span style={{ color: 'var(--win98-titletext)', fontWeight: 700, fontSize: '11px' }}>{title}</span>
          <button
            className="win98-btn-reset win98-raised"
            onClick={onClose}
            title="Close"
            style={{ width: '16px', height: '14px', background: 'var(--win98-silver)', fontWeight: 700, fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            X
          </button>
        </div>

        <div style={{ padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          {icon && <span style={{ fontSize: '32px', lineHeight: 1, flexShrink: 0 }}>{ICONS[icon]}</span>}
          <span style={{ fontSize: '11px', fontFamily: "'MS Sans Serif', Tahoma, sans-serif" }}>{message}</span>
        </div>

        <div style={{ borderTop: '1px solid var(--win98-dark)', padding: '8px', display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
          {buttons.map((btn, i) => (
            <Button key={i} onClick={btn.onClick} isPrimary={btn.isPrimary}>{btn.label}</Button>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/Dialog.test.tsx --no-coverage
```
Expected: PASS — 4 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/Dialog.tsx components/win98/__tests__/Dialog.test.tsx
git commit -m "feat: add Win98 Dialog component"
```

---

### Task 18: Build `Icon` component

**Files:**
- Create: `components/win98/Icon.tsx`
- Create: `components/win98/__tests__/Icon.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/win98/__tests__/Icon.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Icon } from '../Icon'

describe('Icon', () => {
  it('renders label', () => {
    render(<Icon src="/icon.png" label="My Docs" />)
    expect(screen.getByText('My Docs')).toBeInTheDocument()
  })

  it('calls onDoubleClick when double-clicked', () => {
    const handleDoubleClick = jest.fn()
    render(<Icon src="/icon.png" label="My Docs" onDoubleClick={handleDoubleClick} />)
    fireEvent.doubleClick(screen.getByText('My Docs'))
    expect(handleDoubleClick).toHaveBeenCalledTimes(1)
  })

  it('applies selected highlight when selected', () => {
    const { container } = render(<Icon src="/icon.png" label="My Docs" selected />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.background).toContain('var(--win98-highlight)')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest components/win98/__tests__/Icon.test.tsx --no-coverage
```
Expected: FAIL

- [ ] **Step 3: Implement `components/win98/Icon.tsx`**

```tsx
type IconProps = {
  src: string
  label: string
  size?: 16 | 32
  selected?: boolean
  onDoubleClick?: () => void
  onSingleClick?: () => void
}

export function Icon({ src, label, size = 32, selected = false, onDoubleClick, onSingleClick }: IconProps) {
  if (size === 16) {
    return <img src={src} width={16} height={16} alt={label} style={{ imageRendering: 'pixelated' }} />
  }

  return (
    <div
      onClick={onSingleClick}
      onDoubleClick={onDoubleClick}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        cursor: 'default',
        userSelect: 'none',
        background: selected ? 'var(--win98-highlight)' : 'transparent',
        padding: '2px',
      }}
    >
      <img src={src} width={32} height={32} alt="" style={{ imageRendering: 'pixelated' }} />
      <span
        style={{
          color: 'var(--win98-titletext)',
          textShadow: '1px 1px 0 var(--win98-text)',
          fontSize: '11px',
          textAlign: 'center',
          maxWidth: '64px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {label}
      </span>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest components/win98/__tests__/Icon.test.tsx --no-coverage
```
Expected: PASS — 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/win98/Icon.tsx components/win98/__tests__/Icon.test.tsx
git commit -m "feat: add Win98 Icon component"
```

---

## Chunk 5: Barrel Exports + Showcase Page

### Task 19: Create barrel export

**Files:**
- Create: `components/win98/index.ts`

- [ ] **Step 1: Create `components/win98/index.ts`**

```typescript
export { Button } from './Button'
export { TitleBar } from './TitleBar'
export { StatusBar } from './StatusBar'
export { Window } from './Window'
export { TextInput } from './TextInput'
export { Checkbox } from './Checkbox'
export { RadioGroup } from './RadioGroup'
export { Dropdown } from './Dropdown'
export { Scrollbar } from './Scrollbar'
export { ProgressBar } from './ProgressBar'
export { Slider } from './Slider'
export { TabPanel } from './TabPanel'
export { Dialog } from './Dialog'
export { Icon } from './Icon'
```

- [ ] **Step 2: Run all tests to verify nothing broke**

```bash
npm test -- --no-coverage
```
Expected: PASS — all tests across all component test files pass

- [ ] **Step 3: Commit**

```bash
git add components/win98/index.ts
git commit -m "feat: add Win98 component barrel export"
```

---

### Task 20: Build the Showcase page

**Files:**
- Create: `app/showcase/page.tsx`

- [ ] **Step 1: Create `app/showcase/page.tsx`**

```tsx
'use client'

import { useState } from 'react'
import {
  Button, TitleBar, StatusBar, TextInput, Checkbox,
  RadioGroup, Dropdown, Scrollbar, ProgressBar,
  Slider, TabPanel, Dialog, Icon, Window,
} from '@/components/win98'

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="win98-raised" style={{ background: 'var(--win98-silver)', padding: '8px' }}>
      <div style={{ fontWeight: 700, marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--win98-dark)', fontSize: '11px' }}>
        {title}
      </div>
      {children}
    </div>
  )
}

export default function ShowcasePage() {
  const [checkA, setCheckA] = useState(true)
  const [checkB, setCheckB] = useState(false)
  const [radio, setRadio] = useState('a')
  const [dropdown, setDropdown] = useState('opt1')
  const [inputVal, setInputVal] = useState('Hello world')
  const [scrollV, setScrollV] = useState(30)
  const [scrollH, setScrollH] = useState(60)
  const [sliderVal, setSliderVal] = useState(40)
  const [activeTab, setActiveTab] = useState('general')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [windowOpen, setWindowOpen] = useState(true)
  const [windowPos, setWindowPos] = useState({ x: 820, y: 60 })

  return (
    <div style={{ padding: '16px', minHeight: '100vh', background: 'var(--win98-desktop)' }}>
      <div style={{ color: 'var(--win98-titletext)', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>
        🪟 Win98 Component Library
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>

        <Panel title="Button">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Button>Secondary</Button>
            <Button isPrimary><u>P</u>rimary</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Panel>

        <Panel title="TitleBar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <TitleBar title="Active Window" isActive onMinimize={() => {}} onMaximize={() => {}} onClose={() => {}} onMouseDown={() => {}} />
            <TitleBar title="Inactive Window" isActive={false} onMinimize={() => {}} onMaximize={() => {}} onClose={() => {}} onMouseDown={() => {}} />
          </div>
        </Panel>

        <Panel title="TextInput">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <TextInput value={inputVal} onChange={setInputVal} />
            <TextInput value="" onChange={() => {}} placeholder="Placeholder..." />
            <TextInput value="Disabled" onChange={() => {}} disabled />
            <TextInput value={'Line 1\nLine 2'} onChange={() => {}} multiline rows={3} />
          </div>
        </Panel>

        <Panel title="Checkbox">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Checkbox label="Checked" checked={checkA} onChange={setCheckA} />
            <Checkbox label="Unchecked" checked={checkB} onChange={setCheckB} />
            <Checkbox label="Disabled (checked)" checked disabled onChange={() => {}} />
          </div>
        </Panel>

        <Panel title="RadioGroup">
          <RadioGroup
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
              { label: 'Option C', value: 'c' },
            ]}
            value={radio}
            onChange={setRadio}
          />
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '10px', color: 'var(--win98-disabled)', marginBottom: '4px' }}>Disabled</div>
            <RadioGroup
              options={[{ label: 'Locked option', value: 'x' }]}
              value="x"
              onChange={() => {}}
              disabled
            />
          </div>
        </Panel>

        <Panel title="Dropdown">
          <Dropdown
            options={[
              { label: 'Option 1', value: 'opt1' },
              { label: 'Option 2', value: 'opt2' },
              { label: 'Option 3', value: 'opt3' },
            ]}
            value={dropdown}
            onChange={setDropdown}
          />
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '10px', color: 'var(--win98-disabled)', marginBottom: '4px' }}>Disabled</div>
            <Dropdown options={[{ label: 'Locked', value: 'locked' }]} value="locked" onChange={() => {}} disabled />
          </div>
        </Panel>

        <Panel title="Scrollbar">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Scrollbar orientation="vertical" value={scrollV} onChange={setScrollV} trackLength={100} />
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: '8px', fontSize: '10px', color: 'var(--win98-disabled)' }}>Horizontal</div>
              <Scrollbar orientation="horizontal" value={scrollH} onChange={setScrollH} trackLength={140} />
            </div>
          </div>
        </Panel>

        <Panel title="ProgressBar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '10px', color: 'var(--win98-disabled)' }}>65%</div>
            <ProgressBar value={65} width={180} />
            <div style={{ fontSize: '10px', color: 'var(--win98-disabled)' }}>100%</div>
            <ProgressBar value={100} width={180} />
            <div style={{ fontSize: '10px', color: 'var(--win98-disabled)' }}>Animated</div>
            <ProgressBar value={0} width={180} animated />
          </div>
        </Panel>

        <Panel title="Slider">
          <Slider value={sliderVal} min={0} max={100} onChange={setSliderVal} label="Volume" showTicks />
        </Panel>

        <Panel title="TabPanel">
          <TabPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={[
              { id: 'general', label: 'General', content: <div style={{ fontSize: '11px' }}>General content</div> },
              { id: 'advanced', label: 'Advanced', content: <div style={{ fontSize: '11px' }}>Advanced options</div> },
            ]}
          />
        </Panel>

        <Panel title="StatusBar">
          <StatusBar panels={[{ text: 'Ready' }, { text: '127 objects' }, { text: '2.3 MB' }]} />
        </Panel>

        <Panel title="Dialog">
          <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Dialog
            title="Confirm Delete"
            icon="warning"
            message="Are you sure you want to delete this file? This cannot be undone."
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            buttons={[
              { label: 'OK', onClick: () => setDialogOpen(false), isPrimary: true },
              { label: 'Cancel', onClick: () => setDialogOpen(false) },
            ]}
          />
        </Panel>

        <Panel title="Icon">
          <div style={{ display: 'flex', gap: '12px', background: 'var(--win98-desktop)', padding: '8px' }}>
            <Icon src="/placeholder-icon.png" label="My Documents" selected onSingleClick={() => {}} />
            <Icon src="/placeholder-icon.png" label="Recycle Bin" onDoubleClick={() => {}} />
          </div>
        </Panel>

        <Panel title="Window (live)">
          <Button onClick={() => setWindowOpen(true)}>Open Window</Button>
          <div style={{ fontSize: '10px', color: 'var(--win98-disabled)', marginTop: '4px' }}>Drag the title bar to move</div>
        </Panel>

      </div>

      {windowOpen && (
        <Window
          title="Sample Window"
          position={windowPos}
          isActive
          isMinimized={false}
          width={320}
          height={180}
          onFocus={() => {}}
          onMinimize={() => {}}
          onMaximize={() => {}}
          onClose={() => setWindowOpen(false)}
          onDrag={setWindowPos}
          statusPanels={[{ text: 'Ready' }, { text: '5 items' }]}
        >
          <div style={{ fontSize: '11px' }}>Window content. Drag the title bar to move.</div>
        </Window>
      )}

      <div style={{ marginTop: '8px' }}>
        <StatusBar panels={[{ text: '14 components' }, { text: 'Win98 UI Museum · v0.1' }]} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run dev server and verify showcase page**

```bash
npm run dev
```
Open `http://localhost:3000/showcase`.

Expected:
- Teal desktop background
- 3-column grid of silver Win98 panels
- All 14 components visible and interactive
- RadioGroup and Dropdown each show a disabled variant
- ProgressBar shows animated mode cycling
- Window panel floats and is draggable by title bar
- Dialog appears when "Open Dialog" is clicked

Kill with Ctrl+C when verified.

- [ ] **Step 3: Commit**

```bash
git add app/showcase/page.tsx
git commit -m "feat: add Win98 component showcase page at /showcase"
```

---

### Task 21: Final verification

- [ ] **Step 1: Run full test suite**

```bash
npm test -- --no-coverage
```
Expected: PASS — all tests green, 0 failures (≥35 tests across 14 test files)

- [ ] **Step 2: TypeScript type-check**

```bash
npx tsc --noEmit
```
Expected: 0 errors

- [ ] **Step 3: Production build**

```bash
npm run build
```
Expected: build completes with 0 errors. Warnings about `<img>` elements are acceptable.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Win98 component library — 14 components + showcase page"
```

---

## Summary

| Task | Files | Tests |
|------|-------|-------|
| 1–4 | Scaffold, globals.css, layout, types, Jest config | — |
| 5 | Button.tsx | 5 |
| 6 | TitleBar.tsx | 6 |
| 7 | StatusBar.tsx | 2 |
| 8 | Window.tsx | 4 |
| 9 | TextInput.tsx | 4 |
| 10 | Checkbox.tsx | 4 |
| 11 | RadioGroup.tsx | 3 |
| 12 | Dropdown.tsx | 4 |
| 13 | Scrollbar.tsx | 7 |
| 14 | ProgressBar.tsx | 5 |
| 15 | Slider.tsx | 4 |
| 16 | TabPanel.tsx | 3 |
| 17 | Dialog.tsx | 4 |
| 18 | Icon.tsx | 3 |
| 19–21 | index.ts, showcase, verification | — |
