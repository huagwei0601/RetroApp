# Win98 UI Museum — Claude Code Context

## What This Project Is

An interactive web experience that reimagines today's most recognizable apps as if they were built in 1998. Users land on a faithful Windows 98 desktop, double-click app icons, and get a side-by-side view of the Win98-styled app + a Configurator Panel to tweak design variables live.

This is a **portfolio project** — visual fidelity and interaction quality matter more than feature completeness.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom Win98 component classes (see `docs/DESIGN_SYSTEM.md`)
- **AI**: Anthropic API (Claude) — used only for "Any App" mode
- **Deploy**: Vercel

---

## Directory Structure

```
/
├── CLAUDE.md
├── app/
│   ├── page.tsx               ← Desktop shell (entry point)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── win98/                 ← Win98 UI component library (build this first)
│   │   ├── Window.tsx
│   │   ├── TitleBar.tsx
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── RadioGroup.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Scrollbar.tsx
│   │   ├── StatusBar.tsx
│   │   ├── Dialog.tsx
│   │   ├── TabPanel.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Icon.tsx
│   ├── desktop/
│   │   ├── Desktop.tsx
│   │   ├── Taskbar.tsx
│   │   ├── StartMenu.tsx
│   │   ├── DesktopIcon.tsx
│   │   └── TaskbarButton.tsx
│   ├── configurator/
│   │   └── ConfiguratorPanel.tsx
│   └── apps/
│       ├── spotify/
│       ├── slack/
│       ├── twitter/
│       ├── chatgpt/
│       ├── notion/
│       └── instagram/
├── lib/
│   ├── types.ts
│   ├── config.ts
│   └── mockData/
└── docs/
    ├── ARCHITECTURE.md
    ├── DESIGN_SYSTEM.md
    └── COMPONENTS.md
```

---

## Build Order

**Always build in this order. Do not skip steps.**

1. Win98 component library (`components/win98/`)
2. Desktop shell (`components/desktop/`)
3. Configurator Panel (`components/configurator/`)
4. Apps one at a time — start with Spotify

---

## Win98 Visual Rules (CRITICAL)

### CSS Variables (define in globals.css)
```css
--win98-desktop:           #008080
--win98-silver:            #C0C0C0
--win98-dark:              #808080
--win98-darker:            #404040
--win98-light:             #FFFFFF
--win98-titlebar:          #000080
--win98-titlebar-inactive: #808080
--win98-titletext:         #FFFFFF
--win98-text:              #000000
--win98-disabled:          #808080
--win98-highlight:         #000080
--win98-highlight-text:    #FFFFFF
```

### Beveled Borders
Raised (button default):
```css
border-top: 2px solid #FFFFFF;
border-left: 2px solid #FFFFFF;
border-bottom: 2px solid #404040;
border-right: 2px solid #404040;
```
Sunken (pressed, input):
```css
border-top: 2px solid #404040;
border-left: 2px solid #404040;
border-bottom: 2px solid #FFFFFF;
border-right: 2px solid #FFFFFF;
```

### Typography
- Font: `'MS Sans Serif', 'Tahoma', sans-serif`
- Base size: 11px
- Weight: 400 or 700 only

### PROHIBITED — never do these
- ❌ `rounded` or `rounded-*` Tailwind classes
- ❌ `box-shadow` for depth (use beveled borders)
- ❌ Transitions/animations (except window open/close)
- ❌ blur, backdrop-filter, opacity effects
- ❌ shadcn, radix, or any modern UI library
- ❌ lucide/heroicons SVGs — use pixel art or text symbols

---

## Configuration System

```typescript
type AppConfig = {
  density: 'minimal' | 'comfortable' | 'compact'
  notificationLevel: 'silent' | 'normal' | 'aggressive'
  dataVolume: 'empty' | 'normal' | 'overwhelmed'
  userRole: 'free' | 'pro' | 'admin'
  currentView: string  // app-specific
}
```

Not all dimensions apply to every app. Each app defines its own subset.

---

## Window System

Every app opens two windows side by side:
- **App Window** (~65% width): the Win98 app
- **Configurator Panel** (~35% width): Win98 Properties-style panel

Windows are draggable, minimizable, closeable. Z-index managed by last-click focus.

---

## Per-App Specs

Read before implementing any app:
- `apps/SPOTIFY.md`
- `apps/SLACK.md`
- `apps/TWITTER.md`
- `apps/CHATGPT.md`
- `apps/NOTION.md`
- `apps/INSTAGRAM.md`
