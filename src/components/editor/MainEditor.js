"use client";
import React, { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";
import { Box } from "@mui/material";
import Snippets from "@/components/editor/Snippets";
import Templates from "@/components/editor/Templates";
import LeftContainer from "@/components/editor/LeftContainer";
import RightContainer from "@/components/editor/RightContainer";
import { useStore } from "@/store";

function MainEditor({ sidebarKey }) {
    const setCode = useStore((state) => state.setCode);
    const code = useStore((state) => state.code);
    const token = typeof window !== "undefined" && localStorage.getItem("code");

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


    const [leftWidth, setLeftWidth] = useState(50);
    const isResizing = useRef(false);

    const handleMouseDown = (e) => {
        isResizing.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;

        const newWidth = ((e.clientX - (sidebarKey.selected ? 250 : 0)) / (window.innerWidth - (sidebarKey.selected ? 250 : 0))) * 100;
        if (newWidth > 20 && newWidth < 80) {
            setLeftWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <Box sx={{ height: "100vh", overflow: "hidden", display: "flex" }}>
            {sidebarKey.selected && (
                <Box sx={{ width: "550px", height: "100vh", overflow: "auto" }}>
                    {sidebarKey.text === "Snippets" ? <Snippets /> : <Templates />}
                </Box>
            )}

            <Box sx={{ width: `${leftWidth}%`, height: "100vh", overflowY: "auto" }}>
                <LeftContainer />
            </Box>

            <Box
                sx={{
                    width: "5px",
                    cursor: "ew-resize",
                    backgroundColor: "#ccc",
                    height: "100vh",
                    position: "relative",
                }}
                onMouseDown={handleMouseDown}
            />

            <Box sx={{ width: `${100 - leftWidth}%`, height: "100vh", overflowY: "hidden" }}>
                <RightContainer />
            </Box>
        </Box>
    );
}

export default MainEditor;

