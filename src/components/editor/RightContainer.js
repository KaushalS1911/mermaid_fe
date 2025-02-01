"use client";

import dynamic from "next/dynamic";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    useTheme,
} from "@mui/material";
import {FaCloudUploadAlt} from "react-icons/fa";
import {IoMdMove} from "react-icons/io";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {downloadImgAsPng, downloadImgAsSvg} from "@/utils/utils";
import {useState} from "react";
import {useStore} from "@/store";

// Dynamically load components to avoid SSR
const View = dynamic(() => import("./View"), {ssr: false});
const FullScreen = dynamic(() => import("./FullScreen"), {ssr: false});

const RightContainer = () => {
    const panZoom = useStore.use.panZoom();
    const setPanZoomEnable = useStore.use.setPanZoomEnable();
    const theme = useTheme();

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
                    </Box>
                </Box>
            </Box>
            <Box sx={{height: "calc(100% - 48px)"}}>
                <View/>
            </Box>
        </Box>
    );
};


export default RightContainer;