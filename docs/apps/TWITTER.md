# App Spec: Twitter/X → BBS Post Board

## What This Recreates

Twitter's core feed experience reimagined as a late-90s bulletin board system (BBS) or
Usenet newsreader. Think Outlook Express meets a forum client.

---

## Views

Controlled by `config.currentView`:

### `feed` (default)
Two-pane layout like Outlook Express:
- **Top pane** (~40% height): Post list — columns: [From] [Subject/first line] [Time] [♥]
  Each row is one tweet. Selected row is highlighted.
- **Bottom pane** (~60% height): Full post content for selected item. Shows:
  Username (bold), handle in gray, timestamp, then full text.
  Reply/Retweet/Like buttons at bottom as Win98 buttons.

### `profile`
Single column:
- Header area: pixel art avatar box (64×64), display name, handle, bio text, stats row
  (Following: 214 | Followers: 1,847 | Posts: 3,291)
- Below: same post list as feed, but showing only this user's posts

### `thread`
Selected post shown at top with full text, then replies below as indented rows.
"Reply" input field at bottom with "Post Reply" button.

---

## Configuration Behavior

### Density
- **Minimal**: Top pane shows only [From] and [Subject]. Bottom pane hidden (single-pane mode).
- **Comfortable** (default): Full two-pane layout with all columns.
- **Compact**: Row height 14px, no bottom pane preview, all columns shown.

### Notification Level
- **Silent**: No badge, no alerts.
- **Normal** (default): Tab shows "X (3)" — 3 new posts since last visit.
- **Aggressive**: On load, a Win98 dialog pops: "⚠️ You have 47 new notifications.
  [View] [Dismiss]". Also a second dialog: "🔔 Breaking: Something happened. [Read More]"

### Data Volume
- **Empty**: Top pane shows "No posts to display." in center. Welcome message in bottom pane.
- **Normal** (default): 12 posts in feed.
- **Overwhelmed**: 200+ posts in feed list (requires scrollbar). Post text in bottom pane
  includes 15 hashtags and 3 quote-tweet embeds rendered as nested sunken boxes.

### User Role (not used for Twitter — hide in configurator)

---

## Mock Data

```typescript
export const posts = [
  {
    id: 1,
    user: 'Paul Graham',
    handle: '@paulg',
    time: '2h',
    text: 'The most important thing you can do as a startup founder is talk to users. Everything else follows from that.',
    likes: 4821,
    retweets: 892,
  },
  {
    id: 2,
    user: 'Andrej Karpathy',
    handle: '@karpathy',
    time: '3h',
    text: 'Neural networks are just matrix multiplications with a lot of hopes and dreams attached.',
    likes: 12403,
    retweets: 2341,
  },
  {
    id: 3,
    user: 'Sarah Drasner',
    handle: '@sarah_edo',
    time: '4h',
    text: 'Hot take: the best CSS is CSS you don\'t have to write.',
    likes: 3201,
    retweets: 445,
  },
  {
    id: 4,
    user: 'Dan Abramov',
    handle: '@dan_abramov',
    time: '5h',
    text: 'I\'ve been thinking about why some code feels obviously right and other code feels obviously wrong. It\'s not style. It\'s whether you can hold the whole thing in your head.',
    likes: 8934,
    retweets: 1203,
  },
  {
    id: 5,
    user: 'Maggie Appleton',
    handle: '@Mappletons',
    time: '6h',
    text: 'Designed a new way to think about knowledge graphs today. Hand-drawn diagrams > polished slides every time.',
    likes: 2109,
    retweets: 387,
  },
  {
    id: 6,
    user: 'Paul Graham',
    handle: '@paulg',
    time: '8h',
    text: 'Prestige is a very reliable way to get people to work on the wrong things.',
    likes: 6721,
    retweets: 1089,
  },
]

export const currentUser = {
  displayName: 'Win98 Museum',
  handle: '@win98museum',
  bio: 'What if all your apps were made in 1998',
  following: 214,
  followers: 1847,
  posts: 3291,
}
```

---

## Status Bar

Left: "For You | Following"  (tab-style text, "For You" underlined/active)
Right: "Last refreshed: 2:47 PM"

---

## Window Size

Default: 560×440px
