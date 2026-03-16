# App Spec: ChatGPT → Terminal / Command Prompt

## What This Recreates

ChatGPT's core experience: a conversational interface where you ask questions and get answers. Rendered as a Windows 98 Command Prompt / MS-DOS window, where user input and AI responses scroll in a monospace terminal.

---

## Views

| View ID | Description |
|---------|-------------|
| `chat` | Active terminal session — conversation scrolls, input at bottom |
| `history` | List of past "sessions" in a file-manager style list |

Default view: `chat`

---

## Layout

### Chat View
```
┌─────────────────────────────────────────────┐
│ ChatGPT 98 - Session 1                  [×] │
├─────────────────────────────────────────────┤
│ Microsoft(R) ChatGPT Version 1.0            │
│ (C) Copyright OpenAI Corp 1998-2026.        │
│                                             │
│ C:\> Hello, who are you?                   │
│                                             │
│ I am an AI assistant. I can help you        │
│ answer questions, write text, and solve     │
│ problems. What would you like to know?      │
│                                             │
│ C:\> What is the weather today?            │
│                                             │
│ I'm sorry, I don't have access to real-     │
│ time data. Please check your local          │
│ newspaper or call the weather hotline.      │
│                                             │
│ C:\> _                                     │
├─────────────────────────────────────────────┤
│ [C:\>                              ] [Enter]│
└─────────────────────────────────────────────┘
```

**Key visual detail:** Black background, white/green monospace text. This is the ONE exception to the silver Win98 surface — the terminal content area is black. The window chrome (title bar, status bar) remains standard Win98 silver.

### History View
Win98 file manager list with columns: Name, Date Modified, Size
Each row is a saved session (e.g., "Session 1", "Help with essay", "Code review").
Double-click opens that session in chat view.

---

## Configuration Dimensions

### density
- `minimal`: Only user input and AI response text. No prompt prefix, no line breaks between exchanges.
- `comfortable`: Default. `C:\>` prompt prefix, blank lines between turns, response text wraps naturally.
- `compact`: Tight spacing, smaller font simulation (use 10px), no blank lines.

### dataVolume
- `empty`: Fresh terminal. Only the header banner visible. No conversation history.
- `normal`: 4–6 exchanges visible.
- `overwhelmed`: Long conversation history requiring scroll. Some responses are very long (50+ lines). Scrollbar fully active.

### notificationLevel
- `silent`: No interruptions.
- `normal`: Status bar shows "AI is thinking..." during simulated response delay.
- `aggressive`: A Win98 dialog box appears after every 3 messages: "ChatGPT Plus — Upgrade for faster responses!" with OK and Cancel buttons.

### userRole
- `free`: After 5 messages, a dialog appears: "You've reached your message limit. Please wait 60 minutes or upgrade to Plus." Input is disabled.
- `pro`: Unlimited messages. Response speed indicator shows "Fast mode".
- `admin`: Extra menu item "System Prompt Editor" in menu bar.

---

## Terminal Behavior

- User types in the input bar at the bottom
- Pressing Enter appends `C:\> [user text]` to the terminal, followed by a simulated AI response
- Responses appear character-by-character (typewriter effect) — one of the few allowed animations
- Terminal scrolls to bottom on new content
- Cursor blinks in the input area (`_` character, CSS blink animation OK here)

## Pre-loaded Conversation (normal dataVolume)

```
C:\> What is Windows 98?

Windows 98 is a consumer-oriented operating system developed by
Microsoft. It was released on June 25, 1998 as a successor to
Windows 95. Key features include improved USB support, Internet
Explorer 4 integration, and the FAT32 file system.

C:\> Is it better than Windows 95?

That depends on your needs. Windows 98 offers better hardware
support and internet integration. However, Windows 95 is more
stable on older hardware. Many users prefer Windows 98 for
its improved plug-and-play capabilities.

C:\> What comes after Windows 98?

Microsoft released Windows 98 Second Edition in 1999, followed
by Windows Me (Millennium Edition) in 2000. The business line
continued with Windows 2000 and later Windows XP in 2001.

C:\> _
```

---

## Window Title

`ChatGPT 98 — C:\CHAT\SESSION001`

## Status Bar

Left: "Ready"  |  Right: "Session 1 · 6 exchanges"
