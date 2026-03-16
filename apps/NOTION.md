# App Spec: Notion → File Manager + Notepad

## What This Recreates

Notion's core experience: a hierarchical document workspace where you can browse pages and edit content. Rendered as a Windows Explorer-style file manager (left sidebar tree) combined with a Notepad-style editing pane on the right.

---

## Views

| View ID | Description |
|---------|-------------|
| `explorer` | File manager + document editor (default, split view) |
| `editor` | Full-width editor — document pane takes full window |
| `database` | Table/database view — like a Win98 spreadsheet grid |

Default view: `explorer`

---

## Layout

### Explorer View
```
┌─────────────────────────────────────────────────┐
│ [Menu: File  Edit  View  Insert  Format  Help]  │
├────────────────┬────────────────────────────────┤
│ 📁 Workspace   │  📄 Product Roadmap            │
│  📄 Home       │  ──────────────────────────    │
│  📁 Projects   │  # Product Roadmap             │
│   📄 Roadmap   │                                │
│   📄 Spec      │  Q1 Goals                      │
│   📁 Research  │  • Ship the new dashboard      │
│  📁 Notes      │  • Reduce onboarding time      │
│   📄 Meeting   │  • Fix the mobile nav          │
│   📄 Ideas     │                                │
│  📁 Archive    │  Q2 Goals                      │
│                │  • Launch API v2               │
│                │  • Redesign settings page      │
│                │                                │
│                │  [editing cursor here]         │
├────────────────┴────────────────────────────────┤
│ 14 items           | Modified: 3/16/1998        │
└─────────────────────────────────────────────────┘
```

### Database View
A Win98-style grid (like a simple spreadsheet) with column headers and rows. Columns: Name, Status, Priority, Assignee, Due Date.

---

## Configuration Dimensions

### density
- `minimal`: Editor only, no sidebar. Clean Notepad experience.
- `comfortable`: Default split view with sidebar and editor.
- `compact`: Sidebar narrower, editor shows more rows, toolbar hidden.

### dataVolume
- `empty`: No pages in workspace. Sidebar shows only "📁 Workspace (empty)". Editor shows "Create your first page".
- `normal`: 8–10 pages/docs across a few folders.
- `overwhelmed`: Deep folder nesting (4+ levels), many pages, sidebar requires scroll, some folder names truncated.

### userRole
- `free`: Banner at top of editor: "Free plan — 1000 blocks used. Upgrade to continue." Some pages show a lock icon.
- `pro`: Full access. No banners.
- `admin`: Extra items in menu: "Manage Members", "Settings & Billing". Sidebar shows member avatars next to pages.

### notificationLevel
- `silent`: No badges or alerts.
- `normal`: Some pages show "2 comments" indicator next to title.
- `aggressive`: Dialog on open: "3 people commented on your pages while you were away. View now?" Plus inline comment bubbles scattered in the document.

---

## Interactions

- Click folder in sidebar to expand/collapse (toggle arrow)
- Click document in sidebar to load it in editor pane
- Editor is a simple contenteditable area — user can type (no persistence needed)
- Double-click folder to enter it (replaces sidebar context)
- Switch to Database view via View menu or view selector
- In Database view: cells are clickable, show a dropdown or text input inline

---

## Mock Data

```typescript
const workspace = {
  name: "My Workspace",
  pages: [
    { id: 'home', title: 'Home', icon: '🏠', type: 'page' },
    {
      id: 'projects', title: 'Projects', icon: '📁', type: 'folder', children: [
        { id: 'roadmap', title: 'Product Roadmap', icon: '📄', type: 'page' },
        { id: 'spec', title: 'Design Spec', icon: '📄', type: 'page' },
        { id: 'research', title: 'Research', icon: '📁', type: 'folder', children: [
          { id: 'interviews', title: 'User Interviews', icon: '📄', type: 'page' },
          { id: 'competitive', title: 'Competitive Analysis', icon: '📄', type: 'page' },
        ]},
      ]
    },
    {
      id: 'notes', title: 'Notes', icon: '📁', type: 'folder', children: [
        { id: 'meetings', title: 'Meeting Notes', icon: '📄', type: 'page' },
        { id: 'ideas', title: 'Ideas', icon: '📄', type: 'page' },
      ]
    },
    { id: 'archive', title: 'Archive', icon: '📁', type: 'folder', children: [] },
  ]
}

const pageContent = {
  roadmap: `# Product Roadmap\n\nQ1 Goals\n• Ship the new dashboard\n• Reduce onboarding time by 30%\n• Fix the mobile navigation\n\nQ2 Goals\n• Launch API v2\n• Redesign settings page\n• Add dark mode`,
}

const databaseRows = [
  { name: "New dashboard", status: "In Progress", priority: "High", assignee: "Alice", due: "3/30/1998" },
  { name: "Onboarding redesign", status: "Planning", priority: "High", assignee: "Bob", due: "4/15/1998" },
  { name: "API v2", status: "Not Started", priority: "Medium", assignee: "Carol", due: "5/01/1998" },
  { name: "Settings page", status: "Not Started", priority: "Low", assignee: "Dave", due: "5/15/1998" },
]
```

---

## Window Title

`Notion 98 — Product Roadmap`

## Status Bar

Left: "14 items"  |  Right: "Modified: 3/16/1998 2:51 PM"
