import { ElementIds } from '@/Constants/ElementIDs'
import { useAndroidBackHandler } from '@/NativeMobileWeb/useAndroidBackHandler'
import {
  useEffect,
  ReactNode,
  useMemo,
  createContext,
  useCallback,
  useContext,
  useState,
  memo,
  useRef,
  useLayoutEffect,
  MutableRefObject,
} from 'react'
import { AppPaneId } from './AppPaneMetadata'
import { PaneController } from '../../Controllers/PaneController'
import { observer } from 'mobx-react-lite'

type ResponsivePaneData = {
  selectedPane: AppPaneId
  toggleAppPane: (paneId: AppPaneId) => void
  isNotesListVisibleOnTablets: boolean
  toggleNotesListOnTablets: () => void
}

const ResponsivePaneContext = createContext<ResponsivePaneData | undefined>(undefined)

export const useResponsiveAppPane = () => {
  const value = useContext(ResponsivePaneContext)

  if (!value) {
    throw new Error('Component must be a child of <ResponsivePaneProvider />')
  }

  return value
}

type ChildrenProps = {
  children: ReactNode
}

type ProviderProps = {
  paneController: PaneController
} & ChildrenProps

function useStateRef<State>(state: State): MutableRefObject<State> {
  const ref = useRef<State>(state)

  useLayoutEffect(() => {
    ref.current = state
  }, [state])

  return ref
}

const MemoizedChildren = memo(({ children }: ChildrenProps) => <>{children}</>)

const ResponsivePaneProvider = ({ paneController, children }: ProviderProps) => {
  const currentSelectedPane = paneController.currentPane
  const previousSelectedPane = paneController.previousPane
  const currentSelectedPaneRef = useStateRef<AppPaneId>(currentSelectedPane)

  const toggleAppPane = useCallback(
    (paneId: AppPaneId) => {
      paneController.setPreviousPane(currentSelectedPane)
      paneController.setCurrentPane(paneId)
    },
    [paneController, currentSelectedPane],
  )

  useEffect(() => {
    if (previousSelectedPane) {
      const previousPaneElement = document.getElementById(ElementIds[previousSelectedPane])
      previousPaneElement?.classList.remove('selected')
    }

    const currentPaneElement = document.getElementById(ElementIds[currentSelectedPane])
    currentPaneElement?.classList.add('selected')
  }, [currentSelectedPane, previousSelectedPane])

  const addAndroidBackHandler = useAndroidBackHandler()

  useEffect(() => {
    const removeListener = addAndroidBackHandler(() => {
      if (
        currentSelectedPaneRef.current === AppPaneId.Editor ||
        currentSelectedPaneRef.current === AppPaneId.Navigation
      ) {
        toggleAppPane(AppPaneId.Items)
        return true
      } else {
        return false
      }
    })
    return () => {
      if (removeListener) {
        removeListener()
      }
    }
  }, [addAndroidBackHandler, currentSelectedPaneRef, toggleAppPane])

  const [isNotesListVisibleOnTablets, setNotesListVisibleOnTablets] = useState(true)

  const toggleNotesListOnTablets = useCallback(() => {
    setNotesListVisibleOnTablets((visible) => !visible)
  }, [])

  const contextValue = useMemo(
    () => ({
      selectedPane: currentSelectedPane,
      toggleAppPane,
      isNotesListVisibleOnTablets,
      toggleNotesListOnTablets,
    }),
    [currentSelectedPane, isNotesListVisibleOnTablets, toggleAppPane, toggleNotesListOnTablets],
  )

  return (
    <ResponsivePaneContext.Provider value={contextValue}>
      <MemoizedChildren children={children} />
    </ResponsivePaneContext.Provider>
  )
}

export default observer(ResponsivePaneProvider)
