# App Spec: Slack → Classic IRC / Chat Client

## What This Recreates

Slack's channel-based messaging, reimagined as a late-90s IRC client or AOL Instant
Messenger hybrid. Think mIRC meets Windows Messenger.

---

## Views

Controlled by `config.currentView`:

### `channel` (default)
Classic three-pane IRC layout:
- **Left pane** (140px): Channel list — grouped under "Channels" and "Direct Messages"
  headers. Each item is a text row with a # prefix for channels, bullet for DMs.
  Selected item is highlighted navy.
- **Center pane**: Message log — scrollable list of messages. Each message:
  `[timestamp] <username> message text`
  Format exactly like old IRC: monospace-friendly, tight rows.
- **Bottom**: Input area — sunken text field + "Send" button

### `dm`
Same layout as channel but active item in left pane is a DM, and message style
drops the channel topic header.

### `threads`
Left pane unchanged. Center pane shows a thread — "parent" message at top with
horizontal rule, replies indented below. "Reply in thread" input at bottom.

---

## Configuration Behavior

### Density
- **Minimal**: Message log shows only `<username>: message` with no timestamps. Left pane
  shows only unread channels (collapsed).
- **Comfortable** (default): Full layout as above.
- **Compact**: Row height 14px, timestamps hidden, left pane 110px wide, no avatars.

### Notification Level
- **Silent**: No badge counts anywhere. Channel names are plain text.
- **Normal** (default): Unread channels shown in bold. One channel shows "(3)" badge.
- **Aggressive**: Multiple channels have red badge counts. On load, a Win98 system tray
  balloon dialog pops up: "💬 New message in #general — 'Hey is anyone around?'"
  Also: a blinking title bar notification ("● New message — Slack 98").

### Data Volume
- **Empty**: Channel list has only #general. No messages. Center pane shows
  "No messages yet. Be the first to say something!"
- **Normal** (default): 6 channels, 3 DMs, ~15 messages in active channel.
- **Overwhelmed**: 47 channels listed (scrollbar required), active channel has 200+
  messages, input area shows "Slack is working hard..." fake loading state.

### User Role
- **Free**: Left pane footer shows "Free Plan — 10,000 message limit reached"
  with a "Upgrade" button (disabled/grayed out in Win98 style).
- **Pro** (default): No banner.
- **Admin**: Left pane shows extra section "Administration" with items:
  "Member Management", "Billing", "Settings".

---

## Mock Data

```typescript
export const channels = [
  { id: 'general',   name: 'general',   unread: 3 },
  { id: 'random',    name: 'random',    unread: 0 },
  { id: 'design',    name: 'design',    unread: 1 },
  { id: 'frontend',  name: 'frontend',  unread: 0 },
  { id: 'marketing', name: 'marketing', unread: 0 },
  { id: 'bugs',      name: 'bugs',      unread: 7 },
]

export const dms = [
  { id: 'alice', name: 'alice_design',  online: true  },
  { id: 'bob',   name: 'bob_frontend',  online: false },
  { id: 'carol', name: 'carol_pm',      online: true  },
]

export const messages = [
  { time: '9:02 AM',  user: 'alice_design',  text: 'Good morning everyone!' },
  { time: '9:05 AM',  user: 'bob_frontend',  text: 'Morning! Anyone looked at the new designs?' },
  { time: '9:07 AM',  user: 'carol_pm',      text: 'Yes! Shared them in #design' },
  { time: '9:15 AM',  user: 'alice_design',  text: 'The spacing on the modal looks off btw' },
  { time: '9:16 AM',  user: 'bob_frontend',  text: 'I can fix that this morning' },
  { time: '9:20 AM',  user: 'carol_pm',      text: 'Thanks! Also — standup in 10 min' },
  { time: '9:28 AM',  user: 'alice_design',  text: 'be there' },
  { time: '9:29 AM',  user: 'bob_frontend',  text: 'same' },
  { time: '10:45 AM', user: 'carol_pm',      text: 'Anyone free for a quick sync this afternoon?' },
  { time: '10:52 AM', user: 'alice_design',  text: '3pm works for me' },
  { time: '11:00 AM', user: 'bob_frontend',  text: '3pm is good' },
  { time: '11:01 AM', user: 'carol_pm',      text: 'Great, sending invite now' },
]
```

---

## Status Bar

Left: "#general | 6 members"
Right: "Connected to Workspace98"

---

## Window Size

Default: 600×420px
