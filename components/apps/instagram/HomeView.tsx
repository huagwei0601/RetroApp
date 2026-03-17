'use client'

import { useState } from 'react'
import { Button } from '@/components/win98/Button'
import { PixelAvatar } from '@/components/win98/PixelAvatar'
import { PhotoPlaceholder } from './PhotoPlaceholder'
import type { Photo } from '@/lib/mockData/instagram'

const STORY_USERS = [
  { user: 'your story',  isYours: true },
  { user: 'j.wanderer',  avatar: 'https://i.pravatar.cc/80?img=11' },
  { user: 'mia.eats',    avatar: 'https://i.pravatar.cc/80?img=5'  },
  { user: 'k.lens',      avatar: 'https://i.pravatar.cc/80?img=33' },
  { user: 'oakandmoss',  avatar: 'https://i.pravatar.cc/80?img=47' },
  { user: 'goldenhr_s',  avatar: 'https://i.pravatar.cc/80?img=23' },
  { user: 'trail.rx',    avatar: 'https://i.pravatar.cc/80?img=57' },
]

// Filled annulus — every pixel whose center falls between innerR and outerR from center
function buildPixelRing(cx: number, cy: number, innerR: number, outerR: number) {
  const set = new Set<string>()
  for (let y = Math.floor(cy - outerR); y <= Math.ceil(cy + outerR); y++) {
    for (let x = Math.floor(cx - outerR); x <= Math.ceil(cx + outerR); x++) {
      const dx = x + 0.5 - cx
      const dy = y + 0.5 - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist >= innerR && dist <= outerR) {
        set.add(`${Math.floor(x)},${Math.floor(y)}`)
      }
    }
  }
  return Array.from(set).map(s => { const [a, b] = s.split(',').map(Number); return { x: a, y: b } })
}
const RING_PIXELS = buildPixelRing(32, 32, 26, 30)

type HomeViewProps = {
  photos: Photo[]
  onGoToProfile: () => void
}

function StoryCircle({ user, isYours, avatar, index }: { user: string; isYours?: boolean; avatar?: string; index: number }) {
  const gradId = `sg${index}`
  const ring = (
    <svg width="64" height="64" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="64" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      {RING_PIXELS.map(({ x, y }) => (
        <rect key={`${x},${y}`} x={x} y={y} width={1} height={1} fill={`url(#${gradId})`} />
      ))}
    </svg>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
      <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
        {isYours ? (
          <>
            <div style={{
              position: 'absolute', top: 7, left: 7, width: 50, height: 50,
              borderRadius: '50%', background: 'var(--win98-text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', color: 'var(--win98-silver)',
            }}>+</div>
            {ring}
          </>
        ) : (
          <>
            {avatar && (
              <div style={{ position: 'absolute', top: 7, left: 7, width: 50, height: 50, borderRadius: '50%', overflow: 'hidden' }}>
                <img src={avatar} alt={user} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
            {ring}
          </>
        )}
      </div>
      <span style={{
        fontSize: '9px',
        color: 'var(--win98-text)',
        maxWidth: '44px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}>
        {user}
      </span>
    </div>
  )
}

export function HomeView({ photos, onGoToProfile }: HomeViewProps) {
  const [photoStates, setPhotoStates] = useState(() =>
    photos.map(p => ({ likes: p.likes, liked: false, bookmarked: false, comments: p.comments.map(c => ({ ...c })) }))
  )
  const [commentInput, setCommentInput] = useState('')
  const [activeCommentIdx, setActiveCommentIdx] = useState<number | null>(null)
  const [following, setFollowing] = useState<boolean[]>(() => photos.map(() => false))

  const toggleLike = (idx: number) => setPhotoStates(prev => prev.map((s, i) =>
    i === idx ? { ...s, liked: !s.liked, likes: s.liked ? s.likes - 1 : s.likes + 1 } : s
  ))

  const toggleBookmark = (idx: number) => setPhotoStates(prev => prev.map((s, i) =>
    i === idx ? { ...s, bookmarked: !s.bookmarked } : s
  ))

  const submitComment = (idx: number) => {
    if (!commentInput.trim()) return
    setPhotoStates(prev => prev.map((s, i) =>
      i === idx
        ? { ...s, comments: [...s.comments, { id: Date.now(), user: 'you', text: commentInput.trim(), liked: false }] }
        : s
    ))
    setCommentInput('')
    setActiveCommentIdx(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Instagram logo */}
      <div style={{ textAlign: 'center', padding: '6px 8px 2px', flexShrink: 0 }}>
        <img src="/instagram-logo.png" alt="Instagram" style={{ height: '28px', objectFit: 'contain' }} />
      </div>
      <div className="win98-divider" style={{ margin: '2px 2px 0' }} />

      {/* Stories bar */}
      <div style={{ padding: '2px 8px 2px', overflowX: 'auto', overflowY: 'hidden', flexShrink: 0, scrollbarWidth: 'none' }} className="hide-scrollbar">
        <div style={{ display: 'flex', gap: '10px', width: 'max-content' }}>
          {STORY_USERS.map((s, i) => (
            <StoryCircle key={s.user} index={i} user={s.user} isYours={s.isYours} avatar={'avatar' in s ? s.avatar : undefined} />
          ))}
        </div>
      </div>
      <div className="win98-divider" style={{ margin: '0 2px' }} />

      {/* Post feed */}
      {photos.map((photo, idx) => {
        const state = photoStates[idx]
        return (
          <div key={photo.id}>
            {/* Post header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '5px 6px 2px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PixelAvatar size={26} src={photo.avatarUrl} />
                <span
                  onClick={onGoToProfile}
                  style={{ fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: '11px' }}
                >
                  {photo.user}
                </span>
              </div>
              <button
                onClick={() => setFollowing(prev => prev.map((v, i) => i === idx ? !v : v))}
                className={following[idx] ? 'win98-sunken' : 'win98-raised'}
                style={{
                  padding: '1px 8px', height: '18px', fontSize: '10px',
                  fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                  background: 'var(--win98-silver)', cursor: 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: following[idx] ? 700 : 400,
                }}
              >{following[idx] ? '✓ Following' : 'Follow'}</button>
            </div>

            {/* Photo */}
            <div style={{ margin: '4px 2px' }}>
              <PhotoPlaceholder shade={photo.shade} src={photo.imageUrl} fullWidth />
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '5px 6px', gap: '8px' }}>
              <button
                onClick={() => toggleLike(idx)}
                className="win98-raised"
                style={{
                  padding: '2px 8px', height: '22px', fontSize: '13px',
                  background: 'var(--win98-silver)', cursor: 'default',
                  fontFamily: 'inherit',
                  color: state.liked ? '#cc0000' : 'var(--win98-text)',
                  display: 'flex', alignItems: 'center', gap: '3px',
                }}
              >{state.liked ? '♥' : '♡'}</button>
              <button
                onClick={() => setActiveCommentIdx(activeCommentIdx === idx ? null : idx)}
                className="win98-raised"
                style={{
                  padding: '2px 8px', height: '22px', fontSize: '12px',
                  background: 'var(--win98-silver)', cursor: 'default',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center',
                }}
              >🗨</button>
              <button
                className="win98-raised"
                style={{
                  padding: '2px 8px', height: '22px', fontSize: '11px',
                  background: 'var(--win98-silver)', cursor: 'default',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center',
                }}
              >➤</button>
              <button
                onClick={() => toggleBookmark(idx)}
                className="win98-raised"
                style={{
                  padding: '2px 8px', height: '22px', fontSize: '12px',
                  background: 'var(--win98-silver)', cursor: 'default',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center',
                  marginLeft: 'auto',
                }}
              >
                <svg width="10" height="13" viewBox="0 0 10 13" style={{ display: 'block' }}>
                  <polygon
                    points="0,0 10,0 10,13 5,9 0,13"
                    fill={state.bookmarked ? 'var(--win98-text)' : 'none'}
                    stroke="var(--win98-text)"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>

            {/* Likes */}
            <div style={{ padding: '0 6px 3px', fontWeight: 700, fontSize: '11px' }}>
              {state.likes.toLocaleString()} likes
            </div>

            {/* Caption */}
            <div style={{ padding: '0 6px 4px', fontSize: '11px' }}>
              <span style={{ fontWeight: 700 }}>@{photo.user} </span>
              {photo.caption}
            </div>

            {/* Comments */}
            {state.comments.slice(0, 2).map(comment => (
              <div key={comment.id} style={{ padding: '0 6px', display: 'flex', gap: '4px', fontSize: '10px', marginBottom: '2px' }}>
                <span style={{ fontWeight: 700 }}>@{comment.user}</span>
                <span style={{ flex: 1, color: 'var(--win98-darker)' }}>{comment.text}</span>
              </div>
            ))}
            {state.comments.length > 2 && (
              <div style={{ padding: '0 6px 3px', fontSize: '10px', color: 'var(--win98-dark)' }}>
                View all {state.comments.length} comments
              </div>
            )}

            {/* Inline comment input */}
            {activeCommentIdx === idx && (
              <div style={{ display: 'flex', gap: '4px', padding: '4px 6px' }}>
                <input
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submitComment(idx)}
                  placeholder="Add a comment..."
                  className="win98-sunken"
                  style={{
                    flex: 1, height: '22px', padding: '0 4px', fontSize: '10px',
                    fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
                    background: 'var(--win98-light)', outline: 'none',
                  }}
                />
                <Button onClick={() => submitComment(idx)}>→</Button>
              </div>
            )}
            <div className="win98-divider" style={{ margin: '4px 2px' }} />
          </div>
        )
      })}
    </div>
  )
}
