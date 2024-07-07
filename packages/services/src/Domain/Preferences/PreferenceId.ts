const PREFERENCE_PANE_IDS = [
  'general',
  'account',
  'security',
  'home-server',
  'vaults',
  'appearance',
  'backups',
  'plugins',
  'shortcuts',
  'accessibility',
  'whats-new',
] as const

export type PreferencePaneId = (typeof PREFERENCE_PANE_IDS)[number]
