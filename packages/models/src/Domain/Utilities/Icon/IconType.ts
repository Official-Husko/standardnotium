export type VectorIconNameOrEmoji = EmojiString | IconType

export type EmojiString = Omit<string, IconType>

export type IconType =
  | 'accessibility'
  | 'account-card-details-outline'
  | 'account-circle'
  | 'add-bold'
  | 'add-text'
  | 'add'
  | 'archive'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrows-horizontal'
  | 'arrows-vertical'
  | 'arrows-sort-down'
  | 'arrows-sort-up'
  | 'asterisk'
  | 'attachment-file'
  | 'authenticator-variant'
  | 'authenticator'
  | 'back-ios'
  | 'bold'
  | 'box-filled'
  | 'box'
  | 'camera'
  | 'check-all'
  | 'check-bold'
  | 'check-circle-filled'
  | 'check-circle'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'clear-circle-filled'
  | 'clock'
  | 'close'
  | 'cloud-off'
  | 'code-2'
  | 'code-tags'
  | 'code'
  | 'color-fill'
  | 'copy'
  | 'dashboard'
  | 'diamond-filled'
  | 'diamond'
  | 'download'
  | 'drag'
  | 'draw'
  | 'editor-filled'
  | 'editor'
  | 'email-filled'
  | 'email'
  | 'enter'
  | 'eye-filled'
  | 'eye-off-filled'
  | 'eye-off'
  | 'eye'
  | 'file-filled'
  | 'file'
  | 'file-other'
  | 'file-pdf'
  | 'file-doc'
  | 'file-ppt'
  | 'file-xls'
  | 'file-image'
  | 'file-mov'
  | 'file-music'
  | 'file-zip'
  | 'files-illustration'
  | 'folder-filled'
  | 'folder-key-filled'
  | 'folder'
  | 'format-align-center'
  | 'format-align-justify'
  | 'format-align-left'
  | 'format-align-right'
  | 'forward-ios'
  | 'fullscreen-exit'
  | 'fullscreen'
  | 'gift-outline'
  | 'hashtag-filled'
  | 'hashtag-off'
  | 'hashtag'
  | 'heart-filled'
  | 'help-filled'
  | 'help'
  | 'history'
  | 'image'
  | 'info'
  | 'italic'
  | 'keyboard-close'
  | 'keyboard-command'
  | 'keyboard-filled'
  | 'keyboard-option'
  | 'keyboard-shift'
  | 'keyboard-show'
  | 'keyboard'
  | 'lifebuoy'
  | 'line-width'
  | 'link-off'
  | 'link'
  | 'list-bulleted'
  | 'listed-filled'
  | 'listed'
  | 'lock-filled'
  | 'lock'
  | 'markdown'
  | 'menu-arrow-down-alt'
  | 'menu-arrow-down'
  | 'menu-arrow-right'
  | 'menu-close'
  | 'menu-open'
  | 'menu-variant'
  | 'merge'
  | 'more-vert'
  | 'more'
  | 'notes-filled'
  | 'notes-remove'
  | 'notes'
  | 'open-in'
  | 'password'
  | 'pencil-filled'
  | 'pencil-off'
  | 'pencil'
  | 'pin-filled'
  | 'pin-off'
  | 'pin'
  | 'plain-text'
  | 'plus-circle-filled'
  | 'plus-circle'
  | 'premium-feature'
  | 'print'
  | 'redo'
  | 'restore'
  | 'rich-text'
  | 'safe-square-filled'
  | 'safe-square'
  | 'safe'
  | 'save'
  | 'search-ios'
  | 'search'
  | 'security'
  | 'select-all'
  | 'send'
  | 'server'
  | 'settings-filled'
  | 'settings'
  | 'share'
  | 'signIn'
  | 'signOut'
  | 'sort-descending'
  | 'spellcheck'
  | 'spreadsheets'
  | 'standard-notes-2'
  | 'standard-notes'
  | 'star-circle-filled'
  | 'star-filled'
  | 'star-variant-filled'
  | 'star'
  | 'strikethrough'
  | 'sync'
  | 'tasks'
  | 'text-circle'
  | 'text-paragraph-long'
  | 'text'
  | 'textbox-password'
  | 'themes-filled'
  | 'themes'
  | 'timer'
  | 'trash-filled'
  | 'trash-sweep-filled'
  | 'trash-sweep'
  | 'trash'
  | 'tune'
  | 'unarchive'
  | 'underline'
  | 'undo'
  | 'unpin'
  | 'upload'
  | 'user-add'
  | 'user-filled'
  | 'user-switch'
  | 'user'
  | 'view'
  | 'warning'
  | 'window'
  | 'details-block'
