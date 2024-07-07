import { PreferencesMenuItem } from './PreferencesMenuItem'

export const PREFERENCES_MENU_ITEMS: PreferencesMenuItem[] = [
  { id: 'whats-new', label: "What's New", icon: 'asterisk', order: 0 },
  { id: 'account', label: 'Account', icon: 'user', order: 1 },
  { id: 'general', label: 'General', icon: 'settings', order: 3 },
  { id: 'security', label: 'Security', icon: 'security', order: 4 },
  { id: 'backups', label: 'Backups', icon: 'restore', order: 5 },
  { id: 'appearance', label: 'Appearance', icon: 'themes', order: 6 },
  { id: 'shortcuts', label: 'Shortcuts', icon: 'keyboard', order: 8 },
  { id: 'plugins', label: 'Plugins', icon: 'dashboard', order: 8 },
  { id: 'accessibility', label: 'Accessibility', icon: 'accessibility', order: 9 },
]

export const READY_PREFERENCES_MENU_ITEMS: PreferencesMenuItem[] = [
  { id: 'whats-new', label: "What's New", icon: 'asterisk', order: 0 },
  { id: 'account', label: 'Workspaces', icon: 'user', order: 1 },
  { id: 'general', label: 'General', icon: 'settings', order: 3 },
  { id: 'security', label: 'Security', icon: 'security', order: 4 },
  { id: 'backups', label: 'Backups', icon: 'restore', order: 5 },
  { id: 'appearance', label: 'Appearance', icon: 'themes', order: 6 },
  { id: 'plugins', label: 'Plugins', icon: 'dashboard', order: 8 },
]
