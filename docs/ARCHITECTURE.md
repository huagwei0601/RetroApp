# Architecture

## Overview

Win98 UI Museum is a client-side Next.js 14 app. No backend except for the Anthropic API call in "Any App" mode. All state lives in React. No database, no auth, no persistence.

---

## Page Structure

```
app/page.tsx  →  <Desktop />
```

One page. The Desktop component manages all window state, positions, z-index, and per-app configs.

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
  configs: Record<AppId, AppConfig>
}
```

### Config flow
```
User interacts with ConfiguratorPanel
  → updates configs[appId] in Desktop state
  → App Window re-renders with new config
```

No prop drilling beyond two levels. Use React Context if needed.

---

## Component Hierarchy

```
<Desktop>
  ├── <DesktopIcon> × N
  ├── <Window> × N  (App Window)
  │   ├── <TitleBar>
  │   ├── [App Component]  e.g. <SpotifyApp config={...} />
  │   └── <StatusBar>
  ├── <Window>  (Configurator Panel)
  │   ├── <TitleBar>
  │   ├── <ConfiguratorPanel appId config onChange />
  │   └── <StatusBar>
  └── <Taskbar>
      ├── <StartMenu>
      ├── <TaskbarButton> × N
      └── Clock
```

---

## App Component Interface

All apps follow the same interface:

```typescript
type AppProps = {
  config: AppConfig
}

export function SpotifyApp({ config }: AppProps) { ... }
```

Apps are read-only with respect to config — they render based on it, never modify it.

---

## Any App Mode (AI-generated)

1. User opens "Install New App" wizard, types an app name
2. Client calls `/api/generate-app` (Next.js route handler)
3. Route handler calls Anthropic API — system prompt describes available Win98 components, requests a React component
4. Streamed response renders in app window
5. Generated app shows "AI Generated" badge in title bar

System prompt lives in `lib/generateApp.ts`.

---

## Data Flow

```
Desktop Icon double-click
    │
    ▼
Desktop opens WindowState for app + configurator
    │
    ├──▶ App Window  →  <[App]App config={config} />
    └──▶ Configurator Window  →  <ConfiguratorPanel />
                                        │ onChange(newConfig)
                                        ▼
                               Desktop updates configs[appId]
                                        │
                                        ▼
                               App Window re-renders
```

---

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Entry point, renders Desktop |
| `components/desktop/Desktop.tsx` | Main state container |
| `components/win98/` | Win98 UI primitives |
| `components/configurator/ConfiguratorPanel.tsx` | Config UI |
| `components/apps/[app]/index.tsx` | Each app root component |
| `lib/types.ts` | AppConfig, AppId, WindowState types |
| `lib/config.ts` | Per-app config dimension definitions |
| `lib/mockData/[app].ts` | Static mock data |
| `app/api/generate-app/route.ts` | Any App mode API route |
