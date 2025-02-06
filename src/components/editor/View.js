"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useDebounce } from "ahooks";
import { Box } from "@mui/material";
import { parse, render } from "@/utils/mermaid";
import svgPanZoom from "svg-pan-zoom";
import { useStore } from "@/store";
import { ChartContext } from "@/app/layout";

const customMessage = `\n\nIf you are using AI, Gemini can be incorrect sometimes and may provide syntax errors. 
In such cases please manually fix them.

Common gemini syntax Errors:
- Comments (remove all comments)
- Parenthesis or single or double quotes in node titles (remove them)`;

const View = () => {
    const { chartRef, color } = useContext(ChartContext);
    const code = useStore.use.code();
    const config = useStore.use.config();
    const autoSync = useStore.use.autoSync();
    const updateDiagram = useStore.use.updateDiagram();
    const panZoom = useStore.use.panZoom();
    const pan = useStore.use.pan?.();
    const zoom = useStore.use.zoom?.();
    const setPanZoom = useStore.use.setPanZoom();
    const setUpdateDiagram = useStore.use.setUpdateDiagram();
    const setSvg = useStore.use.setSvg();
    const setValidateCodeState = useStore.use.setValidateCode();
    const setValidateConfigState = useStore.use.setValidateConfig();

    const container = useRef(null);

    const debounceCode = useDebounce(code, { wait: 300 });
    const debounceConfig = useDebounce(config, { wait: 300 });

    const [validateCode, setValidateCode] = useState("");
    const [validateConfig, setValidateConfig] = useState("");

    const pzoom = useRef();

    const setValidateCodeAndConfig = async (code, config) => {
        try {
            await parse(code);
            JSON.parse(config);
            setValidateCode(code);
            setValidateConfig(config);
            setValidateCodeState(code);
            setValidateConfigState(config);
        } catch (error) {
            let errorMessage;
            if (error instanceof Error) {
                errorMessage = `Syntax error: ${error.message} ${customMessage}`;
            } else {
                errorMessage = "Syntax error: Unknown error";
            }
            setValidateCode(errorMessage);
            setValidateConfig(config);
            setValidateCodeState(errorMessage);
            setValidateConfigState(config);
        }
    };

    const renderDiagram = async (code, config) => {
        if (container.current && code) {
            const { svg } = await render(
                { ...JSON.parse(config) },
                code,
                "graph-div", {
                    startOnLoad: false,
                    securityLevel: 'loose',
                    theme: color.theme,
                }
            );
            if (svg.length > 0) {
                handlePanZoom();
                container.current.innerHTML = svg;
                setSvg(svg);
                const graphDiv = document.querySelector("#graph-div");
                if (!graphDiv) {
                    throw new Error("graph-div not found");
                }
                graphDiv.setAttribute("height", "100%");
                graphDiv.style.maxWidth = "100%";

                // Update only chart elements (rect, path, circle) borders based on theme
                const nodes = graphDiv.querySelectorAll("rect, path, circle");
                const borderColor = getBorderColorByTheme(color.theme);
                nodes.forEach(node => {
                    node.style.stroke = borderColor; // Apply border color to chart elements
                    node.style.strokeWidth = "1"; // Optional: Apply a stroke width to make the border visible
                });
            }
        }
    };

    const getBorderColorByTheme = (theme) => {
        switch (theme) {
            case "dark":
                return "#ff5722"; // Orange for dark theme
            case "light":
                return "#1976d2"; // Blue for light theme
            case "purple":
                return "#9c27b0"; // Purple for purple theme
            // default:
            //     return "#000";
        }
    };

    const handlePanZoomChange = () => {
        if (!pzoom.current) return;
        const pan = pzoom.current.getPan();
        const zoom = pzoom.current.getZoom();
        setPanZoom({ pan, zoom });
    };

    const handlePanZoom = () => {
        if (!panZoom) return;
        pzoom.current?.destroy();
        pzoom.current = undefined;
        Promise.resolve().then(() => {
            const graphDiv = document.querySelector("#graph-div");
            if (!graphDiv) return;
            pzoom.current = svgPanZoom(graphDiv, {
                onPan: handlePanZoomChange,
                onZoom: handlePanZoomChange,
                fit: true,
                center: true,
            });
            if (pan !== undefined && zoom !== undefined && Number.isFinite(zoom)) {
                pzoom.current.zoom(zoom);
                pzoom.current.pan(pan);
            }
        });
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            renderDiagram(validateCode, validateConfig);
        }
    });

    useEffect(() => {
        if (typeof window !== "undefined" && (autoSync || updateDiagram)) {
            setValidateCodeAndConfig(debounceCode, debounceConfig);
            if (updateDiagram) setUpdateDiagram(false);
        }
    });

    return (
        <Box
            ref={chartRef}
            component="div"
            sx={{
                height: "100vh !important",
                cursor: "grab",
            }}
        >
            {validateCode.startsWith("Syntax error") ? (
                <Box component="div" sx={{ color: "red", paddingX: 2 }}>
                    {validateCode}
                </Box>
            ) : (
                <Box id="container" ref={container} component="div" sx={{ height: "100%" }}></Box>
            )}
        </Box>
    );
};

export default View;
