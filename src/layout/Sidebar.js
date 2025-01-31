"use client";
import React, {useState, useContext} from "react";
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
    CircularProgress, Button, useMediaQuery,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {ChartContext} from "@/app/layout";
import light from "../asset/editor/design/image (1).png";
import dark from "../asset/editor/design/image (2).png";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import BrushIcon from '@mui/icons-material/Brush';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
const Sidebar = ({open, mobileOpen, handleDrawerToggle, setSidebarKey,sidebarKey, setCollapsed,collapsed}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [designAnchor, setDesignAnchor] = useState(null);
    const [themeAnchor, setThemeAnchor] = useState(null);
    const [exportAnchor, setExportAnchor] = useState(null);
    const {code, chartRef, setColor} = useContext(ChartContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const drawerWidth = collapsed ? 60 : 200;

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
        setIsLoading(true);
        const blob = new Blob([code], {type: "text/plain"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "diagram.mmd";
        link.click();
        setIsLoading(false);
    };
    const menuItems = [
        {text: "Collapse menu", icon:!collapsed ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon/>, action: () => setCollapsed(!collapsed)},
        {text: "Templates", icon: <DataSaverOffIcon/>},
        {text: "Snippets", icon: <DashboardCustomizeIcon/>},
        {text: "Design", icon: <BrushIcon/>, action: (event) => {
                setDesignAnchor(event.currentTarget)
                setSidebarKey("Design")
            }},
        {text: "Export", icon: <SystemUpdateAltIcon/>, action: (event) => {
                setSidebarKey("Export")
                setExportAnchor(event.currentTarget)
            }},
    ];

    const themes = [
        {text: "Default", color: "default", image: light},
        {text: "Forest", color: "forest", image: light},
        {text: "Base", color: "base", image: light},
        {text: "Dark", color: "dark", image: dark},
        {text: "Neutral", color: "neutral", image: light},
    ];
    return (
        <Box>
            <Backdrop open={isLoading} sx={{color: "#FF3480", zIndex: 9999}}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Drawer
                variant={isMobile ? "temporary" : "persistent"}
                anchor="left"
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                ModalProps={{keepMounted: true}}
                sx={{"& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth, backgroundColor: "#fffcfd",mx:1}}}
            >


                <List sx={{mx: "5px"}}>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                onClick={item.action || (() => setSidebarKey(item.text))}
                                sx={{
                                    borderRadius: "10px",backgroundColor: sidebarKey === item.text && theme.palette?.sidebarHover,
                                    color: sidebarKey === item.text && "white",
                                    py: 0.5,
                                    "&:hover": {
                                        backgroundColor: "rgba(255,52,128,0.2)",
                                    },
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <ListItemIcon sx={{ minWidth: 20, color:sidebarKey === item.text && "white"}}>
                                        {item.icon}
                                    </ListItemIcon>
                                </Box>
                                {!collapsed && <ListItemText primary={item.text} sx={{ mx: 2, textWrap: 'nowrap' }} />}
                            </ListItemButton>
                        </ListItem>

                    ))}
                </List>
            </Drawer>

                <Popover
                    open={Boolean(designAnchor)}
                    anchorEl={designAnchor}
                    onClose={() => setDesignAnchor(null)}
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    transformOrigin={{vertical: "top", horizontal: "left"}}
                    py={0}
                >
                    <List sx={{backgroundColor: "#F2F2F3",py:0.5, px:0.5, width: '180px'}}>
                        <ListItemButton onClick={(event) => setThemeAnchor(event.currentTarget)}
                                        sx={{borderRadius: "10px", py: 0.5,"&:hover": {backgroundColor: "sidebarHover" , color: "white"}}}>
                            <ListItemText primary="Themes"/> <KeyboardArrowRightIcon/>
                        </ListItemButton>
                    </List>
                </Popover>

            <Popover
                open={Boolean(themeAnchor)}
                anchorEl={themeAnchor}
                onClose={() => setThemeAnchor(null)}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                transformOrigin={{vertical: "top", horizontal: "left"}}
            >
                <List sx={{backgroundColor: "#F2F2F3",py:0.5, px:0.5, width: '180px'}}>
                    {themes.map((themeItem, index) => (
                        <ListItemButton
                            key={index}
                            onClick={() => {
                                setColor({theme: themeItem.color, image: themeItem.image});
                                setThemeAnchor(null);
                                setSidebarKey(themeItem.text);
                            }}
                            sx={{borderRadius: "10px", py: 0.5,"&:hover": {backgroundColor: "sidebarHover" , color: "white"}}}
                        >
                            <ListItemText primary={themeItem.text}/>
                        </ListItemButton>
                    ))}
                </List>
            </Popover>

                <Popover
                    open={Boolean(exportAnchor)}
                    anchorEl={exportAnchor}
                    onClose={() => setExportAnchor(null)}
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    transformOrigin={{vertical: "top", horizontal: "left"}}
                    py={0}
                >
                    <List sx={{backgroundColor: "#F2F2F3",py:0.5, px:0.5, width: '180px' , boxShadow:"none"}}>
                        <ListItemButton onClick={handleDownloadImage} sx={{borderRadius: "10px", "&:hover": {backgroundColor: "sidebarHover" , color: "white"}}}>
                            <ListItemText primary="Export as PNG"/>
                        </ListItemButton>
                        <ListItemButton onClick={handleDownloadMMD} sx={{borderRadius: "10px", "&:hover": {backgroundColor: "sidebarHover" , color: "white"}}}>
                            <ListItemText primary="Export as MMD"/>
                        </ListItemButton>
                    </List>
                </Popover>
        </Box>
    );
};

export default Sidebar;
