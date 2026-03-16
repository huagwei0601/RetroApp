# App Spec: Notion → Windows Explorer + Notepad

## What This Recreates

Notion's document/database workspace reimagined as Windows Explorer combined with Notepad.
The folder tree IS the page hierarchy. Opening a page opens it in the right pane like a
file preview.

---

## Views

Controlled by `config.currentView`:

### `document` (default)
Classic Windows Explorer two-pane layout:
- **Left pane** (160px): Folder/page tree. Root is "My Workspace".
  Expandable with [+]/[-] toggles. Icons: 📁 for pages with children, 📄 for leaf pages.
- **Right pane**: Content of selected page, rendered like a Notepad / WordPad document.
  Shows page title (bold, larger), then body text. Supports "headings" as bold lines.

### `database`
Right pane switches to a Win98-style ListView (Detail view):
- Toolbar with view toggle buttons: [📋 List] [🔲 Grid] [📅 Calendar]
- Grid: a table with column headers, rows, and alternating row shading.
  Each cell is editable (click to get a sunken input).
  Columns: Name, Status (dropdown), Priority, Due Date, Owner

### `kanban`
Right pane shows columns side by side:
- Each column is a group box (Win98 GroupBox with label): "Not Started", "In Progress", "Done"
- Cards inside are sunken bordered boxes with title + tag
- Cards can be clicked to "open" (dialog with full card content)

---

## Configuration Behavior

### Density
- **Minimal**: Left pane hidden. Only right pane content shown. Toolbar hidden.
- **Comfortable** (default): Full two-pane layout.
- **Compact**: Left pane 120px, row height 14px in tree, tighter card spacing in kanban.

### Data Volume
- **Empty**: Tree shows only "My Workspace" (collapsed). Right pane: "Select a page to view."
- **Normal** (default): 3 top-level sections, each with 2–3 child pages.
- **Overwhelmed**: Deep tree with 5 levels of nesting. Database view has 50+ rows requiring
  scrollbar. Kanban "In Progress" column has 12 cards stacked.

### User Role
- **Free** (default): Left pane footer: "Free Plan — 1,000 blocks used of 1,000"
  All pages accessible but "Templates" section is grayed out.
- **Pro**: No footer warning. Templates section accessible.
- **Admin**: Extra top-level item in tree: "⚙ Settings & Members". Clicking shows
  a Win98 Properties-style dialog with member list table.

### Notification Level (not used — hide in configurator)

---

## Mock Data

```typescript
export const pageTree = [
  {
    id: 'workspace',
    name: 'My Workspace',
    icon: '🖥️',
    expanded: true,
    children: [
      {
        id: 'projects',
        name: 'Projects',
        icon: '📁',
        expanded: true,
        children: [
          { id: 'portfolio', name: 'Portfolio Site', icon: '📄', content: portfolioContent },
          { id: 'win98',     name: 'Win98 Museum',   icon: '📄', content: win98Content },
          { id: 'redesign',  name: 'App Redesigns',  icon: '📄', content: redesignContent },
        ]
      },
      {
        id: 'notes',
        name: 'Notes',
        icon: '📁',
        expanded: false,
        children: [
          { id: 'reading',  name: 'Reading List',   icon: '📄', content: readingContent },
          { id: 'ideas',    name: 'Random Ideas',   icon: '📄', content: ideasContent },
        ]
      },
      {
        id: 'resources',
        name: 'Resources',
        icon: '📁',
        expanded: false,
        children: [
          { id: 'design',  name: 'Design Inspo',   icon: '📄', content: designContent },
          { id: 'fonts',   name: 'Font Library',   icon: '📄', content: fontsContent },
        ]
      }
    ]
  }
]

export const portfolioContent = `Portfolio Site

Overview
Building a personal portfolio to showcase UX and product design work.

Goals
- Clean, memorable presentation
- Case studies with process documentation
- Win98 Museum as hero project

Tech Stack
Next.js 14, TypeScript, Tailwind CSS
Deployed on Vercel
`

export const databaseRows = [
  { name: 'Portfolio Site',  status: 'In Progress', priority: 'High',   due: '4/1/2026',  owner: 'Wei' },
  { name: 'Win98 Museum',    status: 'In Progress', priority: 'High',   due: '3/30/2026', owner: 'Wei' },
  { name: 'Case Study #1',   status: 'Not Started', priority: 'Medium', due: '4/15/2026', owner: 'Wei' },
  { name: 'Resume Update',   status: 'Done',        priority: 'Low',    due: '3/10/2026', owner: 'Wei' },
  { name: 'LinkedIn Update', status: 'Done',        priority: 'Low',    due: '3/12/2026', owner: 'Wei' },
]
```

---

## Status Bar

Left: "Portfolio Site — 3 objects"
Right: "My Workspace | Free Plan"

---

## Window Size

Default: 580×440px
