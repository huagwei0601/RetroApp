# App Spec: Twitter/X → BBS-style Post Board

## What This Recreates

Twitter/X's core experience: a feed of posts, a profile page, and a thread view. Rendered as a classic BBS/bulletin board system with a post list and reply threads.

---

## Views

| View ID | Description |
|---------|-------------|
| `feed` | Main timeline — list of posts, newest first |
| `profile` | User profile — avatar placeholder, stats, post history |
| `thread` | Single post + replies expanded |

Default view: `feed`

---

## Layout

### Feed View
```
┌─────────────────────────────────────────────┐
│ [Menu: File  View  Post  Account  Help]     │
├─────────────┬───────────────────────────────┤
│ Navigation  │ Home Timeline                 │
│ ──────────  │ ─────────────────────────────  │
│ 🏠 Home     │ @elonm · 2 min ago            │
│ 🔍 Search   │ The bird is freed             │
│ 🔔 Alerts   │ [Reply] [Repost] [Like: 142k] │
│ ✉ Messages  │ ─────────────────────────────  │
│ 👤 Profile  │ @jack · 14 min ago            │
│             │ just setting up my twttr      │
│             │ [Reply] [Repost] [Like: 1]    │
│             │ ─────────────────────────────  │
│             │ @design · 1 hr ago            │
│             │ hot take: flat design was a   │
│             │ mistake                       │
│             │ [Reply] [Repost] [Like: 847]  │
├─────────────┴───────────────────────────────┤
│ [What's happening?                    ] [▶] │
└─────────────────────────────────────────────┘
```

### Profile View
Header area: username, @handle, bio, follower/following counts (styled like a Win98 system properties panel).
Below: post history list.

### Thread View
Original post at top, replies listed below with indentation for nested replies.

---

## Configuration Dimensions

### density
- `minimal`: Text only — no reply/repost/like counts, no timestamps.
- `comfortable`: Default. Full post with all metadata.
- `compact`: Smaller row height, truncate at 1 line, show count inline.

### notificationLevel
- `silent`: No badges, no alerts highlighted.
- `normal`: "Alerts" nav item shows count badge (e.g., "🔔 Alerts (3)").
- `aggressive`: A dialog box interrupts: "You have 47 new notifications! Check them now?" Plus a second dialog: "Trending in your area: 'Win98 Is Back'" with a Dismiss button.

### dataVolume
- `empty`: "No tweets yet. Follow some people to see posts here." Feed is empty.
- `normal`: 10–15 posts in feed.
- `overwhelmed`: Dense feed, posts overlap visually (tight spacing), like counts in the millions, post composer area is hidden below fold.

### userRole (maps to verification/subscription)
- `free`: Normal account. No special features.
- `pro`: Gold checkmark (rendered as `✓` in gold color) next to username. "Twitter Blue" label.
- `admin`: Admin dashboard link appears in nav. Can see "Flagged for review" posts (shown in red).

---

## Interactions

- Click a post to expand into thread view
- Click "Reply" to open a compose dialog (Win98 dialog with textarea)
- Click "Repost" to show a confirmation dialog
- Click "Like" to increment the number (visual only)
- Left nav items switch views
- Compose bar at bottom: type + click ▶ to post (appends to feed)

---

## Mock Data

```typescript
const posts = [
  { id: 1, user: "designthoughts", handle: "designthoughts", time: "2 min ago",
    text: "Hot take: Windows 98 had better UX than most modern apps. Change my mind.", likes: 1204, reposts: 342, replies: 89 },
  { id: 2, user: "techhistory", handle: "techhistory", time: "15 min ago",
    text: "Fun fact: The Windows 98 setup wizard is still the most-used piece of software ever written.", likes: 8821, reposts: 1205, replies: 234 },
  { id: 3, user: "uxwriter", handle: "uxwriter", time: "1 hr ago",
    text: "Error messages in 1998 were honest. 'This program has performed an illegal operation.' No euphemisms.", likes: 4402, reposts: 891, replies: 156 },
  { id: 4, user: "productmanager", handle: "pmlife", time: "2 hr ago",
    text: "My roadmap for Q2: 1. Ship 2. Learn 3. Iterate. That's it. That's the tweet.", likes: 2910, reposts: 503, replies: 77 },
  { id: 5, user: "webdev1998", handle: "webdev1998", time: "3 hr ago",
    text: "Just added a hit counter and a 'best viewed in IE4' badge to my homepage. Perfection.", likes: 6721, reposts: 1402, replies: 311 },
  { id: 6, user: "clippy_official", handle: "clippy", time: "4 hr ago",
    text: "It looks like you're writing a tweet. Would you like help with that?", likes: 44201, reposts: 9821, replies: 2034 },
]
```

---

## Window Title

`Twitter 98 — Home Timeline`

## Status Bar

Left panel: logged in as "@you"
Right panel: post count ("6 new posts")
