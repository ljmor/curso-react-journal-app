import React, { useState } from 'react';
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography, Drawer, Box, Grid2 } from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { SideBar } from "./SideBar";

export const NavBar = ({ drawerWidth = 240 }) => {
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = useState(false);

    const onLogout = () => {
        dispatch(startLogout());
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>

            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >

                <Toolbar>

                    <IconButton
                        color='inherit'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuOutlined />
                    </IconButton>

                    <Grid2 container direction='row' justifyContent='space-between' alignItems='center' size={{xs:12}}>
                        <Typography variant='h6' noWrap component='div'>My Journal</Typography>
                        <IconButton color="error" onClick={onLogout}>
                            <LogoutOutlined />
                        </IconButton>
                    </Grid2>

                </Toolbar>

            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                    container={window.document.body}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <SideBar drawerWidth={drawerWidth} />
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <SideBar drawerWidth={drawerWidth} />
                </Drawer>

            </Box>

        </Box>
    );
};