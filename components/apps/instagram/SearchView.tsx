'use client'

import { useState } from 'react'
import { PhotoPlaceholder } from './PhotoPlaceholder'

type GridItem = {
  id: number
  shade: string
  src: string
  views: string
  isVideo: boolean
  isSponsored?: boolean
}

const GRID_ITEMS: GridItem[] = [
  { id: 1,  shade: '#D4C5A9', src: 'https://picsum.photos/seed/g1/300/300',  views: '2.4M', isVideo: true  },
  { id: 2,  shade: '#C8A882', src: 'https://picsum.photos/seed/g2/300/300',  views: '891K', isVideo: false },
  { id: 3,  shade: '#A8B8C8', src: 'https://picsum.photos/seed/g3/300/300',  views: '3.1M', isVideo: true  },
  { id: 4,  shade: '#8BAF8B', src: 'https://picsum.photos/seed/g4/300/300',  views: '456K', isVideo: false },
  { id: 5,  shade: '#D4A8A8', src: 'https://picsum.photos/seed/g5/300/300',  views: '1.2M', isVideo: true  },
  { id: 6,  shade: '#B8C8A8', src: 'https://picsum.photos/seed/g6/300/300',  views: '678K', isVideo: false },
  { id: 7,  shade: '#C8D4A8', src: 'https://picsum.photos/seed/g7/300/300',  views: '5.6M', isVideo: true,  isSponsored: true },
  { id: 8,  shade: '#A8C8D4', src: 'https://picsum.photos/seed/g8/300/300',  views: '234K', isVideo: false },
  { id: 9,  shade: '#D4A8C8', src: 'https://picsum.photos/seed/g9/300/300',  views: '987K', isVideo: true  },
  { id: 10, shade: '#C8B8A8', src: 'https://picsum.photos/seed/g10/300/300', views: '1.8M', isVideo: false },
  { id: 11, shade: '#A8D4B8', src: 'https://picsum.photos/seed/g11/300/300', views: '345K', isVideo: true  },
  { id: 12, shade: '#B8A8D4', src: 'https://picsum.photos/seed/g12/300/300', views: '2.2M', isVideo: false },
  { id: 13, shade: '#D4C5B8', src: 'https://picsum.photos/seed/g13/300/300', views: '1.1M', isVideo: true  },
  { id: 14, shade: '#C8D4C8', src: 'https://picsum.photos/seed/g14/300/300', views: '567K', isVideo: false },
  { id: 15, shade: '#A8A8D4', src: 'https://picsum.photos/seed/g15/300/300', views: '4.2M', isVideo: true  },
  { id: 16, shade: '#D4D4A8', src: 'https://picsum.photos/seed/g16/300/300', views: '312K', isVideo: false },
  { id: 17, shade: '#B8D4A8', src: 'https://picsum.photos/seed/g17/300/300', views: '2.8M', isVideo: true  },
  { id: 18, shade: '#C8A8B8', src: 'https://picsum.photos/seed/g18/300/300', views: '743K', isVideo: false },
  { id: 19, shade: '#A8C8B8', src: 'https://picsum.photos/seed/g19/300/300', views: '6.1M', isVideo: true,  isSponsored: true },
  { id: 20, shade: '#D4B8C8', src: 'https://picsum.photos/seed/g20/300/300', views: '429K', isVideo: false },
  { id: 21, shade: '#B8B8D4', src: 'https://picsum.photos/seed/g21/300/300', views: '1.5M', isVideo: true  },
  { id: 22, shade: '#C8D4B8', src: 'https://picsum.photos/seed/g22/300/300', views: '881K', isVideo: false },
  { id: 23, shade: '#A8D4D4', src: 'https://picsum.photos/seed/g23/300/300', views: '3.3M', isVideo: true  },
  { id: 24, shade: '#D4A8B8', src: 'https://picsum.photos/seed/g24/300/300', views: '196K', isVideo: false },
]

const FILTER_TABS = ['For You', 'Reels', 'Photos', 'Videos', 'People', 'Tags']

export function SearchView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('For You')
  const [isFocused, setIsFocused] = useState(false)
  const [hoveredSearch, setHoveredSearch] = useState<string | null>(null)

  const RECENT_SEARCHES = ['travel photography', 'win98', 'food', 'cityscape', 'nature']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
      {/* Search bar */}
      <div style={{ padding: '6px 8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--win98-light)' }} className="win98-sunken">
          <span style={{ padding: '0 4px', fontSize: '11px', color: 'var(--win98-dark)' }}>🔍</span>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="Search"
            className="search-input"
            style={{
              flex: 1, height: '20px', padding: '0 4px', fontSize: '11px',
              fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
              background: 'var(--win98-light)', border: 'none', outline: 'none', color: 'var(--win98-text)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'default', padding: '0 4px', fontSize: '10px' }}
            >✕</button>
          )}
        </div>

        {/* Recent searches dropdown */}
        {isFocused && searchQuery === '' && (
          <div className="win98-sunken" style={{
            position: 'absolute',
            left: '8px',
            right: '8px',
            background: 'var(--win98-light)',
            zIndex: 10,
            marginTop: '1px',
          }}>
            {RECENT_SEARCHES.map((s, i) => {
              const highlighted = hoveredSearch === s || (hoveredSearch === null && i === 0)
              return (
                <div
                  key={s}
                  onClick={() => setSearchQuery(s)}
                  onMouseEnter={() => setHoveredSearch(s)}
                  onMouseLeave={() => setHoveredSearch(null)}
                  style={{
                    padding: '1px 4px',
                    fontSize: '11px',
                    cursor: 'default',
                    fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                    background: highlighted ? 'var(--win98-highlight)' : 'var(--win98-light)',
                    color: highlighted ? 'var(--win98-highlight-text)' : 'var(--win98-text)',
                  }}
                >
                  {s}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex',
        background: 'var(--win98-silver)',
        flexShrink: 0,
        padding: '2px 8px',
        gap: '2px',
      }}>
        {FILTER_TABS.map(tab => {
          const active = activeFilter === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              style={{
                flex: 1,
                height: '20px',
                fontSize: '10px',
                fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                background: 'var(--win98-silver)',
                cursor: 'default',
                whiteSpace: 'nowrap',
                fontWeight: active ? 700 : 400,
                borderTop:    active ? '2px solid var(--win98-darker)' : '2px solid var(--win98-light)',
                borderLeft:   active ? '2px solid var(--win98-darker)' : '2px solid var(--win98-light)',
                borderBottom: active ? '2px solid var(--win98-light)'  : '2px solid var(--win98-darker)',
                borderRight:  active ? '2px solid var(--win98-light)'  : '2px solid var(--win98-darker)',
              }}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Photo/video grid */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }} className="hide-scrollbar">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          padding: '2px',
        }}>
          {GRID_ITEMS.map(item => (
            <div key={item.id} style={{ position: 'relative', cursor: 'default' }}>
              <PhotoPlaceholder shade={item.shade} src={item.src} fullWidth />
              {/* Video badge */}
              {item.isVideo && (
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  fontSize: '10px',
                  color: 'var(--win98-light)',
                  textShadow: '1px 1px 0 var(--win98-darker)',
                }}>▶</div>
              )}
              {/* View count */}
              <div style={{
                position: 'absolute',
                bottom: '3px',
                left: '3px',
                fontSize: '8px',
                color: 'var(--win98-light)',
                fontWeight: 700,
                textShadow: '1px 1px 0 var(--win98-darker)',
              }}>
                {item.isVideo && `▶ ${item.views}`}
              </div>
              {/* Sponsored badge */}
              {item.isSponsored && (
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: '3px',
                  fontSize: '7px',
                  background: 'var(--win98-silver)',
                  border: '1px solid var(--win98-darker)',
                  padding: '0 2px',
                  color: 'var(--win98-text)',
                }}>AD</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
