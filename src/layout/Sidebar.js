"use client";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Image from "next/image";
import logo from "../asset/home/diagram/icon1.png";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useTheme } from "@mui/material/styles";

const Sidebar = ({ open, mobileOpen, handleDrawerToggle, setSidebarKey, sidebarKey }) => {
    const drawerWidth = 270;
    const [openSubmenu, setOpenSubmenu] = useState({});
    const theme = useTheme();
    const menuItems = [
        { text: "Templates", icon: <AcUnitIcon />, path: "/category" },
        { text: "Snippets", icon: <AcUnitIcon />, path: "/subcategory" },
        // { text: "Inbox", icon: <AcUnitIcon />, path: "/" },
        // { text: "Starred", icon: <AcUnitIcon /> , path: "/"},
        // { text: "Send email", icon: <AcUnitIcon /> , path: "/"},

        // { text: "Trash", icon: <AcUnitIcon /> , path: "/"},
        // { text: "Spam", icon: <AcUnitIcon /> , path: "/"},
    ];

    const handleSubmenuClick = (text) => {
        setOpenSubmenu((prevOpenSubmenu) => ({
            ...prevOpenSubmenu,
            [text]: !prevOpenSubmenu[text],
        }));
    };

    return (
        <Box>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                <List
                    sx={{
                        color: theme.palette?.textBlack || "#ECF0F1",
                        height: "100%",
                        px: "15px",
                    }}
                >
                    {menuItems.map((item,index) => (
                        <React.Fragment key={index}>
                            <ListItem
                                disablePadding
                                sx={{
                                    py: "2px",
                                    borderRadius: "10px",
                                    transition: ".3s",
                                    "&:hover": {
                                        backgroundColor: theme.palette?.sidebarHover || "#34495E",
                                        color: "white",
                                        "& .icon": { color: "white" },
                                    },
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon
                                        className="icon"
                                        sx={{ color: theme.palette?.textBlack || "#ECF0F1" }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>

            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        backgroundColor: "#f7f7f7",
                    },
                }}
            >
                <List
                    sx={{
                        color: theme.palette?.textBlack || "#ECF0F1",
                        height: "100%",
                        px: "15px",
                    }}
                >
                    {menuItems.map((item,index) => (
                        <React.Fragment key={index}>
                            <ListItem
                                onClick={() => setSidebarKey(item.text)}
                                disablePadding
                                sx={{
                                    py: "2px",
                                    my:'2px',
                                    borderRadius: "10px",
                                    transition: ".3s",
                                    backgroundColor: sidebarKey === item.text && theme.palette?.sidebarHover,
                                    color: sidebarKey === item.text && "white",
                                    "& .icon": { color: sidebarKey === item.text && "white" },
                                    "&:hover": {
                                        backgroundColor: theme.palette?.sidebarHover,
                                        color: "white",
                                        "& .icon": { color: "white" },
                                    },
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon
                                        className="icon"
                                        sx={{ color: theme.palette?.textBlack || "#ECF0F1" }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
