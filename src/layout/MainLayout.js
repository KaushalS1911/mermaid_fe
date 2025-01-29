'use client';

import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Sidebar from "@/layout/Sidebar";

const drawerWidth = 275;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    flexGrow: 1,
    marginTop: 20,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

export default function MainLayout({ children, setSidebarKey, sidebarKey }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Sidebar
                    setSidebarKey={setSidebarKey}
                    sidebarKey={sidebarKey}
                    open={true}
                    handleDrawerToggle={handleDrawerToggle}
                    mobileOpen={mobileOpen}
                    setOpen={setOpen}
                />
            </Box>

            <Main open={true}>
                <Box>
                    {children}
                </Box>
            </Main>
        </Box>
    );
}
