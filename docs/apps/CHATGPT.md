# App Spec: ChatGPT → MS-DOS Terminal

## What This Recreates

ChatGPT's conversation interface reimagined as a command-line terminal / MS-DOS prompt.
Reference: Windows 98 MS-DOS Prompt window, combined with old-school BBS chat.

---

## Views

Controlled by `config.currentView`:

### `chat` (default)
Full terminal aesthetic:
- Black background, white/green monospace text
- Conversation history scrolls upward like a terminal
- User input shown as `C:\> ` prompt prefix
- AI responses shown with `AI:` prefix in a slightly different color (light cyan or green)
- Blinking cursor at current input line
- Input: sunken text field at very bottom, full width, with "Send ▶" button

Message format:
```
C:\> tell me a joke

AI: Why don't scientists trust atoms?
    Because they make up everything.

C:\> what's the meaning of life?

AI: 42. Though some argue the real answer is whatever
    you make of the time between prompts.

C:\> _
```

### `history`
Left pane: List of past conversations as file names in a Win98 file list view
  (columns: Name, Date, Size). E.g. "joke_about_atoms.txt", "meaning_of_life.txt"
Right pane: Preview of selected conversation (same terminal style)
"New Chat" button at top left (styled as a toolbar button)

---

## Configuration Behavior

### Density
- **Minimal**: Terminal shows only the last 3 exchanges. Font size 10px.
- **Comfortable** (default): Full terminal, all history scrollable, 12px font.
- **Compact**: 10px font, tighter line spacing (1.2), history pane narrowed to 120px.

### Data Volume
- **Empty**: Terminal shows only the prompt: `C:\>` with blinking cursor.
  History view shows "No conversations yet."
- **Normal** (default): 5 exchanges in chat view, 6 items in history.
- **Overwhelmed**: 40+ exchanges shown in terminal, scrollbar required.
  History shows 87 items. Terminal output includes a very long AI response that
  wraps across 20+ lines.

### Notification Level (not used — hide in configurator)
### User Role (not used — hide in configurator)

---

## Mock Data

```typescript
export const conversation = [
  { role: 'user', text: 'what is the internet?' },
  { role: 'ai',   text: 'The internet is a global network of computers that communicate using a standardized set of protocols (TCP/IP). Think of it as a very large postal system, except instead of letters it sends packets of data, and instead of days it takes milliseconds.' },
  { role: 'user', text: 'can i buy things on it?' },
  { role: 'ai',   text: 'Yes, though I\'d recommend being careful. Some sites like Amazon.com allow you to purchase goods. Always look for the padlock icon in your browser and "https://" at the start of the address before entering any payment information.' },
  { role: 'user', text: 'what\'s a good website to visit' },
  { role: 'ai',   text: 'Some popular destinations:\n  - www.google.com (search engine)\n  - www.yahoo.com (news and email)\n  - www.amazon.com (shopping)\n  - www.imdb.com (movies)\n  - www.wikipedia.org (encyclopedia)' },
]

export const history = [
  { name: 'what_is_internet.txt',   date: '3/15/2026', size: '4 KB' },
  { name: 'recipe_help.txt',        date: '3/14/2026', size: '2 KB' },
  { name: 'explain_stocks.txt',     date: '3/12/2026', size: '6 KB' },
  { name: 'poem_about_cats.txt',    date: '3/10/2026', size: '1 KB' },
  { name: 'travel_planning.txt',    date: '3/08/2026', size: '8 KB' },
  { name: 'debugging_session.txt',  date: '3/05/2026', size: '12 KB' },
]
```

---

## Terminal Styling

```css
.terminal {
  background: #000000;
  color: #C0C0C0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
  padding: 8px;
}

.terminal-prompt { color: #FFFFFF; }
.terminal-ai     { color: #00C0C0; }   /* cyan for AI responses */
.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #FFFFFF;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
```

Note: Terminal area uses its own black background and overrides Win98 silver surface.
The outer window chrome (title bar, borders, status bar) remains Win98 silver.

---

## Status Bar

Left: "Ready"
Right: "3/15/2026 3:14 PM"

---

## Window Size

Default: 520×400px
