'use client'
import { PixelAvatar } from '@/components/win98/PixelAvatar'
import { useState } from 'react'
import { currentUser } from '@/lib/mockData/instagram'

type Message = {
  id: number
  user: string
  avatarUrl?: string
  preview: string
  shade?: string
  time: string
  hasMedia?: boolean
}

const MESSAGES: Message[] = [
  { id: 1,  user: 'JA-JAYZ',   avatarUrl: 'https://cdn.pixilart.com/images/user/profile/large/337c43f72117e00.png',  shade: '#D4C5A9', preview: 'Liked your photo',        time: '2m',  hasMedia: false },
  { id: 2,  user: 'tsurune',   avatarUrl: 'https://cdn.pixilart.com/images/user/profile/large/0b0e5e7dc80756f.png',  shade: '#C8A882', preview: 'Sent you a photo',        time: '14m', hasMedia: true  },
  { id: 3,  user: 'baeguri',   avatarUrl: 'https://cdn.pixilart.com/images/user/profile/large/a430279280ae58a.png',  shade: '#A8B8C8', preview: 'What camera do you use?', time: '1h',  hasMedia: false },
  { id: 4,  user: 'bluemossi', avatarUrl: 'https://cdn.pixilart.com/images/user/profile/large/f6d9f4af7101548.png',  shade: '#8BAF8B', preview: 'Check this out 👀',       time: '3h',  hasMedia: false },
  { id: 5,  user: 'alice',    avatarUrl: 'https://picsum.photos/seed/face55/80/80', shade: '#D4C5A9', preview: 'Sent you a reel',         time: '5h',  hasMedia: true  },
  { id: 6,  user: 'bob',      avatarUrl: 'https://picsum.photos/seed/face66/80/80', shade: '#C8A882', preview: 'See you tomorrow!',        time: '1d',  hasMedia: false },
  { id: 7,  user: 'carol',    avatarUrl: 'https://picsum.photos/seed/face77/80/80', shade: '#A8B8C8', preview: 'Liked your message',       time: '2d',  hasMedia: false },
  { id: 8,  user: 'j.wanderer', avatarUrl: 'https://picsum.photos/seed/face88/80/80', shade: '#C8D4A8', preview: 'That shot is fire 🔥',   time: '2d',  hasMedia: false },
  { id: 9,  user: 'mia.eats',   avatarUrl: 'https://picsum.photos/seed/face99/80/80', shade: '#D4A8C8', preview: 'Sent you a voice note',  time: '3d',  hasMedia: true  },
  { id: 10, user: 'k.lens',     avatarUrl: 'https://picsum.photos/seed/face10/80/80', shade: '#A8C8D4', preview: 'When is the collab?',    time: '3d',  hasMedia: false },
  { id: 11, user: 'oakwood',    avatarUrl: 'https://picsum.photos/seed/face12/80/80', shade: '#B8A8D4', preview: 'Replied to your story',   time: '4d',  hasMedia: false },
  { id: 12, user: 'sunframe',   avatarUrl: 'https://picsum.photos/seed/face13/80/80', shade: '#D4B8A8', preview: 'Sent you a reel',         time: '5d',  hasMedia: true  },
]

export function MessageView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(1)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filtered = MESSAGES.filter(m =>
    m.user.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 8px',
        background: 'var(--win98-silver)',
        flexShrink: 0,
      }}>
        <span style={{ fontWeight: 700, fontSize: '12px' }}>{currentUser.handle}</span>
        <button
          className="win98-raised"
          style={{
            padding: '0 8px', height: '20px', fontSize: '11px',
            display: 'flex', alignItems: 'center',
            fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
            background: 'var(--win98-silver)', cursor: 'default',
          }}
        >New message</button>
      </div>

      {/* Search bar */}
      <div style={{ padding: '6px 8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--win98-light)' }} className="win98-sunken">
          <span style={{ padding: '0 4px', fontSize: '11px', color: 'var(--win98-dark)' }}>🔍</span>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="search-input"
            style={{
              flex: 1, height: '20px', padding: '0 4px', fontSize: '11px',
              fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
              background: 'var(--win98-light)', border: 'none', outline: 'none', color: 'var(--win98-text)',
            }}
          />
        </div>
      </div>

      {/* Message list */}
      <div className="win98-sunken hide-scrollbar" style={{ flex: 1, overflowY: 'auto', margin: '0 8px 8px', background: 'var(--win98-light)', scrollbarWidth: 'none' }}>
        {filtered.map(msg => {
          const selected = selectedId === msg.id
          const highlighted = selected || hoveredId === msg.id
          return (
            <div
              key={msg.id}
              onClick={() => setSelectedId(msg.id)}
              onMouseEnter={() => setHoveredId(msg.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 8px',
                cursor: 'default',
                background: highlighted ? 'var(--win98-highlight)' : 'var(--win98-light)',
                color: highlighted ? 'var(--win98-highlight-text)' : 'var(--win98-text)',
              }}
            >
              <PixelAvatar size={36} src={msg.avatarUrl} background={msg.shade} smooth />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  @{msg.user}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: highlighted ? 'var(--win98-highlight-text)' : 'var(--win98-darker)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  {msg.hasMedia && <span>📷</span>}
                  {msg.preview}
                  <span style={{ marginLeft: '4px' }}>• {msg.time}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
