"use client";
import React, {useContext, useEffect, useRef, useState} from 'react';
import mermaid from "mermaid";
import {Box, Grid} from "@mui/material";
import Snippets from "@/components/editor/Snippets";
import MonacoEditor from '@monaco-editor/react';
import {ChartContext} from "@/app/layout";
import Templates from "@/components/editor/Templates";

function MainEditor({sidebarKey, formatCode}) {
    const {code, setCode} = useContext(ChartContext
    )
    const token = localStorage.getItem("code")
    useEffect(() => {
        setCode(token);
    }, [token])
    console.log(code)
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

    return (
        <Box height={"100%"} minHeight={'100VH'}>
            <Grid container>
                {sidebarKey === "Snippets" && (
                    <Grid item xs={12} md={3}>
                        <Snippets/>
                    </Grid>
                )}{sidebarKey === "Templates" && (
                <Grid item xs={12} md={3}>
                    <Templates/>
                </Grid>
            )}
                <Grid item xs={12} sm={6} lg={4} overflow={"auto"}>
                    <MonacoEditor
                        height="100vh"
                        overflowY={'auto'}
                        defaultLanguage="mermaid"
                        theme="vs-light"
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        options={{
                            minimap: {enabled: false},
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={5} bgcolor={'white'} height={'100vh'} overflowY={"scroll"}>
                    <div
                        ref={chartRef}
                        style={{
                            textAlign: "center",
                            padding: '16px',
                            overflow: 'auto',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default MainEditor;