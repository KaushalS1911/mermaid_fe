"use client";
import {useContext, useEffect, useRef, useState} from "react";
import {useDebounce} from "ahooks";
import {Box} from "@mui/material";
import {parse, render} from "@/utils/mermaid";
import svgPanZoom from "svg-pan-zoom";
import {useStore} from "@/store";
import {ChartContext} from "@/app/layout";
const customMessage = `\n\nIf you are using AI, Gemini can be incorrect sometimes and may provide syntax errors.
In such cases please manually fix them.
Common gemini syntax Errors:
- Comments (remove all comments)
- Parenthesis or single or double quotes in node titles (remove them)`;
const View = () => {
    const {chartRef, color} = useContext(ChartContext)
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
    const view = useRef(null);
    const debounceCode = useDebounce(code, {wait: 300});
    const debounceConfig = useDebounce(config, {wait: 300});
    const [validateCode, setValidateCode] = useState("");
    const [validateConfig, setValidateConfig] = useState("");
    // const { chartRef, color } = useContext(ChartContext);
    // const code = useStore.use.code();
    // const config = useStore.use.config();
    const setCode = useStore.use.setCode();
    // const setSvg = useStore.use.setSvg();
    // const container = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    // const debounceCode = useDebounce(code, { wait: 300 });
    // const debounceConfig = useDebounce(config, { wait: 300 });
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
                container.current.innerHTML = svg;
                setSvg(svg);
                makeChartEditable();
            }
        }
    };
    const handleWheel = (event) => {
        event.preventDefault();
        let newZoomLevel = zoomLevel + (event.deltaY < 0 ? 0.1 : -0.1);
        newZoomLevel = Math.min(Math.max(0.5, newZoomLevel), 3);
        setZoomLevel(newZoomLevel);
    };
    const makeChartEditable = () => {
        const editableElements = document.querySelectorAll(".node, .box, .circle");
        editableElements.forEach((element) => {
            element.style.cursor = "pointer";
            element.addEventListener("dblclick", function (event) {
                event.stopPropagation();
                let currentText = element.textContent.trim();
                let rect = element.getBoundingClientRect();
                let input = document.createElement("input");
                input.type = "text";
                input.value = currentText;
                input.style.position = "absolute";
                input.style.left = `${rect.left + window.scrollX}px`;
                input.style.top = `${rect.top + window.scrollY}px`;
                input.style.width = `${rect.width}px`;
                input.style.height = `${rect.height}px`;
                input.style.border = "1px solid #000";
                input.style.background = "#ECECFF";
                input.style.padding = "2px";
                input.style.fontSize = "14px";
                input.style.zIndex = "1000";
                input.style.textAlign = "center";
                document.body.appendChild(input);
                input.focus();
                const removeInput = () => {
                    if (document.body.contains(input)) {
                        document.body.removeChild(input);
                    }
                };
                input.addEventListener("keydown", function (e) {
                    if (e.key === "Enter") {
                        updateCode(currentText, input.value);
                        element.textContent = input.value;
                        removeInput();
                    }
                });
                input.addEventListener("blur", function () {
                    removeInput();
                });
            });
        });
    };
    const updateCode = (oldText, newText) => {
        const newCode = code.replace(oldText, newText);
        setCode(newCode);
        // Update element's text instantly
        const editableElements = document.querySelectorAll(".node, .box, .circle");
        editableElements.forEach((element) => {
            if (element.textContent.trim() === oldText) {
                element.textContent = newText;
            }
        });
        // Rerender chart immediately
        renderDiagram(newCode, debounceConfig);
    };
    useEffect(() => {
        // if (typeof window !== "undefined") {
        //     renderDiagram(debounceCode, debounceConfig);
        // }
        const containerElement = container.current;
        if (containerElement) {
            containerElement.addEventListener("wheel", handleWheel, { passive: false });
        }
        return () => {
            if (containerElement) {
                containerElement.removeEventListener("wheel", handleWheel);
            }
        };
    }, [debounceCode, debounceConfig, color.theme, zoomLevel]);
    // const handlePanZoomChange = () => {
    //     if (!pzoom.current) return;
    //     const pan = pzoom.current.getPan();
    //     const zoom = pzoom.current.getZoom();
    //     setPanZoom({pan, zoom});
    // };
    //
    // const handlePanZoom = () => {
    //     if (!panZoom) return;
    //     pzoom.current?.destroy();
    //     pzoom.current = undefined;
    //     Promise.resolve().then(() => {
    //         const graphDiv = document.querySelector("#graph-div");
    //         if (!graphDiv) return;
    //         pzoom.current = svgPanZoom(graphDiv, {
    //             onPan: handlePanZoomChange,
    //             onZoom: handlePanZoomChange,
    //             // controlIconsEnabled: true,
    //             fit: true,
    //             center: true,
    //         });
    //         if (pan !== undefined && zoom !== undefined && Number.isFinite(zoom)) {
    //             pzoom.current.zoom(zoom);
    //             pzoom.current.pan(pan);
    //         }
    //     });
    // };
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
    // console.log(color)
    // // //
    // useEffect(() => {
    //   const cod ={theme:color.theme}
    //   setConfig(JSON.stringify(cod))
    // }, [color]);
    return (
        <Box ref={chartRef} component="div" sx={{
            height: "100vh !important", cursor: 'grab',
            // backgroundImage: `url("${color.image.src}")`,
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
        }}>
            {validateCode.startsWith("Syntax error") ? (
                <Box component="div" sx={{color: "red", paddingX: 2}}>
                    {validateCode}
                </Box>
            ) : (
                <Box id="container" ref={container} component="div" sx={{height: "100%"}}/>
            )}
        </Box>
    );
};
export default View;