export type Comment = {
  id: number
  user: string
  text: string
  liked: boolean
}

export type Photo = {
  id: number
  user: string
  avatarUrl: string
  shade: string
  imageUrl: string
  caption: string
  likes: number
  comments: Comment[]
}

export const photos: Photo[] = [
  {
    id: 1,
    user: 'JA-JAYZ',
    avatarUrl: 'https://cdn.pixilart.com/images/user/profile/large/337c43f72117e00.png',
    shade: '#D4C5A9',
    imageUrl: 'https://art.pixilart.com/sr5z880950fa32aws3.gif',
    caption: 'Castle in the sky ✈️ #studioghibli #ghibli #flying #castle',
    likes: 11212,
    comments: [
      { id: 1, user: 'tiredsugar', text: 'this is exactly what i pictured!!', liked: false },
      { id: 2, user: 'bob', text: 'Where was this taken?', liked: false },
      { id: 3, user: 'carol', text: 'I need to go here 😍', liked: false },
    ],
  },
  {
    id: 2,
    user: 'tsurune',
    avatarUrl: 'https://cdn.pixilart.com/images/user/profile/large/0b0e5e7dc80756f.png',
    shade: '#C8A882',
    imageUrl: 'https://art.pixilart.com/sr5z5ee3d7de79aws3.png',
    caption: 'Late night ramen 🍜 #ramen #food #pixelart',
    likes: 2370,
    comments: [
      { id: 1, user: 'dave', text: 'Looks delicious!', liked: false },
      { id: 2, user: 'emma', text: 'Recipe please!!', liked: false },
    ],
  },
  {
    id: 3,
    user: 'baeguri',
    avatarUrl: 'https://cdn.pixilart.com/images/user/profile/large/a430279280ae58a.png',
    shade: '#A8B8C8',
    imageUrl: 'https://art.pixilart.com/sr2e9aeb0107cdb.png',
    caption: 'The city never sleeps 🌃 #nightcity #blackout #dark #urban',
    likes: 8065,
    comments: [
      { id: 1, user: 'alice', text: 'Love this perspective', liked: false },
      { id: 2, user: 'frank', text: 'baeguri draws an actual background with PERSPECTIVE??', liked: false },
      { id: 3, user: 'baeguri', text: 'haha im actually pretty proud of it!', liked: false },
    ],
  },
  {
    id: 4,
    user: 'bluemossi',
    avatarUrl: 'https://cdn.pixilart.com/images/user/profile/large/f6d9f4af7101548.png',
    shade: '#8BAF8B',
    imageUrl: 'https://art.pixilart.com/sr2b3e06f9aas003.png',
    caption: 'I wish a place like this was real 🌲✨ #forest #nature #fantasy',
    likes: 76124,
    comments: [
      { id: 1, user: 'grace', text: 'So peaceful and beautiful 😍', liked: false },
      { id: 2, user: 'henry', text: 'Picture of the Day material fr', liked: false },
    ],
  },
]

export const profilePhotos = [
  { id: 1,  src: 'https://picsum.photos/seed/p1/400/400'  },
  { id: 2,  src: 'https://picsum.photos/seed/p2/400/400'  },
  { id: 3,  src: 'https://picsum.photos/seed/p3/400/400'  },
  { id: 4,  src: 'https://picsum.photos/seed/p4/400/400'  },
  { id: 5,  src: 'https://picsum.photos/seed/p5/400/400'  },
  { id: 6,  src: 'https://picsum.photos/seed/p6/400/400'  },
  { id: 7,  src: 'https://picsum.photos/seed/p7/400/400'  },
  { id: 8,  src: 'https://picsum.photos/seed/p8/400/400'  },
  { id: 9,  src: 'https://picsum.photos/seed/p9/400/400'  },
  { id: 10, src: 'https://picsum.photos/seed/p10/400/400' },
  { id: 11, src: 'https://picsum.photos/seed/p11/400/400' },
  { id: 12, src: 'https://picsum.photos/seed/p12/400/400' },
]

export const currentUser = {
  username: 'lensbyrae',
  handle: '@lensbyrae',
  displayName: 'Rae Visuals',
  email: 'hello@lensbyrae.com',
  website: 'lensbyrae.com',
  posts: 142,
  followers: 8204,
  following: 312,
}
