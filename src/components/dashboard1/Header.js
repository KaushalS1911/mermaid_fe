"use client";

import React, {useState} from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    InputBase,
    IconButton,
    Avatar,
    Stack,
    AvatarGroup,
    useMediaQuery,
    useTheme,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Tab from "@mui/material/Tab";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Table from "@/components/dashboard1/Table";
import img from "../../asset/dashboard1/Ellipse.png";


const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [menuOpen, setMenuOpen] = useState(false);
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Box sx={{bgcolor: "#fff", minHeight: "100vh", p: {md: 2, xs: 0}}}>
            <AppBar
                position="static"
                color="inherit"
                elevation={0}
                sx={{borderBottom: "1px solid #ddd"}}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 1,
                    }}
                >


                    {/* Tabs Section */}
                    <TabContext value={value}>
                        <Box sx={{flexGrow: 1, display: isSmallScreen ? "none" : "block"}}>
                            <TabList
                                onChange={handleChange}
                                aria-label="tabs"
                                variant="scrollable"
                                scrollButtons="auto"
                                sx={{
                                    "& .MuiTab-root.Mui-selected": {
                                        border: "2px solid #FF3480", // Customize the color of the border
                                    },
                                }}
                            >
                                <Tab label="All" value="1" sx={{border: "1px solid transparent"}}/>
                                <Tab label="Recents" value="2" sx={{border: "1px solid transparent"}}/>
                                <Tab label="Created by Me" value="3" sx={{border: "1px solid transparent"}}/>
                                <Tab label="Folders" value="4" sx={{border: "1px solid transparent"}}/>
                                <Tab label="Unsorted" value="5" sx={{border: "1px solid transparent"}}/>
                            </TabList>
                        </Box>
                    </TabContext>


                    {/* Search Bar & Controls */}
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        sx={{
                            flexGrow: 1,
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Mobile Menu Button */}
                        {isSmallScreen && (
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                                <MenuIcon/>
                            </IconButton>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                px: 1,
                                bgcolor: "#f9f9f9",
                                width: isSmallScreen
                                    ? "50%"
                                    : isMobile
                                        ? "200px"
                                        : "250px",
                                flexGrow: 1,
                                maxWidth: "100%",
                                marginBottom: isSmallScreen ? "10px" : "0", // Adjust for mobile
                            }}
                        >
                            <InputBase placeholder="Search" sx={{ml: 1, flexGrow: 1}}/>
                            <SearchIcon color="disabled"/>
                        </Box>

                        {/* User Actions */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            {!isSmallScreen && (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{color: "#8DA6B2", border: "#C8C8C8 1px solid"}}
                                >
                                    Ctrl K
                                </Button>
                            )}

                            {
                                !isSmallScreen && (
                                    <AvatarGroup max={3}>
                                        <Avatar alt="User 1" src={img.src}/>
                                        <Avatar alt="User 2" src={img.src}/>
                                        <Avatar alt="User 3" src={img.src}/>
                                    </AvatarGroup>
                                )}

                            {!isMobile ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        startIcon={<SendIcon/>}
                                        size="small"
                                        sx={{color: "#171717", border: "#EFEFEF 1px solid"}}
                                    >
                                        Invite
                                    </Button>
                                    <IconButton sx={{color: "#171717", border: "#EFEFEF 1px solid"}}>
                                        <MessageOutlinedIcon/>
                                    </IconButton>
                                </>
                            ) : (
                                <IconButton sx={{color: "#171717", border: "#EFEFEF 1px solid"}}>
                                    <SendIcon/>
                                </IconButton>
                            )}
                        </Stack>
                    </Box>
                </Toolbar>

                {/* Mobile Navigation Drawer */}
                <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
                    <List>
                        <ListItem button onClick={() => setValue("1")}>
                            <ListItemText primary="All"/>
                        </ListItem>
                        <ListItem button onClick={() => setValue("2")}>
                            <ListItemText primary="Recents"/>
                        </ListItem>
                        <ListItem button onClick={() => setValue("3")}>
                            <ListItemText primary="Created by Me"/>
                        </ListItem>
                        <ListItem button onClick={() => setValue("4")}>
                            <ListItemText primary="Folders"/>
                        </ListItem>
                        <ListItem button onClick={() => setValue("5")}>
                            <ListItemText primary="Unsorted"/>
                        </ListItem>
                    </List>
                </Drawer>
            </AppBar>

            {/* Tab Panels */}
            <TabContext value={value}>
                <TabPanel value="1">
                    <Table/>
                </TabPanel>
                <TabPanel value="2">
                    <Table/>
                </TabPanel>
                <TabPanel value="3">
                    <Table/>
                </TabPanel>
                <TabPanel value="4">
                    <Table/>
                </TabPanel>
                <TabPanel value="5">
                    <Table/>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default Header;
