"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
    Toolbar,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from '../../asset/home/global/smart-diagrams.png';
import Page from '../../app/login/page'


function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const router = useRouter();
    const token = Cookies.get("token");

    const toggleMobileMenu = (open) => () => {
        setMobileMenuOpen(open);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Box>
                <Toolbar sx={{ justifyContent: 'space-around' }}>
                    <Box sx={{ maxWidth: '100%', height: '28px' }}>
                        <img src={logo.src} alt="logo" style={{ width: '100%', height: '100%' }} />
                    </Box>

                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 3 }}>
                        {['Use cases', 'Resources', 'About', 'SmartDOT', 'Diagram-as-Code'].map((text, index) => (
                            <Box key={index}>
                                {['Use cases', 'Resources', 'About'].includes(text) ? (
                                    <Box
                                        sx={{
                                            cursor: 'pointer',
                                            color: '#171717',
                                            fontWeight: '500',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {text}
                                        <KeyboardArrowDownIcon />
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            cursor: 'pointer',
                                            color: '#171717',
                                            fontWeight: '500',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                        }}
                                    >
                                        {text}
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>

                    <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu(false)}>
                        <Box sx={{ p: 2, width: '300px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                                <img src={logo.src} alt="logo" style={{ maxWidth: "100%", height: 'auto' }} />
                                <IconButton onClick={toggleMobileMenu(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            <List>
                                {['Use cases', 'Resources', 'About', 'SmartDOT', 'Diagram-as-Code'].map((text, index) => (
                                    <ListItem button key={index}>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            </List>

                            <Box sx={{ padding: "0 10px", display: "inline-block", flexDirection: 'column' }}>
                                {token ? (
                                    <Button variant="text" sx={{ color: '#333' }} onClick={() => {
                                        router.push('/login');
                                        Cookies.remove("token");
                                    }}>
                                        Log Out
                                    </Button>
                                ) : (
                                    <Button variant="text" sx={{ color: '#333' }} onClick={handleDialogOpen}>
                                        Log In
                                    </Button>
                                )}
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#ff4081',
                                            color: '#fff',
                                            display: 'inline-block',
                                            '&:hover': { backgroundColor: '#f73378' },
                                        }}
                                    >
                                        Try Eraser
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Drawer>

                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
                        {token ? (
                            <Button variant="text" sx={{ color: '#333' }} onClick={() => {
                                router.push('/login');
                                Cookies.remove("token");
                            }}>
                                Log Out
                            </Button>
                        ) : (
                            <Button variant="text" sx={{ color: '#333' }} onClick={() => router.push('/login')}>
                                Log In
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#ff4081',
                                color: '#fff',
                                '&:hover': { backgroundColor: '#f73378' },
                            }}
                        >
                            Try Eraser
                        </Button>
                    </Box>

                    <IconButton
                        sx={{ display: { xs: 'flex', lg: 'none' } }}
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleMobileMenu(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </Box>

            {/* Log In Dialog */}
            {/*<Dialog open={dialogOpen} onClose={handleDialogClose}>*/}
            {/*    <DialogContent sx={{padding:0}}>*/}
            {/*        <Page/>*/}
            {/*    </DialogContent>*/}
            {/*</Dialog>*/}
        </>
    );
}

export default Header;
