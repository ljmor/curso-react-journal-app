import { Box, IconButton, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { AddOutlined } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { startNewNote } from "../../store/journal/thunks";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {

    const dispatch = useDispatch();
    const { isSaving, activeNote } = useSelector(state => state.journal);

    const onAddNewNote = () => {
        dispatch(startNewNote());
    };

    return (
        <Box sx={{ display: 'flex' }}>

            {/* NavBar */}
            <NavBar drawerWidth={drawerWidth} />

            <Box className='animate__animated animate__slideInDown' component='main' sx={{ flexGrow: 1, p: 5 }} >

                {/* ToolBar */}
                <Toolbar />
                {children}
            </Box>

            {/* Botón para agregar una nueva nota */}
            <IconButton
                onClick={onAddNewNote}
                disabled={isSaving}
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: { xs: 16, sm: 30, md: 50 },
                    bottom: { xs: 16, sm: 30, md: 50 },
                    '&.Mui-disabled': { backgroundColor: grey[400], opacity: 0.7 },
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    boxShadow: 3,
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>

        </Box>
    );
}
