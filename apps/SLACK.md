# App Spec: Slack → Classic IRC/Chat Window

## What This Recreates

Slack's core experience: a workspace with channels, direct messages, and a message thread. Rendered as a classic IRC/MSN-era chat client with a channel sidebar and message pane.

---

## Views

| View ID | Description |
|---------|-------------|
| `channel` | Main chat — sidebar with channels, message thread on right |
| `dm` | Direct messages — same layout but DM list instead of channels |
| `thread` | Thread reply view — message + replies in a side panel |

Default view: `channel`

---

## Layout

### Channel View
```
┌──────────────────────────────────────────────┐
│ [Menu: File  Edit  View  Go  Help]           │
├────────────┬─────────────────────────────────┤
│ Workspace  │ # general                       │
│ ──────────  │ ─────────────────────────────── │
│ Channels   │  [Mon 3/16/1998]                │
│  # general │                                 │
│  # design  │  Alice: hey everyone            │
│  # random  │  Bob: what's up                 │
│  # dev     │  Alice: anyone seen the new     │
│            │  Clippy demo?                   │
│ ──────────  │  Bob: lol yes it's wild         │
│ Direct     │  Carol: just got back from      │
│  Alice     │  lunch, what did I miss         │
│  Bob       │                                 │
│            │ ─────────────────────────────── │
│            │ [Message #general         ] [→] │
└────────────┴─────────────────────────────────┘
```

---

## Configuration Dimensions

### density
- `minimal`: Message list only, no timestamps, no avatars, no channel descriptions.
- `comfortable`: Default. Timestamps, user labels, grouped messages.
- `compact`: Every message on its own line with timestamp inline. IRC style.

### notificationLevel
- `silent`: No badges, no unread indicators, no bold channel names.
- `normal`: Unread channels shown in bold. Message count badge on channels.
- `aggressive`: Red badge on every channel. Popup dialog: "You have 47 unread messages in #general. View now?" A second dialog appears when first is dismissed.

### dataVolume
- `empty`: Channels exist but no messages. "No messages yet — start the conversation!"
- `normal`: 15–20 messages visible per channel.
- `overwhelmed`: Messages are dense, scroll required immediately, #random has 300+ unread badge.

### userRole
- `free`: Only 3 channels visible (limit reached). Banner: "Free workspaces are limited to 3 channels. Upgrade to Pro."
- `pro`: All channels. Full message history.
- `admin`: All channels + "Admin" label in sidebar. Extra menu item: "Manage Workspace".

---

## Interactions

- Click a channel in sidebar to switch the message pane
- Click a DM name to switch to DM view
- Message input: type and press Enter (or click →) to "send" — appends message to thread
- Scroll in message pane
- Click a message to "reply in thread" — opens thread view

---

## Mock Data

```typescript
const channels = ['general', 'design', 'random', 'dev', 'announcements']

const messages = {
  general: [
    { user: "Alice", time: "9:01 AM", text: "Good morning everyone!" },
    { user: "Bob", time: "9:03 AM", text: "Morning! Anyone joining the 10am standup?" },
    { user: "Carol", time: "9:05 AM", text: "I'll be there" },
    { user: "Alice", time: "9:07 AM", text: "Same, just finishing up the mockups" },
    { user: "Dave", time: "9:15 AM", text: "Quick reminder — design review is at 2pm today" },
    { user: "Bob", time: "9:16 AM", text: "Thanks for the reminder" },
    { user: "Carol", time: "10:32 AM", text: "Standup was great. Sharing notes in #design" },
    { user: "Alice", time: "10:45 AM", text: "Mockups are ready for review: [link]" },
    { user: "Dave", time: "11:02 AM", text: "Looks great Alice! Left some comments" },
    { user: "Alice", time: "11:10 AM", text: "On it!" },
  ]
}

const dms = [
  { user: "Alice", lastMessage: "Sounds good, see you then!", unread: 0 },
  { user: "Bob", lastMessage: "Can you review my PR?", unread: 2 },
  { user: "Dave", lastMessage: "Thanks!", unread: 0 },
]
```

---

## Window Title

`Slack 98 — #general`  (updates with active channel)

## Status Bar

Left panel: workspace name ("Acme Corp")
Right panel: connection status ("Connected" with green dot simulation via text)
