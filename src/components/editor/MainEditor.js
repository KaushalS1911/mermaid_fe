"use client";
import React, { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Snippets from "@/components/editor/Snippets";
import Templates from "@/components/editor/Templates";
import LeftContainer from "@/components/editor/LeftContainer";
import RightContainer from "@/components/editor/RightContainer";
import { useStore } from "@/store";

function MainEditor({ sidebarKey }) {
    const setCode = useStore((state) => state.setCode);
    const code = useStore((state) => state.code);
    const token = typeof window !== "undefined" && localStorage.getItem("code");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (token !== null) {
            setCode(token);
        }
    }, [token]);

    const chartRef = useRef(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: "loose",
            theme: "default",
        });
    }, []);

    useEffect(() => {
        const renderDiagram = async () => {
            if (chartRef.current && code) {
                try {
                    const container = chartRef.current;
                    const id = `mermaid-${Date.now()}`;
                    container.innerHTML = "";
                    const pre = document.createElement("pre");
                    pre.className = "mermaid";
                    pre.textContent = code;
                    container.appendChild(pre);
                    const { svg } = await mermaid.render(id, code);
                    container.innerHTML = svg;
                } catch (error) {
                    console.error("Mermaid rendering error:", error);
                }
            }
        };
        renderDiagram();
    }, [code]);

    // Adjusting Widths
    const [leftWidth, setLeftWidth] = useState(isMobile ? 100 : 50); // Default 50% on desktop, 100% on mobile
    const isResizing = useRef(false);

    const handleMouseDown = (e) => {
        if (isMobile) return; // Disable resizing on mobile
        isResizing.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isResizing.current || isMobile) return;
        const sidebarWidth = sidebarKey.selected ? 250 : 0;
        const newWidth = ((e.clientX - sidebarWidth) / (window.innerWidth - sidebarWidth)) * 100;
        if (newWidth > 20 && newWidth < 80) {
            setLeftWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        if (isMobile) return;
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", overflow: "hidden", flexDirection: isMobile ? "column" : "row" }}>
            {sidebarKey.selected && (
                <Box sx={{ width: isMobile ? "100%" : "390px", height: isMobile ? "auto" : "100vh", overflowY: "auto", flexShrink: 0 }}>
                    {sidebarKey.text === "Snippets" && <Snippets />}
                    {sidebarKey.text === "Templates" && <Templates />}
                </Box>
            )}

            <Box sx={{ width: isMobile ? "100%" : `${leftWidth}%`, height: isMobile ? "50vh" : "100vh", overflowY: "auto", flexShrink: 0 }}>
                <LeftContainer />
            </Box>

            {!isMobile && (
                <Box
                    sx={{
                        width: "5px",
                        cursor: "ew-resize",
                        backgroundColor: "#ccc",
                        height: "100vh",
                        flexShrink: 0,
                    }}
                    onMouseDown={handleMouseDown}
                />
            )}

            <Box
                sx={{
                    width: isMobile ? "100%" : `calc(100% - ${leftWidth}% - ${sidebarKey.selected ? "255px" : "5px"})`,
                    height: isMobile ? "50vh" : "100vh",
                    overflowY: "auto",
                }}
            >
                <RightContainer />
            </Box>
        </Box>
    );
}

export default MainEditor;