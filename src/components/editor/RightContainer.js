import dynamic from "next/dynamic";
import {
    Box,
    IconButton,
    Tooltip,
    Collapse,
    useTheme,
} from "@mui/material";
import { IoMdMove } from "react-icons/io";
import { MdTextFields } from "react-icons/md"; // Font size icon
import { ExpandMore, ExpandLess } from "@mui/icons-material"; // Collapse Icons
import FullScreen from "./FullScreen";
import { useState } from "react";
import { useStore } from "@/store";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ImageIcon from "@mui/icons-material/Image";
import BrushIcon from "@mui/icons-material/Brush";
import InfoIcon from "@mui/icons-material/Info";

// Dynamically load components to avoid SSR
const View = dynamic(() => import("./View"), { ssr: false });

const RightContainer = () => {
    const panZoom = useStore.use.panZoom();
    const setPanZoomEnable = useStore.use.setPanZoomEnable();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [fontSize, setFontSize] = useState("MD"); // Default font size
    const [expanded, setExpanded] = useState(true); // Start as expanded
    const [activeButton, setActiveButton] = useState(null); // Track the active button
    const open = Boolean(anchorEl);

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

    const togglePanZoom = () => setPanZoomEnable(!panZoom);

    const toggleCollapse = () => {
        setExpanded(!expanded);
        setActiveButton("collapse"); // Highlight the collapse button when clicked
    };

    const handleButtonClick = (key) => {
        setActiveButton(key); // Set the clicked button as active
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

            {/* Box with Collapse Toggle and Icon List */}
            <Box
                sx={{
                    position: "absolute",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    p: 1,
                    bgcolor: "#f9f9f9",
                    boxShadow: 3,
                    transition: "all 0.3s ease-in-out",
                    width: "60px", // Adjusted for vertical layout
                    top: 80, // Adjust position below top bar
                    left: 10,
                }}
            >
                {/* Collapse Toggle Icon at the Top */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                    <Tooltip title={expanded ? "Collapse" : "Expand"}>
                        <IconButton
                            onClick={toggleCollapse}
                            sx={{
                                backgroundColor: activeButton === "collapse"
                                    ? "sidebarHover" // Active state (clicked)
                                    : "white", // Default state
                                color: activeButton === "collapse" ? "white" : "black",
                                "&:hover": {
                                    backgroundColor: "#FF348033", // Hover state
                                },
                            }}
                        >
                            {expanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Collapsible List of Icon Buttons */}
                <Collapse in={expanded}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {[
                            { key: "addPhotos", icon: <AddToPhotosIcon />, tooltip: "Add Photos" },
                            { key: "launchRocket", icon: <RocketLaunchIcon />, tooltip: "Launch Rocket" },
                            { key: "addImage", icon: <ImageIcon />, tooltip: "Add Image" },
                            { key: "brushTool", icon: <BrushIcon />, tooltip: "Brush Tool" },
                            { key: "info", icon: <InfoIcon />, tooltip: "Information" },
                        ].map(({ key, icon, tooltip }) => (
                            <Tooltip key={key} title={tooltip}>
                                <IconButton
                                    onClick={() => handleButtonClick(key)}
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
            </Box>

            <Box>
                <View viewFontSizeBar={fontSize} />
            </Box>
        </Box>
    );
};

export default RightContainer;
