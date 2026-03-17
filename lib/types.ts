export type AppId =
  | 'spotify'
  | 'instagram'

export type WindowState = {
  id: string
  appId: AppId
  position: { x: number; y: number }
  isMinimized: boolean
  zIndex: number
}

export type DesktopState = {
  openWindows: WindowState[]
}
