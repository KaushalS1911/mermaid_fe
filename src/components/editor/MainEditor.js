"use client";
import React, {useEffect, useRef} from 'react';
import mermaid from "mermaid";
import {Box, Grid} from "@mui/material";
import Snippets from "@/components/editor/Snippets";
import Templates from "@/components/editor/Templates";
import LeftContainer from "@/components/editor/LeftContainer";
import RightContainer from "@/components/editor/RightContainer";
import {useStore} from "@/store";

function MainEditor({sidebarKey}) {
    const setCode = useStore((state) => state.setCode);
    const code = useStore((state) => state.code);
    const token = typeof window !== "undefined" && localStorage.getItem("code")
    useEffect(() => {
        if (token !== null) {
            setCode(token);
        }
    }, [token])
    const chartRef = useRef(null);
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: 'default',
        });
    }, []);
    useEffect(() => {
        const renderDiagram = async () => {
            if (chartRef.current && code) {
                try {
                    const container = chartRef.current;
                    const id = `mermaid-${Date.now()}`;
                    container.innerHTML = '';
                    const pre = document.createElement('pre');
                    pre.className = 'mermaid';
                    pre.textContent = code;
                    container.appendChild(pre);
                    const {svg} = await mermaid.render(id, code);
                    container.innerHTML = svg;
                } catch (error) {
                    console.error("Mermaid rendering error:", error);
                }
            }
        };
        renderDiagram();
    }, [code]);

    return (<Box sx={{height: '100vh', overflow: 'auto', display: 'flex'}}>
        <Grid container spacing={2}>
                {(sidebarKey.text === "Snippets" && sidebarKey.selected) && (
                    <Grid item xs={12} sm={6} md={3} sx={{height: '100vh', overflow: 'auto'}}>
                        <Snippets/>
                    </Grid>
                )}{(sidebarKey.text === "Templates" && sidebarKey.selected) && (
                <Grid item xs={12} sm={6} md={3} sx={{height: '100vh', overflow: 'auto'}}>
                    <Templates/>
                </Grid>
            )}
            <Grid item sx={{height: '100vh', overflowY: 'auto'}} xs={12} sm={6} md={5}
                  lg={6}>
                <LeftContainer/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} height={"100vh"} sx={{overflowY: 'hidden'}}  >
                <RightContainer />
            </Grid>
        </Grid>
    </Box>);
}

export default MainEditor;