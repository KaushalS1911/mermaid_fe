import dynamic from "next/dynamic";
import {
    Box,
    IconButton,
    Tooltip,
    Collapse,
    useTheme, Popover, List, ListItemButton, ListItemText,
} from "@mui/material";
import { IoMdMove } from "react-icons/io";
import { MdTextFields } from "react-icons/md";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import FullScreen from "./FullScreen";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {useContext, useEffect, useState} from "react";
import { useStore } from "@/store";
import AddIcon from '@mui/icons-material/Add';
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ImageIcon from "@mui/icons-material/Image";
import BrushIcon from "@mui/icons-material/Brush";
import { themes } from "@/layout/Sidebar";

import InfoIcon from "@mui/icons-material/Info";
import {ChartContext} from "@/app/layout";


const View = dynamic(() => import("./View"), { ssr: false });

const RightContainer = () => {
    const panZoom = useStore.use.panZoom();
    const setPanZoomEnable = useStore.use.setPanZoomEnable();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [fontSize, setFontSize] = useState("MD");
    const [expanded, setExpanded] = useState(true);
    const [activeButton, setActiveButton] = useState(null);
    const open = Boolean(anchorEl);
    const setCode = useStore((state) => state.setCode);
    const [themeAnchor, setThemeAnchor] = useState(null);
    const code = useStore((state) => state.code);
    const [count, setCount] = useState(0);
    const [designAnchor, setDesignAnchor] = useState(null);
    const handleThemeClose = () => {
        setThemeAnchor(null);
        setDesignAnchor(null);
    };
    const { color, setColor } = useContext(ChartContext);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFontSizeChange = (size) => {
        setFontSize(size);
        setAnchorEl(null);
    };
    const handleBrushClick = (event) => {
        setDesignAnchor(event.currentTarget);
    };

    const togglePanZoom = () => setPanZoomEnable(!panZoom);

    const toggleCollapse = () => {
        setExpanded(!expanded);
        setActiveButton("collapse");
    };

        const getBorderColorAndWidthByTheme = (theme) => {
            switch (theme) {
                case "dark":
                    return { color: "#ff9800", width: "1.2" };
                case "forest":
                    return { color: "#4caf50", width: "1" };
                case "base":
                    return { color: "#607d8b", width: "1.2" };
                case "neutral":
                    return { color: "#9e9e9e", width: "1" };
                case "ocean":
                    return { color: "#0288d1", width: "1.3" };
                case "solarized":
                    return { color: "#d4a900", width: "1.2" };
                case "sunset":
                    return { color: "#ff7043", width: "1.1" };
                case "neon":
                    return { color: "#FAFFC5", width: "1.3" };
                case "monochrome":
                    return { color: "#212121", width: "1.2" };
                default:
                    return { color: "#673ab7", width: "1.2" };
            }
        };


        useEffect(() => {
            const graphDiv = document.querySelector("#graph-div");
            if (graphDiv) {
                const { color: borderColor, width: borderWidth } = getBorderColorAndWidthByTheme(color.theme);
                const nodes = graphDiv.querySelectorAll("rect, path, circle");
                nodes.forEach((node) => {
                    node.style.stroke = borderColor;
                    node.style.strokeWidth = `${borderWidth}px`;
                });
            }
        }, [color.theme]);

    function countOccurrencesByPrefix(text, word, prefixLength = 8) {
        const prefix = word.slice(0, prefixLength);
        const regex = new RegExp(`\\b${prefix}\\w*\\b`, 'gi');
        const matches = text.match(regex);
        setCount(matches ? matches.length + 1 : 1)
    }

    useEffect(() => {
        if(code){
            countOccurrencesByPrefix(code,'subchart')
        }
    },[code])



    const handleButtonClick = (key) => {
        setActiveButton(key);
        if(key === 'addSubChart'){
            setCode(`${code +`  subgraph s${count}["Untitled subgraph"]\n` +
            `        subchart${count}["Untitled Node"]\n` +
            '  end'} `)
            typeof window !== "undefined" && sessionStorage.setItem("code",`${code +`  subgraph s${count}["Untitled subgraph"]\n` +
            `        subchart${count}["Untitled Node"]\n` +
            '  end'} `);

        }
    };
    return (
        <Box
            sx={{
                height: "100%",
                borderRadius: 1,
                overflow: "hidden",
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    height: 48,
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    alignItems: "center",
                    px: 1,
                    position: "absolute",
                    top: 10,
                    right: 10,
                    border: `2px solid ${theme.palette.bgGray}`,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                    }}
                >
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <IconButton
                            onClick={togglePanZoom}
                            sx={{
                                backgroundColor: panZoom
                                    ? theme.palette.action.hover
                                    : "transparent",
                            }}
                        >
                            <IoMdMove />
                        </IconButton>
                        <FullScreen />
                        <Tooltip title="Adjust Font Size">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <IconButton
                                    onClick={handleClick}
                                    sx={{
                                        backgroundColor: theme.palette.action.hover,
                                    }}
                                >
                                    <MdTextFields />
                                </IconButton>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>


            <Box
                sx={{
                    position: "absolute",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    p: 1,
                    bgcolor: "#f9f9f9",
                    boxShadow: 3,
                    transition: "all 0.3s ease-in-out",
                    width: "60px",
                    top: 80,
                    left: 10,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                    <Tooltip title={expanded ? "Collapse" : "Expand"}>
                        <IconButton
                            onClick={toggleCollapse}
                            sx={{
                                backgroundColor: activeButton === "collapse"
                                    ? "sidebarHover"
                                    : "white",
                                color: activeButton === "collapse" ? "white" : "black",
                                "&:hover": {
                                    backgroundColor: "#FF348033",
                                },
                            }}
                        >
                            {expanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Tooltip>
                </Box>

                <Collapse in={expanded}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {[  { key: "addNode", icon: <AddIcon/>, tooltip: "Add node" },
                            { key: "addSubChart", icon: <AddToPhotosIcon />, tooltip: "Add Sub Chart" },
                            { key: "launchRocket", icon: <RocketLaunchIcon />, tooltip: "Launch Rocket" },
                            { key: "addImage", icon: <ImageIcon />, tooltip: "Add Image" },
                            { key: "brushTool", icon: <BrushIcon />, tooltip: "Brush Tool" },
                        ].map(({ key, icon, tooltip }) => (
                            <Tooltip key={key} title={tooltip}>
                                <IconButton
                                    onClick={key === "brushTool" ? handleBrushClick :() => handleButtonClick(key)}
                                    sx={{
                                        backgroundColor: activeButton === key
                                            ? "sidebarHover"
                                            : "white",
                                        color: activeButton === key ? "white" : "black",
                                        "&:hover": {
                                            backgroundColor: "#FF348033",
                                        },
                                    }}
                                >
                                    {icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Box>
                </Collapse>
                <Popover
                    open={Boolean(designAnchor)}
                    anchorEl={designAnchor}
                    onClose={handleThemeClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
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
                    onClose={handleThemeClose}
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
            </Box>

            <Box>
                <View viewFontSizeBar={fontSize} color={color}/>
            </Box>
        </Box>
    );
};

export default RightContainer;