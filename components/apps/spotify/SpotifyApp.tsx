'use client'
import { useState, useRef, useEffect } from 'react'
import { Scrollbar } from '@/components/win98/Scrollbar'
import { Slider } from '@/components/win98/Slider'

type Track = {
  id: number
  title: string
  artists: string
  plays: number
  duration: string
  explicit?: boolean
  hasVideo?: boolean
}

const TRACKS: Track[] = [
  { id: 1,  title: "Wesley's Theory",                 artists: "Kendrick Lamar, George Clinton, Thundercat",    plays: 253111347,  duration: "4:47",  explicit: true },
  { id: 2,  title: "For Free? - Interlude",            artists: "Kendrick Lamar",                                plays: 79036748,   duration: "2:10",  explicit: true, hasVideo: true },
  { id: 3,  title: "King Kunta",                       artists: "Kendrick Lamar",                                plays: 734067310,  duration: "3:54",  explicit: true },
  { id: 4,  title: "Institutionalized",                artists: "Kendrick Lamar, Bilal, Anna Wise, Snoop Dogg",  plays: 115499717,  duration: "4:31",  explicit: true },
  { id: 5,  title: "These Walls",                      artists: "Kendrick Lamar, Bilal, Anna Wise, Thundercat",  plays: 192833956,  duration: "5:00",  explicit: true, hasVideo: true },
  { id: 6,  title: "u",                                artists: "Kendrick Lamar",                                plays: 113300482,  duration: "4:28",  explicit: true },
  { id: 7,  title: "Alright",                          artists: "Kendrick Lamar",                                plays: 1019093841, duration: "3:39",  explicit: true, hasVideo: true },
  { id: 8,  title: "For Sale? - Interlude",            artists: "Kendrick Lamar",                                plays: 69783344,   duration: "4:51",  explicit: true },
  { id: 9,  title: "Momma",                            artists: "Kendrick Lamar",                                plays: 85234123,   duration: "4:43",  explicit: true },
  { id: 10, title: "Hood Politics",                    artists: "Kendrick Lamar",                                plays: 98445677,   duration: "4:52",  explicit: true },
  { id: 11, title: "How Much a Dollar Cost",           artists: "Kendrick Lamar, James Fauntleroy, Ronald Isley", plays: 312567890, duration: "4:21",  explicit: true },
  { id: 12, title: "Complexion (A Zulu Love)",         artists: "Kendrick Lamar, Rapsody",                       plays: 156789012,  duration: "4:23",  explicit: true },
  { id: 13, title: "The Blacker the Berry",            artists: "Kendrick Lamar",                                plays: 445678901,  duration: "5:28",  explicit: true },
  { id: 14, title: "You Ain't Gotta Lie (Momma Said)", artists: "Kendrick Lamar",                                plays: 67890123,   duration: "4:01",  explicit: true },
  { id: 15, title: "i",                                artists: "Kendrick Lamar",                                plays: 534567890,  duration: "5:36",  explicit: true },
  { id: 16, title: "Mortal Man",                       artists: "Kendrick Lamar",                                plays: 43234567,   duration: "12:07", explicit: true },
]

const ALBUM_ART  = 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/b5/a6/91/b5a69171-5232-3d5b-9c15-8963802f83dd/15UMGIM15814.rgb.jpg/600x600bb.jpg'
const ARTIST_IMG = 'https://picsum.photos/seed/kendrick/400/200'
const RELATED_VIDEOS = [
  { id: 1, title: "Sing About Me, I'm...", src: 'https://picsum.photos/seed/rv1/160/90' },
  { id: 2, title: "The Heart Part 5",     src: 'https://picsum.photos/seed/rv2/160/90' },
]

const MENU_ITEMS: Record<string, (string | null)[]> = {
  File:    ['Open...', null, 'Close'],
  View:    ['Now Playing', null, 'Refresh'],
  Options: ['Shuffle', 'Repeat', null, 'About Spotify.exe'],
  Help:    ['Help Topics', null, 'About'],
}

function formatPlays(n: number): string {
  return n.toLocaleString('en-US')
}

// Win98 triangular volume slider
function VolumeSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const onChangeRef = useRef(onChange)
  useEffect(() => { onChangeRef.current = onChange }, [onChange])

  const moveRef = useRef<((ev: MouseEvent) => void) | null>(null)
  const upRef   = useRef<(() => void) | null>(null)

  useEffect(() => {
    return () => {
      if (moveRef.current) document.removeEventListener('mousemove', moveRef.current)
      if (upRef.current)   document.removeEventListener('mouseup',   upRef.current)
    }
  }, [])

  const getVal = (clientX: number) => {
    const el = trackRef.current
    if (!el) return 0
    const { left, width } = el.getBoundingClientRect()
    return Math.max(0, Math.min(100, ((clientX - left) / width) * 100))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    onChangeRef.current(Math.round(getVal(e.clientX)))
    const move = (ev: MouseEvent) => onChangeRef.current(Math.round(getVal(ev.clientX)))
    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      moveRef.current = null
      upRef.current   = null
    }
    moveRef.current = move
    upRef.current   = up
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup',   up)
  }

  return (
    <div ref={trackRef} onMouseDown={handleMouseDown} style={{ position: 'relative', width: 55, height: 20, cursor: 'default', flexShrink: 0 }}>
      {/* Triangle ramp */}
      <div style={{ position: 'absolute', bottom: 3, left: 0, right: 10, height: 14 }}>
        <svg width="100%" height="100%" viewBox="0 0 100 14" preserveAspectRatio="none">
          {/* Diagonal top edge */}
          <line x1="0" y1="13" x2="100" y2="0" stroke="var(--win98-dark)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {/* Bottom groove — dark */}
          <line x1="0" y1="13" x2="100" y2="13" stroke="var(--win98-dark)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {/* Bottom groove — white highlight */}
          <line x1="0" y1="14" x2="100" y2="14" stroke="var(--win98-light)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {/* Right edge — light (raised left) */}
          <line x1="98" y1="0" x2="98" y2="13" stroke="var(--win98-light)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {/* Right edge — dark (raised right) */}
          <line x1="99" y1="0" x2="99" y2="13" stroke="var(--win98-darker)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      {/* Thumb */}
      <div className="win98-raised" style={{
        position: 'absolute',
        top: 1,
        left: `calc(${value}% - 5px)`,
        width: 10,
        height: 18,
        background: 'var(--win98-silver)',
        cursor: 'ew-resize',
      }} />
    </div>
  )
}

const BTN: React.CSSProperties = {
  height: '22px',
  padding: '0 6px',
  fontSize: '11px',
  fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
  background: 'var(--win98-silver)',
  cursor: 'default',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
}

export function SpotifyApp() {
  const [playing, setPlaying]     = useState(true)
  const [currentId, setCurrentId] = useState(2)
  const [progress, setProgress]   = useState(20)
  const [shuffle, setShuffle]     = useState(false)
  const [repeat, setRepeat]       = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [openMenu, setOpenMenu]         = useState<string | null>(null)
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null) // stores entry label; menu context is implicit from openMenu
  const [activeBtn, setActiveBtn] = useState<string | null>(null)   // timed flash (prev/next)
  const [toggleBtn, setToggleBtn] = useState<string | null>(null)   // persistent toggles (add, dl, more, list)
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [volume, setVolume]       = useState(70)
  const [scrollPct, setScrollPct]       = useState(0)
  const [sideScrollPct, setSideScrollPct] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const sideRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const el = listRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    setScrollPct(max > 0 ? (el.scrollTop / max) * 100 : 0)
  }

  const handleScrollbarChange = (val: number) => {
    const el = listRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    el.scrollTop = (val / 100) * max
    setScrollPct(val)
  }

  const handleSideScroll = () => {
    const el = sideRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    setSideScrollPct(max > 0 ? (el.scrollTop / max) * 100 : 0)
  }

  const handleSideScrollbarChange = (val: number) => {
    const el = sideRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    el.scrollTop = (val / 100) * max
    setSideScrollPct(val)
  }

  const current = TRACKS.find(t => t.id === currentId)!

  const skip = (dir: 1 | -1) => {
    const idx = TRACKS.findIndex(t => t.id === currentId)
    setCurrentId(TRACKS[(idx + dir + TRACKS.length) % TRACKS.length].id)
  }

  useEffect(() => () => { if (pressTimer.current) clearTimeout(pressTimer.current) }, [])

  const press = (key: string, action: () => void) => {
    setActiveBtn(key)
    action()
    pressTimer.current = setTimeout(() => setActiveBtn(null), 150)
  }

  return (
    <div
      style={{ height: '100%', display: 'flex', flexDirection: 'column', fontSize: '11px', fontFamily: "'MS Sans Serif', Tahoma, sans-serif", color: 'var(--win98-text)', overflow: 'hidden' }}
      onClick={() => setOpenMenu(null)}
    >
      {/* Menu bar — same pattern as InstagramApp */}
      <div style={{ display: 'flex', background: 'var(--win98-silver)', flexShrink: 0, position: 'relative', zIndex: 100 }}>
        {Object.keys(MENU_ITEMS).map(item => (
          <div key={item} style={{ position: 'relative' }}>
            <div
              onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === item ? null : item) }}
              style={{ padding: '2px 8px', cursor: 'default', userSelect: 'none', fontSize: '11px', fontFamily: "'MS Sans Serif', Tahoma, sans-serif", background: openMenu === item ? 'var(--win98-highlight)' : 'transparent', color: openMenu === item ? 'var(--win98-highlight-text)' : 'var(--win98-text)' }}
            >
              <u style={{ textDecorationStyle: 'solid' }}>{item[0]}</u>{item.slice(1)}
            </div>
            {openMenu === item && (
              <div
                onClick={e => e.stopPropagation()}
                className="win98-raised"
                style={{ position: 'absolute', top: '100%', left: 0, minWidth: '140px', background: 'var(--win98-silver)', zIndex: 200 }}
              >
                {MENU_ITEMS[item].map((entry, i) =>
                  entry === null
                    ? <div key={i} className="win98-divider" style={{ margin: '2px 0' }} />
                    : <div
                        key={entry}
                        onMouseEnter={() => setHoveredMenuItem(entry)}
                        onMouseLeave={() => setHoveredMenuItem(null)}
                        style={{
                          padding: '3px 16px', cursor: 'default', whiteSpace: 'nowrap', fontSize: '11px',
                          background: hoveredMenuItem === entry ? 'var(--win98-highlight)' : 'transparent',
                          color: hoveredMenuItem === entry ? 'var(--win98-highlight-text)' : 'var(--win98-text)',
                        }}
                      >{entry}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Main layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left — album header + track list */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', scrollbarWidth: 'none' }} className="hide-scrollbar">

          {/* Album header */}
          <div style={{ display: 'flex', gap: '12px', padding: '10px 8px 6px', flexShrink: 0 }}>
            <img
              src={ALBUM_ART}
              alt="Album art"
              style={{ width: 120, height: 120, flexShrink: 0, objectFit: 'cover', display: 'block', borderTop: '2px solid var(--win98-darker)', borderLeft: '2px solid var(--win98-darker)', borderBottom: '2px solid var(--win98-light)', borderRight: '2px solid var(--win98-light)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '3px' }}>
              <div style={{ fontSize: '10px', color: 'var(--win98-darker)' }}>Album</div>
              <div style={{ fontSize: '28px', fontWeight: 700 }}>To Pimp A Butterfly</div>
              <div style={{ fontSize: '10px', color: 'var(--win98-darker)' }}>Kendrick Lamar · 2015 · 16 songs, 1 hr 18 min</div>
            </div>
          </div>

          {/* Action bar */}
          <div className="win98-divider" style={{ margin: '6px 8px 2px', flexShrink: 0 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '4px 8px 8px', flexShrink: 0 }}>
            <button className="win98-raised" onClick={() => setPlaying(p => !p)} style={{ ...BTN, width: '36px', height: '26px', padding: 0 }}>
              {playing ? '⏸' : '▶'}
            </button>
            <button className={shuffle ? 'win98-sunken' : 'win98-raised'} onClick={() => setShuffle(s => !s)} style={{ ...BTN, width: '36px', height: '26px', padding: 0, background: shuffle ? 'var(--win98-light)' : 'var(--win98-silver)' }}>⇄</button>
            <button className={toggleBtn === 'add' ? 'win98-sunken' : 'win98-raised'} onClick={() => setToggleBtn(b => b === 'add' ? null : 'add')} style={{ ...BTN, width: '36px', height: '26px', padding: 0, background: toggleBtn === 'add' ? 'var(--win98-light)' : 'var(--win98-silver)' }}>＋</button>
            <button className={toggleBtn === 'dl'  ? 'win98-sunken' : 'win98-raised'} onClick={() => setToggleBtn(b => b === 'dl'  ? null : 'dl')}  style={{ ...BTN, width: '36px', height: '26px', padding: 0, background: toggleBtn === 'dl'  ? 'var(--win98-light)' : 'var(--win98-silver)' }}>↓</button>
            <button className={toggleBtn === 'more' ? 'win98-sunken' : 'win98-raised'} onClick={() => setToggleBtn(b => b === 'more' ? null : 'more')} style={{ ...BTN, width: '36px', height: '26px', padding: 0, background: toggleBtn === 'more' ? 'var(--win98-light)' : 'var(--win98-silver)' }}>•••</button>
            <div style={{ flex: 1 }} />
            <button className={toggleBtn === 'list' ? 'win98-sunken' : 'win98-raised'} onClick={() => setToggleBtn(b => b === 'list' ? null : 'list')} style={{ ...BTN, background: toggleBtn === 'list' ? 'var(--win98-light)' : 'var(--win98-silver)' }}>List ≡</button>
          </div>

          {/* Track list */}
          <div className="win98-sunken" style={{ flex: 1, margin: '0 4px 8px', display: 'flex', overflow: 'hidden' }}>
            <div ref={listRef} onScroll={handleScroll} style={{ flex: 1, background: 'var(--win98-light)', overflowY: 'scroll', scrollbarWidth: 'none' }}>
            {/* Header */}
            <div style={{ display: 'flex', padding: '3px 10px', flexShrink: 0, borderBottom: '1px solid var(--win98-darker)', background: 'var(--win98-light)', position: 'sticky', top: 0 }}>
              <div style={{ width: 24, fontSize: '10px', color: 'var(--win98-dark)' }}>#</div>
              <div style={{ flex: 1, fontSize: '10px', color: 'var(--win98-dark)' }}>Title</div>
              <div style={{ width: 90, textAlign: 'right', fontSize: '10px', color: 'var(--win98-dark)' }}>Plays</div>
              <div style={{ width: 56, textAlign: 'right', fontSize: '10px', color: 'var(--win98-dark)' }}>Duration</div>
            </div>

            {/* Track rows */}
            {TRACKS.map(track => {
              const isCurrent   = track.id === currentId
              const isHovered   = hoveredId === track.id
              const highlighted = isCurrent || isHovered
              return (
                <div
                  key={track.id}
                  onMouseEnter={() => setHoveredId(track.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setCurrentId(track.id)}
                  onDoubleClick={() => { setCurrentId(track.id); setPlaying(true) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 10px',
                    cursor: 'default',
                    background: highlighted ? 'var(--win98-highlight)' : 'transparent',
                    color: highlighted ? 'var(--win98-highlight-text)' : 'var(--win98-text)',
                  }}
                >
                  <div style={{ width: 24, fontSize: '10px', color: highlighted ? 'var(--win98-highlight-text)' : 'var(--win98-dark)' }}>
                    {isCurrent && playing ? '▶' : track.id}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: isCurrent ? 700 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {track.explicit && <span style={{ fontSize: '8px', border: '1px solid currentColor', padding: '0 2px', marginRight: '4px' }}>E</span>}
                      {track.hasVideo && <span style={{ fontSize: '8px', marginRight: '4px' }}>▶</span>}
                      {track.title}
                    </div>
                    <div style={{ fontSize: '10px', color: highlighted ? 'var(--win98-highlight-text)' : 'var(--win98-darker)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {track.artists}
                    </div>
                  </div>
                  <div style={{ width: 90, textAlign: 'right', fontSize: '10px', color: highlighted ? 'var(--win98-highlight-text)' : 'var(--win98-darker)' }}>
                    {formatPlays(track.plays)}
                  </div>
                  <div style={{ width: 56, textAlign: 'right', fontSize: '10px' }}>
                    {track.duration}
                  </div>
                </div>
              )
            })}
            </div>
            <Scrollbar orientation="vertical" value={scrollPct} onChange={handleScrollbarChange} />
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 230, flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '8px 8px 8px 4px' }}>
          <div className="win98-sunken" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div ref={sideRef} onScroll={handleSideScroll} style={{ flex: 1, background: 'var(--win98-light)', overflowY: 'scroll', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column' }}>

            <div style={{ padding: '8px 8px 0', flexShrink: 0 }}>
              <img src={ALBUM_ART} alt="Album art" style={{ width: '100%', aspectRatio: '1/1', display: 'block', objectFit: 'cover' }} />
            </div>

            <div style={{ padding: '6px 8px', flexShrink: 0 }}>
              <button className="win98-raised" style={{ ...BTN, width: '100%' }}>▶ Switch to video</button>
            </div>

            <div style={{ padding: '4px 8px 6px', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current.title}</div>
                  <div style={{ fontSize: '10px', color: 'var(--win98-darker)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current.artists}</div>
                </div>
                <button className="win98-raised" style={{ ...BTN, width: '18px', height: '18px', padding: 0, flexShrink: 0 }}>+</button>
              </div>
            </div>

            <div style={{ padding: '4px 8px', flexShrink: 0 }}>
              <div style={{ fontWeight: 700, marginBottom: '4px', fontSize: '10px' }}>Related music videos</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {RELATED_VIDEOS.map(v => (
                  <div key={v.id} style={{ flex: 1, minWidth: 0 }}>
                    <img src={v.src} alt={v.title} style={{ width: '100%', display: 'block', objectFit: 'cover', borderTop: '1px solid var(--win98-darker)', borderLeft: '1px solid var(--win98-darker)', borderBottom: '1px solid var(--win98-light)', borderRight: '1px solid var(--win98-light)' }} />
                    <div style={{ fontSize: '9px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.title}</div>
                    <div style={{ fontSize: '9px', color: 'var(--win98-darker)' }}>Kendrick Lamar</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '4px 8px', flexShrink: 0 }}>
              <div style={{ fontWeight: 700, marginBottom: '4px', fontSize: '10px' }}>About the artist</div>
              <img src={ARTIST_IMG} alt="Kendrick Lamar" style={{ width: '100%', display: 'block', objectFit: 'cover', marginBottom: '4px', borderTop: '1px solid var(--win98-darker)', borderLeft: '1px solid var(--win98-darker)', borderBottom: '1px solid var(--win98-light)', borderRight: '1px solid var(--win98-light)' }} />
              <div style={{ fontWeight: 700 }}>Kendrick Lamar</div>
              <div style={{ fontSize: '10px', color: 'var(--win98-darker)', marginTop: '2px' }}>41,234,567 monthly listeners</div>
            </div>

            </div>
            <Scrollbar orientation="vertical" value={sideScrollPct} onChange={handleSideScrollbarChange} />
          </div>
        </div>
      </div>

      {/* Bottom player */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 8px' }}>
        {/* Left: album art + track info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, alignSelf: 'flex-start', marginTop: '2px' }}>
          <img src={ALBUM_ART} alt="" style={{ width: 36, height: 36, flexShrink: 0, objectFit: 'cover', display: 'block', borderTop: '1px solid var(--win98-darker)', borderLeft: '1px solid var(--win98-darker)', borderBottom: '1px solid var(--win98-light)', borderRight: '1px solid var(--win98-light)' }} />
          <div style={{ width: 140, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current.title}</div>
            <div style={{ fontSize: '9px', color: 'var(--win98-darker)' }}>
              {current.hasVideo && '▶ Music video • '}{current.artists}
            </div>
          </div>
        </div>

        {/* Center: buttons + progress */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3px' }}>
            <button className={shuffle ? 'win98-sunken' : 'win98-raised'} onClick={() => setShuffle(s => !s)} style={{ ...BTN, width: '36px', height: '26px', padding: 0, fontSize: '10px', background: shuffle ? 'var(--win98-light)' : 'var(--win98-silver)' }}>⇄</button>
            <button className={activeBtn === 'prev' ? 'win98-sunken' : 'win98-raised'} onClick={() => press('prev', () => skip(-1))} style={{ ...BTN, width: '36px', height: '26px', padding: 0, fontSize: '9px' }}><span style={{ display: 'inline-block', transform: 'rotate(180deg)', lineHeight: 1 }}>▶▶</span></button>
            <button className="win98-raised" onClick={() => setPlaying(p => !p)} style={{ ...BTN, width: '36px', height: '26px', padding: 0, fontSize: '11px' }}>{playing ? '⏸' : '▶'}</button>
            <button className={activeBtn === 'next' ? 'win98-sunken' : 'win98-raised'} onClick={() => press('next', () => skip(1))} style={{ ...BTN, width: '36px', height: '26px', padding: 0, fontSize: '9px' }}>▶▶</button>
            <button className={repeat ? 'win98-sunken' : 'win98-raised'} onClick={() => setRepeat(r => !r)} style={{ ...BTN, width: '36px', height: '26px', padding: 0, fontSize: '14px', background: repeat ? 'var(--win98-light)' : 'var(--win98-silver)' }}>↺</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', padding: '0 24px' }}>
            <span style={{ fontSize: '9px', color: 'var(--win98-darker)', whiteSpace: 'nowrap' }}>0:28</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Slider value={progress} min={0} max={100} onChange={setProgress} />
            </div>
            <span style={{ fontSize: '9px', color: 'var(--win98-darker)', whiteSpace: 'nowrap' }}>{current.duration}</span>
          </div>
        </div>

        {/* Right: volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
          <span style={{ fontSize: '11px' }}>🔊</span>
          <VolumeSlider value={volume} onChange={setVolume} />
        </div>
      </div>

    </div>
  )
}
