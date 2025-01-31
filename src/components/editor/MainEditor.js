"use client";
import React, {useContext, useEffect, useRef, useState} from "react";
import mermaid from "mermaid";
import {Box, Grid} from "@mui/material";
import Snippets from "@/components/editor/Snippets";
import MonacoEditor from "@monaco-editor/react";
import {ChartContext} from "@/app/layout";

function MainEditor({sidebarKey, formatCode}) {
    const {code, setCode, color , chartRef} = useContext(ChartContext);

    const token = localStorage.getItem("code");


    useEffect(() => {
        if (token) {
            setCode(token);
        }
    }, [token]);
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: "loose",
            theme: color.theme || "default",
            image: color.image || "light",
        });
    }, [color.theme, color.image]);

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

                    await mermaid.contentLoaded();
                    const {svg} = await mermaid.render(id, code);
                    container.innerHTML = svg;
                } catch (error) {
                    console.error("Mermaid rendering error:", error);
                }
            }
        };

        renderDiagram();
    }, [code, color.theme, color.image]);

    return (
        <Box height={"100%"} minHeight={"100vh"}>
            <Grid container>
                {sidebarKey === "Snippets" && (
                    <Grid item xs={12} md={3}>
                        <Snippets/>
                    </Grid>
                )}
                <Grid item xs={12} md={4} overflow={"auto"}>
                    <MonacoEditor
                        height="100vh"
                        defaultLanguage="mermaid"
                        theme="vs-light"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        options={{
                            minimap: {enabled: false},
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={5}
                    height="100vh"
                    width={100}
                    overflowY="auto"
                    sx={{
                        backgroundImage: `url("${color.image.src}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                        <div
                            ref={chartRef}
                            style={{
                                textAlign: "center",
                                padding: 16,
                                overflow: "auto",
                            }}
                        />
                </Grid>
            </Grid>
        </Box>
    );
}

export default MainEditor;