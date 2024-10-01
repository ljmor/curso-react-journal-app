import { TurnedInNot } from "@mui/icons-material"
import { Grid2, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ note }) => {

    const dispatch = useDispatch();

    const onSetActiveNote = () => {
        dispatch(setActiveNote(note));

    };

    return (
        <ListItem disablePadding>

            <ListItemButton onClick={onSetActiveNote}>

                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>

                <Grid2 container display='flex' flexDirection='column'>
                    <ListItemText
                        primary={
                            (note.title.length > 17) 
                            ? note.title.substring(0, 17) + '...'
                            : note.title
                        }
                    />
                    <ListItemText secondary={note.body} />
                </Grid2>

            </ListItemButton>

        </ListItem>
    )
}
