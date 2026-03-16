# App Spec: Instagram → Windows Picture Viewer / Photo Album

## What This Recreates

Instagram's photo browsing experience reimagined as Windows Picture and Fax Viewer combined
with a Windows Photo Album. Think of it as a slideshow program from a disposable camera CD.

---

## Views

Controlled by `config.currentView`:

### `feed` (default)
Single large image viewer with navigation:
- **Top toolbar**: [◀ Back] [▶ Next] [🔍 Zoom In] [🔍 Zoom Out] [⛶ Slideshow] [🖨 Print]
  (All Win98 toolbar buttons — raised bevel, 24px height)
- **Main area**: Current photo centered on white/gray checkerboard background
  (the checkerboard = Win98 photo viewer's "no image" pattern)
  Photo fills the space with correct aspect ratio.
- **Bottom strip** (info panel, sunken):
  Username (bold) + caption text | ♥ 2,847 likes | 💬 43 comments | 📅 March 14, 2026

### `profile`
Grid layout like Windows thumbnail view:
- **Top**: User info row — pixel avatar box, display name, handle, stats
  (Posts: 127 | Followers: 4,291 | Following: 389)
- **Below**: 3-column grid of photo thumbnails (each ~100×100px, sunken border).
  Hovering shows filename tooltip. Double-clicking opens the photo in feed view.

### `story`
Simulates the "stories" feature as a Win98 slideshow dialog:
- Dialog window with progress bar at top (auto-advances every 3 seconds)
- Photo centered in dialog
- Username + time ago label below photo
- [◀ Prev Story] [▶ Next Story] [✕ Close] buttons at bottom
- A fake "Reply to story" text input at the very bottom

---

## Configuration Behavior

### Density
- **Minimal**: Feed view — image only, no info strip. Profile — 4-column grid, no user header.
- **Comfortable** (default): Full layout as above.
- **Compact**: Info strip shows only username + like count. Profile grid 4-column, smaller thumbnails.

### Notification Level
- **Silent**: No badges anywhere.
- **Normal** (default): App title bar shows "Instagram 98 (5)".
- **Aggressive**: On load, a dialog pops: "❤️ 5 people liked your photo. [View] [OK]"
  Then a second: "👤 @photouser started following you. [View Profile] [OK]"

### Data Volume
- **Empty**: Feed shows the checkerboard "no image" placeholder. Caption area: "No photos yet."
  Profile grid is empty. Message: "Share your first photo!"
- **Normal** (default): 8 photos in feed, 12 in profile grid.
- **Overwhelmed**: 200 photos in feed (scroll through all of them). Profile grid has 8 rows
  requiring scrollbar. Some captions are essay-length with 30 hashtags.

### User Role (not used — hide in configurator)

---

## Mock Data

Use solid color placeholders for photos (colored rectangles with a label) — no real images needed.

```typescript
export const photos = [
  {
    id: 1,
    color: '#B8860B',
    label: 'Golden Gate at Sunset',
    user: 'wanderlust_wei',
    caption: 'Golden hour never disappoints. San Francisco never gets old. 🌉',
    likes: 2847,
    comments: 43,
    date: 'March 14, 2026',
  },
  {
    id: 2,
    color: '#2F4F4F',
    label: 'Misty Morning Hike',
    user: 'wanderlust_wei',
    caption: 'Up before the sun. Worth every step.',
    likes: 1203,
    comments: 17,
    date: 'March 10, 2026',
  },
  {
    id: 3,
    color: '#8B4513',
    label: 'Coffee and Figma',
    user: 'wanderlust_wei',
    caption: 'Design mode activated ☕ Working on something new.',
    likes: 892,
    comments: 28,
    date: 'March 7, 2026',
  },
  {
    id: 4,
    color: '#4169E1',
    label: 'Ocean at Dusk',
    user: 'wanderlust_wei',
    caption: 'Pacific Ocean 🌊 there is nowhere I would rather be.',
    likes: 3401,
    comments: 61,
    date: 'March 3, 2026',
  },
  {
    id: 5,
    color: '#228B22',
    label: 'Presidio Walk',
    user: 'wanderlust_wei',
    caption: 'Spring is here 🌿',
    likes: 654,
    comments: 9,
    date: 'Feb 28, 2026',
  },
]

export const currentUser = {
  displayName: 'Wei Huang',
  handle: 'wanderlust_wei',
  posts: 127,
  followers: 4291,
  following: 389,
}
```

---

## Photo Placeholder Component

Since we're not using real photos, each photo is rendered as:

```tsx
<div
  style={{
    background: photo.color,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <span style={{ color: 'white', fontSize: 11, textAlign: 'center', padding: 8 }}>
    {photo.label}
  </span>
</div>
```

This is intentional — pixelated colored blocks have their own retro charm.

---

## Status Bar

Left: "Photo 1 of 8"
Right: "wanderlust_wei | 4,291 followers"

---

## Window Size

Default: 520×460px
