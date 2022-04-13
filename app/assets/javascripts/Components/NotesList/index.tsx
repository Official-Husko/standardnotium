import { WebApplication } from '@/UIModels/Application'
import { KeyboardKey } from '@/Services/IOService'
import { AppState } from '@/UIModels/AppState'
import { DisplayOptions } from '@/UIModels/AppState/NotesViewState'
import { SNNote, SNTag } from '@standardnotes/snjs'
import { observer } from 'mobx-react-lite'
import { FunctionComponent } from 'preact'
import { NotesListItem } from './NotesListItem'
import { FOCUSABLE_BUT_NOT_TABBABLE, NOTES_LIST_SCROLL_THRESHOLD } from '@/Constants'

type Props = {
  application: WebApplication
  appState: AppState
  notes: SNNote[]
  selectedNotes: Record<string, SNNote>
  displayOptions: DisplayOptions
  paginate: () => void
}

export const NotesList: FunctionComponent<Props> = observer(
  ({ application, appState, notes, selectedNotes, displayOptions, paginate }) => {
    const { selectPreviousNote, selectNextNote } = appState.notesView
    const { hideTags, hideDate, hideNotePreview, hideEditorIcon, sortBy } = displayOptions

    const tagsForNote = (note: SNNote): string[] => {
      if (hideTags) {
        return []
      }
      const selectedTag = appState.selectedTag
      if (!selectedTag) {
        return []
      }
      const tags = appState.getNoteTags(note)
      if (selectedTag instanceof SNTag && tags.length === 1) {
        return []
      }
      return tags.map((tag) => tag.title).sort()
    }

    const openNoteContextMenu = (posX: number, posY: number) => {
      appState.notes.setContextMenuClickLocation({
        x: posX,
        y: posY,
      })
      appState.notes.reloadContextMenuLayout()
      appState.notes.setContextMenuOpen(true)
    }

    const onContextMenu = (note: SNNote, posX: number, posY: number) => {
      appState.notes.selectNote(note.uuid, true).catch(console.error)
      openNoteContextMenu(posX, posY)
    }

    const onScroll = (e: Event) => {
      const offset = NOTES_LIST_SCROLL_THRESHOLD
      const element = e.target as HTMLElement
      if (element.scrollTop + element.offsetHeight >= element.scrollHeight - offset) {
        paginate()
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KeyboardKey.Up) {
        e.preventDefault()
        selectPreviousNote()
      } else if (e.key === KeyboardKey.Down) {
        e.preventDefault()
        selectNextNote()
      }
    }

    return (
      <div
        className="infinite-scroll focus:shadow-none focus:outline-none"
        id="notes-scrollable"
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        tabIndex={FOCUSABLE_BUT_NOT_TABBABLE}
      >
        {notes.map((note) => (
          <NotesListItem
            application={application}
            key={note.uuid}
            note={note}
            tags={tagsForNote(note)}
            selected={!!selectedNotes[note.uuid]}
            hideDate={hideDate}
            hidePreview={hideNotePreview}
            hideTags={hideTags}
            hideEditorIcon={hideEditorIcon}
            sortedBy={sortBy}
            onClick={() => {
              appState.notes.selectNote(note.uuid, true).catch(console.error)
            }}
            onContextMenu={(e: MouseEvent) => {
              e.preventDefault()
              onContextMenu(note, e.clientX, e.clientY)
            }}
          />
        ))}
      </div>
    )
  },
)
