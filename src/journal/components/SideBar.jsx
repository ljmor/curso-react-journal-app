import React from 'react';
import { TurnedInNot } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth }) => {
    const { displayName, photoUrl } = useSelector(state => state.auth);
    const { notes, isSaving } = useSelector(state => state.journal);

    const sidebarContent = isSaving 
        ? (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50%'
            }}>
                <CircularProgress />
            </Box>
        ) 
        : (
            <>
                <Toolbar>
                    <Avatar
                        src={
                            (photoUrl === null || photoUrl === undefined)
                                ? '/broken-image.jpg'
                                : photoUrl
                        }
                        sx={
                            (photoUrl === null || photoUrl === undefined)
                                ? { marginRight: 2, bgcolor: deepOrange[500] }
                                : { marginRight: 2 }
                        }
                        alt={displayName}
                    />
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note => (
                            <SideBarItem key={note.id} note={note} />
                        ))
                    }
                </List>
            </>
        );

    return (
        <Box
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            {sidebarContent}
        </Box>
    );
};