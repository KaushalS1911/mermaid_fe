"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useDebounce } from "ahooks";
import { Box, Slider, Typography } from "@mui/material";
import { parse, render } from "@/utils/mermaid";
import svgPanZoom from "svg-pan-zoom";
import { useStore } from "@/store";
import { ChartContext } from "@/app/layout";

const customMessage = `\n\nIf you are using AI, Gemini can be incorrect sometimes and may provide syntax errors.`;

const View = ({ viewFontSizeBar }) => {
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
    const [fontSize, setFontSize] = useState(16);

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
            let errorMessage = error instanceof Error
                ? `Syntax error: ${error.message} ${customMessage}`
                : "Syntax error: Unknown error";
            setValidateCode(errorMessage);
            setValidateConfig(config);
            setValidateCodeState(errorMessage);
            setValidateConfigState(config);
        }
    };

    const getBorderColorAndWidthByTheme = (theme) => {
        switch (theme) {
            case "dark":
                return { color: "#ff9800", width: "1.2" };
            case "forest":
                return { color: "#4caf50", width: "1" };
            case "base":
                return { color: "#607d8b", width: "1.2" };
            case "neutral":
                return { color: "#9e9e9e", width: "1" };
            case "ocean":
                return { color: "#0288d1", width: "1.3" };
            case "solarized":
                return { color: "#d4a900", width: "1.2" };
            case "sunset":
                return { color: "#ff7043", width: "1.1" };
            case "neon":
                return { color: "#FAFFC5", width: "1.3" };
            case "monochrome":
                return { color: "#212121", width: "1.2" };
            default:
                return { color: "#673ab7", width: "1.2" };
        }
    };

    const renderDiagram = async (code, config) => {
        if (container.current && code) {
            const { svg } = await render(
                { ...JSON.parse(config) },
                code,
                "graph-div",
                {
                    startOnLoad: false,
                    securityLevel: "loose",
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
                graphDiv.style.overflow = "visible"; // Allow overflow content to be visible

                const { color: borderColor, width: borderWidth } = getBorderColorAndWidthByTheme(color.theme);

                const nodes = graphDiv.querySelectorAll("rect, path, circle");
                nodes.forEach(node => {
                    node.style.stroke = borderColor;
                    node.style.strokeWidth = borderWidth;
                });

                const textNodes = graphDiv.querySelectorAll("text, tspan, foreignObject *");
                const fontSizeMapping = {
                    SM: 12,
                    MD: 13,
                    LG: 14,
                    XL: 15,
                    XXL: 16.2,
                };

                textNodes.forEach(text => {
                    text.style.fontSize = `${fontSizeMapping[viewFontSizeBar] || 12}px`;

                });


                const boxes = graphDiv.querySelectorAll("rect");
                boxes.forEach(box => {
                    box.style.overflow = "visible"; // Ensure no text gets clipped inside boxes
                    const parentText = box.closest("g")?.querySelector("text");
                    if (parentText) {
                        const textLength = parentText.getComputedTextLength();
                        const adjustedWidth = textLength + fontSize * 1.5; // Keep some padding
                        const adjustedHeight = fontSize * 2;
                        box.setAttribute("width", adjustedWidth);
                        box.setAttribute("height", adjustedHeight);
                    }
                });

                container.current.style.fontSize = `${fontSize}px`;
            }
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
        <Box ref={chartRef} component="div" sx={{
            height: "100vh !important",
            cursor: "grab",
            backgroundImage: `url("${color.image.src}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>

            {validateCode.startsWith("Syntax error") ? (
                <Box component="div" sx={{ color: "red", paddingX: 2 }}>
                    {validateCode}
                </Box>
            ) : (
                <Box id="container" ref={container} component="div" sx={{ height: "100%", overflow: "visible" }} />
            )}
        </Box>
    );
};

export default View;
