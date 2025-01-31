"use client";
import React, {useContext, useEffect, useRef, useState} from 'react';
import mermaid from "mermaid";
import {Box, Grid} from "@mui/material";
import Snippets from "@/components/editor/Snippets";
import MonacoEditor from '@monaco-editor/react';
import {ChartContext} from "@/app/layout";
import Templates from "@/components/editor/Templates";
import LeftContainer from "@/components/editor/LeftContainer";
import RightContainer from "@/components/editor/RightContainer";

function MainEditor({sidebarKey, formatCode}) {
    const {code, setCode} = useContext(ChartContext
    )
    const token = localStorage.getItem("code")
    useEffect(() => {
        if(token !== null){
        setCode(token);
        }
    },[token])
    const mermaidCode = `
   flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
  `;
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

    return (<Box>
        <Grid container spacing={2}>
            {sidebarKey === "Snippets" && (
                <Grid item xs={12} md={3}>
                    <Snippets/>
                </Grid>
            )}{sidebarKey === "Templates" && (
            <Grid item xs={12} md={3}>
                <Templates/>
            </Grid>
        )}
            <Grid item xs={12} sm={6} md={sidebarKey === "Snippets" ? 5 : 6} lg={sidebarKey === "Snippets" ? 4 : 6}>
                {/*<Box sx={{height: '100vh', overflowY: 'auto',py:2}}>*/}
                {/*    <MonacoEditor*/}
                {/*        height="100%"*/}
                {/*        defaultLanguage="mermaid"*/}
                {/*        theme="vs-light"*/}
                {/*        value={code}*/}
                {/*        onChange={(value) => setCode(value || '')}*/}
                {/*        options={{*/}
                {/*            minimap: {enabled: false}, scrollBeyondLastLine: false, automaticLayout: true,*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Box>*/}
                <LeftContainer />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={5} height={"100vh"} overflowY="hidden" py={2} >
                {/*<Box>*/}
                {/*<Box*/}
                {/*    ref={chartRef}*/}
                {/*    sx={{*/}
                {/*        textAlign: "center", padding: '16px',*/}
                {/*    }}*/}
                {/*/>*/}
                {/*</Box>*/}
                <RightContainer />
            </Grid>
        </Grid>
    </Box>);
}

export default MainEditor;