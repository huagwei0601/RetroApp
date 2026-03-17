'use client'

import { useState } from 'react'
import { photos, currentUser } from '@/lib/mockData/instagram'
import { HomeView } from './HomeView'
import { ProfileView } from './ProfileView'
import { MessageView } from './MessageView'
import { SearchView } from './SearchView'

type View = 'home' | 'message' | 'search' | 'profile'

type NavItem = { view: View; label: string }

const NAV_ITEMS: NavItem[] = [
  { view: 'home',    label: 'Home'     },
  { view: 'search',  label: 'Search'   },
  { view: 'message', label: 'Messages' },
  { view: 'profile', label: 'Profile'  },
]

function NavIcon({ view, active }: { view: View; active: boolean }) {
  const f = active ? 'var(--win98-text)' : 'none'
  const s = 'var(--win98-text)'
  const sw = 1.5
  if (view === 'home') return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <polygon points="9,2 1,9 3,9 3,16 7,16 7,11 11,11 11,16 15,16 15,9 17,9" fill={f} stroke={s} strokeWidth={sw} strokeLinejoin="round" />
    </svg>
  )
  if (view === 'search') return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="7.5" cy="7.5" r="5" fill={f} stroke={s} strokeWidth={sw} />
      <line x1="11.5" y1="11.5" x2="16" y2="16" stroke={s} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  )
  if (view === 'message') return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="3" width="16" height="11" rx="0" fill={f} stroke={s} strokeWidth={sw} />
      <polyline points="1,3 9,10 17,3" fill="none" stroke={active ? 'var(--win98-light)' : s} strokeWidth={sw} />
    </svg>
  )
  // profile
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="6" r="4" fill={f} stroke={s} strokeWidth={sw} />
      <path d="M1 17 Q1 12 9 12 Q17 12 17 17" fill={f} stroke={s} strokeWidth={sw} strokeLinejoin="round" />
    </svg>
  )
}

const MENU_ITEMS: Record<string, (string | null)[]> = {
  File:    ['New Window', 'Open...', null, 'Save As...', null, 'Close'],
  Edit:    ['Cut', 'Copy', 'Paste', null, 'Select All'],
  View:    ['Feed', 'Search', 'Messages', 'Profile', null, 'Refresh'],
  Options: ['Settings...', null, 'About Instagram 98'],
  Help:    ['Help Topics', null, 'About'],
}

export function InstagramApp() {
  const [view, setView] = useState<View>('home')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        fontSize: '11px',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        color: 'var(--win98-text)',
      }}
      onClick={() => setOpenMenu(null)}
    >
      {/* Menu bar */}
      <div style={{
        display: 'flex',
        background: 'var(--win98-silver)',
        flexShrink: 0,
        position: 'relative',
        zIndex: 100,
      }}>
        {Object.keys(MENU_ITEMS).map(item => (
          <div key={item} style={{ position: 'relative' }}>
            <div
              onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === item ? null : item) }}
              style={{
                padding: '2px 8px',
                cursor: 'default',
                background: openMenu === item ? 'var(--win98-highlight)' : 'transparent',
                color: openMenu === item ? 'var(--win98-highlight-text)' : 'var(--win98-text)',
                userSelect: 'none',
              }}
            >
              <u style={{ textDecorationStyle: 'solid' }}>{item[0]}</u>{item.slice(1)}
            </div>

            {/* Dropdown */}
            {openMenu === item && (
              <div
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  minWidth: '160px',
                  background: 'var(--win98-silver)',
                  borderTop:    '2px solid var(--win98-light)',
                  borderLeft:   '2px solid var(--win98-light)',
                  borderBottom: '2px solid var(--win98-darker)',
                  borderRight:  '2px solid var(--win98-darker)',
                  outline:      '1px solid var(--win98-dark)',
                  zIndex: 200,
                  paddingTop: '2px',
                  paddingBottom: '2px',
                }}
              >
                {MENU_ITEMS[item].map((entry, i) =>
                  entry === null ? (
                    <div key={i} style={{
                      margin: '3px 4px',
                      borderTop: '1px solid var(--win98-dark)',
                      borderBottom: '1px solid var(--win98-light)',
                    }} />
                  ) : (
                    <div
                      key={entry}
                      onClick={() => setOpenMenu(null)}
                      style={{
                        padding: '3px 20px',
                        cursor: 'default',
                        fontSize: '11px',
                        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                        color: 'var(--win98-text)',
                        userSelect: 'none',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--win98-highlight)', e.currentTarget.style.color = 'var(--win98-highlight-text)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = 'var(--win98-text)')}
                    >
                      {entry}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scrollable content area */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }} className="hide-scrollbar">
        {view === 'home' && (
          <HomeView
            photos={photos}
            onGoToProfile={() => setView('profile')}
          />
        )}
        {view === 'message' && (
          <MessageView />
        )}
        {view === 'search' && (
          <SearchView />
        )}
        {view === 'profile' && (
          <ProfileView user={currentUser} />
        )}
      </div>


      {/* Win98 bottom navigation toolbar */}
      <div style={{
        display: 'flex',
        background: 'var(--win98-silver)',
        borderTop: '2px solid var(--win98-light)',
        flexShrink: 0,
      }}>
        {NAV_ITEMS.map(({ view: v, label }) => {
          const active = view === v
          return (
            <button
              key={label}
              onClick={() => setView(v)}
              title={label}
              className={active ? 'win98-sunken' : 'win98-raised'}
              style={{
                flex: 1,
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default',
                background: active ? 'var(--win98-light)' : 'var(--win98-silver)',
                margin: '4px 2px',
              }}
            >
              <NavIcon view={v} active={active} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
