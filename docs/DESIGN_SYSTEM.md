# Design System — Win98 UI Museum

## Core Principle

Every visual decision must be answerable with "would this have existed in Windows 98?" If not, don't do it.

---

## Color Palette

Define all colors as CSS variables in `globals.css`. Never hardcode hex values in components.

```css
:root {
  /* Surfaces */
  --win98-desktop:           #008080;
  --win98-silver:            #C0C0C0;
  --win98-white:             #FFFFFF;
  --win98-black:             #000000;

  /* Borders */
  --win98-light:             #FFFFFF;   /* raised border highlight */
  --win98-mid:               #808080;   /* mid shadow */
  --win98-dark:              #404040;   /* dark shadow */

  /* Title bars */
  --win98-titlebar-active:   #000080;
  --win98-titlebar-inactive: #808080;
  --win98-titletext:         #FFFFFF;

  /* Text */
  --win98-text:              #000000;
  --win98-text-disabled:     #808080;

  /* Selection */
  --win98-select-bg:         #000080;
  --win98-select-text:       #FFFFFF;

  /* Inputs */
  --win98-input-bg:          #FFFFFF;
  --win98-input-border:      #808080;
}
```

---

## Typography

```css
font-family: 'MS Sans Serif', 'Microsoft Sans Serif', Tahoma, sans-serif;
font-size: 11px;
line-height: 1.2;
```

**Rules:**
- Never exceed 13px for body text
- Title bars: 11px bold, white, no text-transform
- Dialog titles: 11px bold
- Status bar: 10px
- Only weights: 400 (normal) and 700 (bold)

---

## Beveled Borders (the heart of Win98)

Use these as CSS utility classes in `globals.css`:

```css
/* Raised — default state for buttons, panels */
.win98-raised {
  border-top:    2px solid #FFFFFF;
  border-left:   2px solid #FFFFFF;
  border-bottom: 2px solid #404040;
  border-right:  2px solid #404040;
}

/* Sunken — pressed buttons, text inputs, list boxes */
.win98-sunken {
  border-top:    2px solid #404040;
  border-left:   2px solid #404040;
  border-bottom: 2px solid #FFFFFF;
  border-right:  2px solid #FFFFFF;
}

/* Flat — status bar panels, menu items */
.win98-flat {
  border: 1px solid #808080;
}

/* Window outer border */
.win98-window {
  border-top:    2px solid #FFFFFF;
  border-left:   2px solid #FFFFFF;
  border-bottom: 2px solid #404040;
  border-right:  2px solid #404040;
  background:    #C0C0C0;
}
```

---

## Spacing

Base unit: 4px. Use multiples of 4.

| Token | Value | Use |
|-------|-------|-----|
| `--space-1` | 2px | Icon label gap |
| `--space-2` | 4px | Internal button padding |
| `--space-3` | 8px | Standard padding inside panels |
| `--space-4` | 12px | Section spacing |
| `--space-5` | 16px | Window content padding |

Window content padding: 8px all sides.
Button padding: 4px 12px.
Dialog padding: 12px.

---

## Components Quick Reference

### Button
- Background: `#C0C0C0`
- Border: raised (default), sunken (active/pressed)
- Min width: 75px
- Height: 23px
- Padding: 4px 12px
- On mousedown: switch to sunken border, offset content by 1px down-right

### Text Input
- Background: white
- Border: sunken
- Height: 21px
- Padding: 2px 4px

### Title Bar (active)
- Background: `#000080`
- Text: white, 11px bold
- Height: 18px
- Padding: 2px 4px
- Includes: app icon (16x16), title text, minimize/maximize/close buttons

### Title Bar (inactive)
- Background: `#808080`

### Title Bar Buttons (minimize / maximize / close)
- Size: 16x16
- Background: `#C0C0C0`, raised border
- Icons: text symbols (`_`, `□`, `×`) at 9px

### Scrollbar
- Width: 17px
- Background: checkered `#C0C0C0/#808080` pattern (or solid `#C0C0C0`)
- Arrows: raised buttons with triangle symbols
- Thumb: raised button

### Status Bar
- Height: 20px
- Border-top: 1px solid `#808080`
- Padding: 2px 8px
- Font: 10px
- Panels separated by sunken 1px borders

### Menu Bar
- Height: 20px
- Items: padding 4px 8px
- Hover: `#000080` background, white text
- Dropdown: raised border, white background, `#C0C0C0` separators

### List Box / File List
- Background: white
- Border: sunken
- Selected item: `#000080` background, white text
- Alternating rows: optional, no color difference in Win98 (keep white)

### Tab Panel
- Active tab: `#C0C0C0`, raised on 3 sides (no bottom border)
- Inactive tab: slightly lower, `#C0C0C0` with bottom border
- Tab content area: raised border

### Progress Bar
- Background: sunken border, white fill
- Fill: `#000080` blocks with 2px gaps (Win98 segmented style)

### Dialog / Modal
- Same as window but no resize
- Standard button order: OK / Cancel / Apply
- Icon sizes: 32x32 for info/warning/error icons

---

## Icons

- Desktop icons: 32x32px PNG, pixel art style
- Small icons (title bar, menus): 16x16px
- System icons: recreate Win98 originals or use emoji with pixel font
- App icons: each app needs a custom 32x32 icon that references the modern app (e.g., Spotify = green music note in Win98 style)

---

## Prohibited Patterns

| Pattern | Why |
|---------|-----|
| `border-radius` / `rounded-*` | Win98 has no rounded corners |
| `box-shadow` | Use beveled borders for depth |
| CSS transitions (except open/close) | Win98 had no animations |
| `backdrop-filter`, `blur` | Not period-accurate |
| Opacity for layering | Not period-accurate |
| `Inter`, `Geist`, or any modern font | Wrong era |
| Gradients (except title bar) | Title bar only |
| Any Tailwind component library | Build from scratch |
