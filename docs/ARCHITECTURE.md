# Architecture

## Overview

Win98 UI Museum is a client-side Next.js 14 app. All state lives in React. No database, no auth, no persistence.

---

## Page Structure

```
app/page.tsx  →  <Desktop />
```

One page. The Desktop component manages all window state, positions, and z-index.

---

## State Architecture

### Desktop-level state

```typescript
type WindowState = {
  id: string
  appId: AppId
  position: { x: number; y: number }
  isMinimized: boolean
  zIndex: number
}

type DesktopState = {
  openWindows: WindowState[]
}
```

---

## Component Hierarchy

```
<Desktop>
  ├── <DesktopIcon> × N
  ├── <Window> × N  (one per open app)
  │   ├── <TitleBar>
  │   ├── [App Component]  e.g. <InstagramApp />
  │   └── <StatusBar>
  └── <Taskbar>
      ├── <StartMenu>
      ├── <TaskbarButton> × N
      └── Clock
```

---

## App Component Interface

Each app is a self-contained component with no external props beyond what it needs for its own internal state. Apps manage their own view switching (e.g., feed → profile → story).

```typescript
export function InstagramApp() { ... }
export function SpotifyApp() { ... }
```

---

## Data Flow

```
Desktop Icon double-click
    │
    ▼
Desktop opens WindowState for app
    │
    └──▶ App Window  →  <[App]App />
```

---

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Entry point, renders Desktop |
| `components/desktop/Desktop.tsx` | Main state container |
| `components/win98/` | Win98 UI primitives |
| `components/apps/[app]/index.ts` | Each app barrel export |
| `lib/types.ts` | AppId, WindowState types |
| `lib/mockData/[app].ts` | Static mock data |
