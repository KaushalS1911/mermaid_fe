"use client";
import React, { useState, useContext } from "react";
import html2canvas from "html2canvas";
import Drawer from "@mui/material/Drawer";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Backdrop,
    CircularProgress,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChartContext } from "@/app/layout";
import light from "../asset/editor/design/image (1).png";
import dark from "../asset/editor/design/image (2).png";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import BrushIcon from "@mui/icons-material/Brush";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import {useStore} from "@/store";

const Sidebar = ({
                     open,
                     mobileOpen,
                     handleDrawerToggle,
                     setSidebarKey,
                     sidebarKey,
                     setCollapsed,
                     collapsed,
                 }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [designAnchor, setDesignAnchor] = useState(null);
    const [themeAnchor, setThemeAnchor] = useState(null);
    const [exportAnchor, setExportAnchor] = useState(null);
    const { chartRef, setColor } = useContext(ChartContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const drawerWidth = collapsed ? 67 : 200;
    const code = useStore((state) => state.code);

    const handleDownloadImage = () => {
        setIsLoading(true);
        html2canvas(chartRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.href = imgData;
            downloadLink.download = "image.png";
            downloadLink.click();
            setIsLoading(false);
        });
    };

    const handleDownloadMMD = () => {
        // Check if code exists
        if (!code || code.trim() === "") {
            alert("No code to download!");
            setIsLoading(false);
            return; // If code is empty, do not proceed
        }

        setIsLoading(true);
        const blob = new Blob([code], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "diagram.mmd";
        link.click();
        setIsLoading(false);
    };

    const menuItems = [
        {
            text: "Collapse menu",
            selected: false,
            icon: !collapsed ? (
                <KeyboardDoubleArrowLeftIcon />
            ) : (
                <KeyboardDoubleArrowRightIcon />
            ),
            action: () => setCollapsed(!collapsed),
        },
        { text: "Templates", selected: false, icon: <DataSaverOffIcon /> },
        { text: "Snippets", selected: false, icon: <DashboardCustomizeIcon /> },
        {
            text: "Design",
            icon: <BrushIcon />,
            action: (event) => {
                setDesignAnchor(event.currentTarget);
                setSidebarKey("Design");
            },
        },
        {
            text: "Export",
            icon: <SystemUpdateAltIcon />,
            action: (event) => {
                setSidebarKey("Export");
                setExportAnchor(event.currentTarget);
            },
        },
    ];

    const themes = [
        { text: "Default", color: "default", image: light, borderColor: "#AC5C1C" },
        { text: "Forest", color: "forest", image: light, borderColor: "#228B22" },
        { text: "Base", color: "base", image: light, borderColor: "#000" },
        { text: "Dark", color: "dark", image: dark, borderColor: "#FFFFFF" },
        { text: "Neutral", color: "neutral", image: light, borderColor: "#999999" },
    ];

    return (
        <Box>
            <Backdrop open={isLoading} sx={{ color: "#FF3480", zIndex: 9999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Drawer
                variant={isMobile ? "temporary" : "persistent"}
                anchor="left"
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        backgroundColor: "#fffcfd",
                    },
                }}
            >
                <List sx={{ mx: "5px" }}>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                onClick={
                                    item.action ||
                                    (() =>
                                        setSidebarKey({
                                            text: item.text,
                                            selected: sidebarKey.text === item.text
                                                ? !sidebarKey.selected
                                                : !item.selected,
                                        }))
                                }
                                sx={{
                                    my: 0.5,
                                    borderRadius: "10px",
                                    backgroundColor:
                                        sidebarKey.text === item.text && theme.palette?.sidebarHover,
                                    color: sidebarKey.text === item.text && "white",
                                    py: 0.5,
                                    "&:hover": {
                                        backgroundColor:
                                            sidebarKey.text !== item.text
                                                ? "rgba(255,52,128,0.2)"
                                                : theme.palette?.sidebarHover,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        p: "0 !important",
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 20,
                                            color: sidebarKey.text === item.text && "white",
                                            p: "0 !important",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                </Box>
                                {!collapsed && (
                                    <ListItemText primary={item.text} sx={{ mx: 2, textWrap: "nowrap" }} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Popover
                open={Boolean(designAnchor)}
                anchorEl={designAnchor}
                onClose={() => setDesignAnchor(null)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                py={0}
            >
                <List sx={{ backgroundColor: "#F2F2F3", py: 0.5, px: 0.5, width: "180px" }}>
                    <ListItemButton
                        onClick={(event) => setThemeAnchor(event.currentTarget)}
                        sx={{
                            borderRadius: "10px",
                            py: 0.5,
                            "&:hover": { backgroundColor: "sidebarHover", color: "white" },
                        }}
                    >
                        <ListItemText primary="Themes" /> <KeyboardArrowRightIcon />
                    </ListItemButton>
                </List>
            </Popover>

            <Popover
                open={Boolean(themeAnchor)}
                anchorEl={themeAnchor}
                onClose={() => setThemeAnchor(null)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <List sx={{ backgroundColor: "#F2F2F3", py: 0.5, px: 0.5, width: "180px" }}>
                    {themes.map((themeItem, index) => (
                        <ListItemButton
                            key={index}
                            onClick={() => {
                                setColor({
                                    theme: themeItem.color,
                                    image: themeItem.image,
                                    borderColor: themeItem.borderColor,
                                });
                                setThemeAnchor(null);
                                setDesignAnchor(null);
                                setSidebarKey(themeItem.text);
                            }}
                            sx={{
                                borderRadius: "10px",
                                py: 0.5,
                                "&:hover": { backgroundColor: "sidebarHover", color: "white" },
                            }}
                        >
                            <ListItemText primary={themeItem.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Popover>

            <Popover
                open={Boolean(exportAnchor)}
                anchorEl={exportAnchor}
                onClose={() => setExportAnchor(null)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                py={0}
            >
                <List
                    sx={{ backgroundColor: "#F2F2F3", py: 0.5, px: 0.5, width: "180px", boxShadow: "none" }}
                >
                    <ListItemButton
                        onClick={handleDownloadImage}
                        sx={{
                            borderRadius: "10px",
                            "&:hover": { backgroundColor: "sidebarHover", color: "white" },
                        }}
                    >
                        <ListItemText primary="Export as PNG" />
                    </ListItemButton>
                    <ListItemButton
                        onClick={handleDownloadMMD}
                        sx={{
                            borderRadius: "10px",
                            "&:hover": { backgroundColor: "sidebarHover", color: "white" },
                        }}
                    >
                        <ListItemText primary="Export as MMD" />
                    </ListItemButton>
                </List>
            </Popover>
        </Box>
    );
};

export default Sidebar;
