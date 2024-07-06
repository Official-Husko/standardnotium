import { observer } from 'mobx-react-lite'
import Icon from '@/Components/Icon/Icon'
import { useCallback, useMemo, useState, FunctionComponent } from 'react'
import { AccountMenuPane } from './AccountMenuPane'
import Menu from '@/Components/Menu/Menu'
import MenuItem from '@/Components/Menu/MenuItem'
import WorkspaceSwitcherOption from './WorkspaceSwitcher/WorkspaceSwitcherOption'
import { WebApplicationGroup } from '@/Application/WebApplicationGroup'
import { MenuItemIconSize } from '@/Constants/TailwindClassNames'
import { useApplication } from '../ApplicationProvider'
import MenuSection from '../Menu/MenuSection'
import { TOGGLE_KEYBOARD_SHORTCUTS_MODAL } from '@standardnotes/ui-services'
import { KeyboardShortcutIndicator } from '../KeyboardShortcutIndicator/KeyboardShortcutIndicator'

type Props = {
  mainApplicationGroup: WebApplicationGroup
  setMenuPane: (pane: AccountMenuPane) => void
  closeMenu: () => void
}

const iconClassName = `text-neutral mr-2 ${MenuItemIconSize}`

const GeneralAccountMenu: FunctionComponent<Props> = ({ setMenuPane, closeMenu, mainApplicationGroup }) => {
  const application = useApplication()

  const SWITCHER_INDEX = 0

  const keyboardShortcutsHelpShortcut = useMemo(() => {
    return application.keyboardService.keyboardShortcutForCommand(TOGGLE_KEYBOARD_SHORTCUTS_MODAL)
  }, [application.keyboardService])

  return (
    <>
      <div className="mb-1 mt-1 hidden items-center justify-between px-4 md:flex md:px-3">
        <div className="text-lg font-bold lg:text-base">Workspaces</div>
        <div className="flex cursor-pointer" onClick={closeMenu}>
          <Icon type="close" className="text-neutral" />
        </div>
      </div>
      <div className="mb-1 px-4 md:px-3">
        <div className="mb-3 text-base text-foreground lg:text-sm">
          You are running Standard Notium, a fork of Standard Notes. 
          Please do not report issues with this fork to the official developers.
        </div>
        <div className="flex items-center text-passive-1">
          <Icon type="cloud-off" className={`mr-2 ${MenuItemIconSize}`} />
          <span className="text-lg font-semibold lg:text-sm">"</span>
        </div>
      </div>
      <Menu
        a11yLabel="General account menu"
        closeMenu={closeMenu}
        initialFocus={!application.hasAccount() ? SWITCHER_INDEX : null} // Fixed the missing fallback value
      >
        <MenuSection className="md:border-t md:pt-2">
          <WorkspaceSwitcherOption mainApplicationGroup={mainApplicationGroup} />
        </MenuSection>
        <MenuSection>
          <MenuItem
            onClick={() => {
              application.importModalController.setIsVisible(true)
              application.accountMenuController.closeAccountMenu()
            }}
          >
            <Icon type="archive" className={iconClassName} />
            Import
          </MenuItem>
          <MenuItem
            onClick={() => {
              application.keyboardService.triggerCommand(TOGGLE_KEYBOARD_SHORTCUTS_MODAL)
            }}
          >
            <Icon type="keyboard" className={iconClassName} />
            Keyboard shortcuts
            {keyboardShortcutsHelpShortcut && (
              <KeyboardShortcutIndicator shortcut={keyboardShortcutsHelpShortcut} className="ml-auto" />
            )}
          </MenuItem>
        </MenuSection>
      </Menu>
    </>
  )
}

export default observer(GeneralAccountMenu)
