'use client'
import { PixelAvatar } from '@/components/win98/PixelAvatar'

import { useState } from 'react'
import { PhotoPlaceholder } from './PhotoPlaceholder'
import { profilePhotos } from '@/lib/mockData/instagram'

type ProfileUser = {
  username: string
  displayName: string
  email: string
  website: string
  posts: number
  followers: number
  following: number
}

type ViewMode = 'grid' | 'list' | 'tagged' | 'person'

const VIEW_MODES: { id: ViewMode; icon: string; title: string }[] = [
  { id: 'grid',   icon: '⊞',  title: 'Grid'    },
  { id: 'list',   icon: '≡',  title: 'List'    },
  { id: 'tagged', icon: '▶',  title: 'Reels'    },
  { id: 'person', icon: '@',  title: 'Mentions' },
]

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k'
  return String(n)
}

type ProfileViewProps = {
  user: ProfileUser
}

export function ProfileView({ user }: ProfileViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Username centered */}
      <div style={{
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '12px',
        padding: '6px 8px',
      }}>
        {user.username}
      </div>

      {/* Avatar + stats row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 8px', gap: '12px' }}>
        {/* Avatar — circle allowed as profile picture identity element */}
        <PixelAvatar size={64} background="var(--win98-text)" />

        {/* Stats */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            {[
              { value: String(user.posts),              label: 'posts'     },
              { value: formatNumber(user.followers),    label: 'followers' },
              { value: String(user.following),          label: 'following' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontWeight: 700, fontSize: '12px' }}>{stat.value}</div>
                <div style={{ color: 'var(--win98-text)', fontSize: '10px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Follow button row */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="win98-raised"
              style={{
                flex: 1,
                height: '22px',
                background: 'var(--win98-silver)',
                fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                fontSize: '11px',
                cursor: 'default',
              }}
            >
              Edit profile
            </button>
            <button
              className="win98-raised"
              style={{
                flex: 1,
                height: '22px',
                background: 'var(--win98-silver)',
                fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                fontSize: '11px',
                cursor: 'default',
              }}
            >
              Share profile
            </button>
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div style={{
        padding: '0 8px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}>
        <div style={{ fontWeight: 700 }}>{user.displayName}</div>
        <div style={{ color: 'var(--win98-darker)' }}>{user.email}</div>
        <div style={{ color: 'var(--win98-highlight)', textDecoration: 'underline', cursor: 'default' }}>
          {user.website}
        </div>
      </div>


      <div className="win98-divider" style={{ margin: '0 2px' }} />

      {/* View mode tabs */}
      <div style={{
        display: 'flex',
        background: 'var(--win98-silver)',
        flexShrink: 0,
        padding: '4px 2px',
        gap: '2px',
      }}>
        {VIEW_MODES.map(({ id, icon, title }) => {
          const active = viewMode === id
          return (
            <button
              key={id}
              onClick={() => setViewMode(id)}
              title={title}
              className={active ? 'win98-sunken' : 'win98-raised'}
              style={{
                flex: 1,
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: active ? 'var(--win98-light)' : 'var(--win98-silver)',
                fontFamily: 'inherit',
                fontSize: '13px',
                cursor: 'default',
              }}
            >
              {icon}
            </button>
          )
        })}
      </div>

      {/* Photo grid — scrollable */}
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          padding: '2px',
        }}>
          {profilePhotos.map(photo => (
            <div key={photo.id}>
              <PhotoPlaceholder shade="var(--win98-silver)" src={photo.src} fullWidth smooth />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
