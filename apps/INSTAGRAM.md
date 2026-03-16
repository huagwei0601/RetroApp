# App Spec: Instagram → Windows Picture Viewer

## What This Recreates

Instagram's core experience: browsing photos, seeing likes and comments, viewing a profile. Rendered as Windows Picture Viewer / Photo Album with previous/next navigation and a comment pane below.

---

## Views

| View ID | Description |
|---------|-------------|
| `feed` | Photo feed — one photo at a time, prev/next navigation, likes/comments below |
| `profile` | User profile — stats header + photo grid (thumbnail grid layout) |
| `story` | Story viewer — full-width photo with a progress bar across the top |

Default view: `feed`

---

## Layout

### Feed View
```
┌─────────────────────────────────────────────┐
│ [Menu: File  View  Navigate  Favorites Help]│
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │                                       │  │
│  │         [Photo Placeholder]           │  │
│  │           160 x 160 px               │  │
│  │        (gray checkerboard)            │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  @username · March 16, 1998                │
│  Golden hour vibes 🌅 #nofilter            │
│                                             │
│  ♥ 1,204 likes                             │
│  ─────────────────────────────────────────  │
│  @alice: stunning shot!                    │
│  @bob: where was this taken?               │
│  @carol: 😍😍😍                            │
│  [Add a comment...                   ] [→] │
├─────────────────────────────────────────────┤
│ [◄ Prev]   Photo 3 of 12   [Next ►]        │
└─────────────────────────────────────────────┘
```

**Photo placeholders**: Since we can't show real Instagram photos, render placeholders as Windows-style image thumbnails — gray checkerboard pattern with a small landscape/camera icon in the center. Each photo gets a different shade to differentiate.

### Profile View
Top section: Win98 "Properties" style panel with:
- Username, @handle
- Stats in a row: Posts: 142 · Followers: 8,204 · Following: 312
- Bio text

Below: Thumbnail grid (3 columns) of photo placeholders, each 80x80px, selectable.

### Story View
Full-width photo area (takes most of the window). Progress bar across top (Win98 style, segmented). Username overlay at top. Tap/click to advance.

---

## Configuration Dimensions

### density
- `minimal`: Photo only. No username, no caption, no comments.
- `comfortable`: Default. Photo + caption + like count + top 3 comments.
- `compact`: Smaller photo (120x120), all metadata but very tight spacing.

### dataVolume
- `empty`: "No photos yet" with a camera icon. Profile shows 0 posts.
- `normal`: 12 photos in feed. Profile grid shows 12 thumbnails.
- `overwhelmed`: 200+ photos in feed (photo counter shows "Photo 3 of 247"). Comments section has 80+ comments, scrollbar required.

### notificationLevel
- `silent`: No badges.
- `normal`: "Notifications" menu item shows badge: "Notifications (5)".
- `aggressive`: Dialog on open: "You have 47 new likes and 12 new followers!" Then a second dialog: "Suggested accounts to follow — don't miss out!" Must dismiss both.

### userRole
- `free`: "Switch to Professional Account" banner at top of profile. Some features (Insights, Promote) greyed out in menu.
- `pro`: Blue checkmark ✓ next to username. Insights menu item enabled.
- `admin`: Can see a hidden "Flagged content" count on photos. Extra menu: "Content Moderation".

---

## Interactions

- Prev/Next buttons navigate through the photo feed
- Click a comment to "like" it (heart toggles)
- Click "Add a comment" input, type, press Enter to add comment
- Like button (♥) toggles and increments count
- In profile view: click thumbnail to open that photo in feed view
- Story view: click left half = previous story, right half = next story; progress bar advances

---

## Mock Data

```typescript
const photos = [
  { id: 1, user: "travelbug", shade: "#D4C5A9",
    caption: "Golden hour vibes 🌅 #travel #photography",
    likes: 1204, comments: [
      { user: "alice", text: "Stunning shot!" },
      { user: "bob", text: "Where was this taken?" },
      { user: "carol", text: "I need to go here 😍" },
    ]
  },
  { id: 2, user: "foodie_life", shade: "#C8A882",
    caption: "Sunday brunch done right 🥞 #foodphotography",
    likes: 892, comments: [
      { user: "dave", text: "Looks delicious!" },
      { user: "emma", text: "Recipe please!!" },
    ]
  },
  { id: 3, user: "cityscape99", shade: "#A8B8C8",
    caption: "The city never sleeps 🌃 #nightphotography #urban",
    likes: 3401, comments: [
      { user: "alice", text: "Love this perspective" },
      { user: "frank", text: "What camera?" },
      { user: "cityscape99", text: "Just a point and shoot!" },
    ]
  },
  { id: 4, user: "naturelens", shade: "#8BAF8B",
    caption: "Morning mist over the valley 🌿",
    likes: 2108, comments: [
      { user: "grace", text: "So peaceful" },
      { user: "henry", text: "Perfect composition" },
    ]
  },
]

const currentUser = {
  username: "you",
  handle: "@you",
  bio: "📸 Amateur photographer | ☕ Coffee addict | 🌍 Explorer",
  posts: 142,
  followers: 8204,
  following: 312,
}
```

---

## Window Title

`Instagram 98 — Photo Viewer`

## Status Bar

Left: "@travelbug · Photo 3 of 12"  |  Right: "March 16, 1998"
