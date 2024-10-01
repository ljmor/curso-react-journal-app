import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import {  useSelector } from "react-redux"

export const JournalPage = () => {

  const { activeNote } = useSelector(state => state.journal);

  return (
    <JournalLayout>
      {
        // Controlar las vistas si hay o no una nota activa
        (activeNote === null)
          ? <NothingSelectedView />
          : <NoteView />
      }
    </JournalLayout>
  )
}