# App Spec: Spotify → WinAmp-style Player

## What This Recreates

Spotify's core experience: browsing a music library, playing a track, seeing what's playing. Rendered as a WinAmp-era music player with a playlist window and playback controls.

## Modern App Reference

Spotify — music streaming. Key screens: Now Playing, Library/Playlist, Search.

---

## Views

| View ID | Description |
|---------|-------------|
| `nowPlaying` | Main player — album art, track info, playback controls, progress bar |
| `library` | Playlist/library browser — list of tracks with artist, album, duration |
| `search` | Search box + results list |

Default view: `nowPlaying`

---

## Layout

### Now Playing View
```
┌─────────────────────────────────────┐
│ [Menu: File  View  Options  Help]   │
├──────────┬──────────────────────────┤
│          │ Track Title              │
│  Album   │ Artist Name              │
│  Art     │ Album Name · 2024        │
│  (64x64) │                          │
│          │ ████████░░░░░░  1:23/3:45│
├──────────┴──────────────────────────┤
│  [|◄◄] [◄◄] [▶/▐▐] [►►] [►►|]     │
│  Vol: ████░░  Shuffle  Repeat       │
└─────────────────────────────────────┘
```

### Library View
File-manager style list with columns: #, Title, Artist, Album, Duration
Rows are selectable. Double-click plays a track (switches to Now Playing).

### Search View
Text input at top (sunken). Results list below, same columns as Library.

---

## Configuration Dimensions

### density
- `minimal`: Only track name + controls. No album art, no artist/album metadata.
- `comfortable`: Default. Album art + full metadata + controls.
- `compact`: Full info but tighter spacing. More tracks visible in Library.

### dataVolume
- `empty`: "No tracks in library" message in Library view. Now Playing shows dashes.
- `normal`: 12–15 tracks in library.
- `overwhelmed`: 200+ tracks, scrollbar active, playlist feels crowded.

### userRole
- `free`: Ads inserted between tracks in the playlist (show a row labeled "Advertisement — 0:30"). Shuffle disabled with lock icon.
- `pro`: Full access. No ads.
- `admin`: Same as pro but shows a "Manage Library" option in the menu.

### notificationLevel
- `silent`: No popups.
- `normal`: Occasional "New Release" balloon tooltip in taskbar.
- `aggressive`: A Win98 error-style dialog pops up: "Spotify Premium — Upgrade now for unlimited skips!" Must be dismissed.

---

## Interactions

- Play/pause button toggles between ▶ and ▐▐ icons
- Progress bar is draggable (scrubbing — just moves the visual, no real audio)
- Track list rows: single click selects, double click "plays" (switches to Now Playing with that track)
- Volume slider: draggable, affects nothing visually except the slider position
- Shuffle / Repeat: toggle on/off (visual state only)
- Skip forward/back: cycles through mock tracks

---

## Mock Data

```typescript
const tracks = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: "5:55" },
  { id: 2, title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", duration: "5:01" },
  { id: 3, title: "Hotel California", artist: "Eagles", album: "Hotel California", duration: "6:30" },
  { id: 4, title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", duration: "8:02" },
  { id: 5, title: "Purple Haze", artist: "Jimi Hendrix", album: "Are You Experienced", duration: "2:50" },
  { id: 6, title: "Imagine", artist: "John Lennon", album: "Imagine", duration: "3:07" },
  { id: 7, title: "Like a Rolling Stone", artist: "Bob Dylan", album: "Highway 61 Revisited", duration: "6:13" },
  { id: 8, title: "What's Going On", artist: "Marvin Gaye", album: "What's Going On", duration: "3:53" },
  { id: 9, title: "Respect", artist: "Aretha Franklin", album: "I Never Loved a Man", duration: "2:28" },
  { id: 10, title: "Johnny B. Goode", artist: "Chuck Berry", album: "One Dozen Berrys", duration: "2:41" },
  { id: 11, title: "Good Vibrations", artist: "The Beach Boys", album: "Smiley Smile", duration: "3:35" },
  { id: 12, title: "Yesterday", artist: "The Beatles", album: "Help!", duration: "2:05" },
]

const currentTrack = tracks[0]
```

---

## Window Title

`Spotify 98 - [Track Title]`  (updates when track changes)

## Status Bar

Left panel: current track status ("Playing", "Paused", "Stopped")
Right panel: track count ("12 tracks · 52:18 total")
