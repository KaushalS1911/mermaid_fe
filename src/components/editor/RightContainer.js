import dynamic from "next/dynamic";
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    useTheme,
} from "@mui/material";
import {IoMdMove} from "react-icons/io";
import {MdTextFields} from "react-icons/md";  // Font size icon
import FullScreen from "./FullScreen";
import {useState} from "react";
import {useStore} from "@/store";

// Dynamically load components to avoid SSR
const View = dynamic(() => import("./View"), {ssr: false});

const RightContainer = () => {
    const panZoom = useStore.use.panZoom();
    const setPanZoomEnable = useStore.use.setPanZoomEnable();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [fontSize, setFontSize] = useState("MD"); // Default font size
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
                    backgroundColor:"#fff",
                    borderRadius:"10px",
                    alignItems: "center",
                    px: 1,
                    position: "absolute",
                    top: 10,
                    right: 10,
                    border:`2px solid ${theme.palette.bgGray}`
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                    }}
                >
                    <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                        <IconButton
                            onClick={togglePanZoom}
                            sx={{
                                backgroundColor: panZoom
                                    ? theme.palette.action.hover
                                    : "transparent",
                            }}
                        >
                            <IoMdMove/>
                        </IconButton>
                        <FullScreen/>
                        <Tooltip title="Adjust Font Size">
                            <Box sx={{display: "flex", alignItems: "center"}}>
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
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            {["MD", "LG", "XL", "XXL"].map((size) => (
                                <MenuItem key={size} onClick={() => handleFontSizeChange(size)}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>
            </Box>

            <Box
            >
                <View viewFontSizeBar={fontSize}/>
            </Box>
        </Box>
    );
};

export default RightContainer;
