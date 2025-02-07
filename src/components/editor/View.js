"use client";
import {useContext, useEffect, useRef, useState} from "react";
import {useDebounce} from "ahooks";
import {Box} from "@mui/material";
import {parse, render} from "@/utils/mermaid";
import svgPanZoom from "svg-pan-zoom";
import {useStore} from "@/store";
import {ChartContext} from "@/app/layout";

const SESSION_STORAGE_KEY = "mermaid_chart_code";

const View = () => {
    const {chartRef, color} = useContext(ChartContext);
    const code = useStore.use.code();
    const config = useStore.use.config();
    const autoSync = useStore.use.autoSync();
    const updateDiagram = useStore.use.updateDiagram();
    const setUpdateDiagram = useStore.use.setUpdateDiagram();
    const setSvg = useStore.use.setSvg();
    const panZoom = useStore.use.panZoom();
    const pan = useStore.use.pan?.();
    const zoom = useStore.use.zoom?.();
    const setPanZoom = useStore.use.setPanZoom();
    const setValidateCodeState = useStore.use.setValidateCode();
    const setValidateConfigState = useStore.use.setValidateConfig();
    const container = useRef(null);
    const debounceCode = useDebounce(code, {wait: 300});
    const debounceConfig = useDebounce(config, {wait: 300});
    const [validateCode, setValidateCode] = useState("");
    const [validateConfig, setValidateConfig] = useState("");
    const setCode = useStore.use.setCode();

    useEffect(() => {
        const savedCode = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (savedCode) {
            setCode(savedCode);
        }
    }, []);

    const setValidateCodeAndConfig = async (code, config) => {
        try {
            await parse(code);
            JSON.parse(config);
            setValidateCode(code);
            setValidateConfig(config);
            setValidateCodeState(code);
            setValidateConfigState(config);
        } catch (error) {
            let errorMessage = error instanceof Error ? `Syntax error: ${error.message}` : "Syntax error: Unknown error";
            setValidateCode(errorMessage);
            setValidateConfig(config);
            setValidateCodeState(errorMessage);
            setValidateConfigState(config);
        }
    };

    const handlePanZoomChange = () => {
        if (!pzoom.current) return;
        const pan = pzoom.current.getPan();
        const zoom = pzoom.current.getZoom();
        setPanZoom({pan, zoom});
    };

    const renderDiagram = async (code, config) => {
        if (container.current && code) {
            const {svg} = await render(
                {...JSON.parse(config)},
                code,
                "graph-div", {
                    startOnLoad: false,
                    securityLevel: "loose",
                    theme: color.theme,
                }
            );
            if (svg.length > 0) {
                container.current.innerHTML = svg;
                const svgElement = container.current.querySelector("svg");
                if (svgElement) {
                    svgElement.setAttribute("width", "100%");
                    svgElement.setAttribute("height", "100%");
                    svgElement.style.display = "block";
                }
                setSvg(svg);
                handlePanZoom();
                makeChartEditable();
            }

        }
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
                Object.assign(input.style, {
                    position: "absolute",
                    left: `${rect.left + window.scrollX}px`,
                    top: `${rect.top + window.scrollY}px`,
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    border: "1px solid #000",
                    background: "#ECECFF",
                    padding: "2px",
                    fontSize: "14px",
                    zIndex: "1000",
                    textAlign: "center",
                });
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
                input.addEventListener("blur", removeInput);
            });
        });
    };

    const updateCode = (oldText, newText) => {
        if (!oldText || !newText) return;
        const newCode = code.replace(oldText, newText);
        setCode(newCode);
        sessionStorage.setItem(SESSION_STORAGE_KEY, newCode);
        requestAnimationFrame(() => {
            document.querySelectorAll(".node, .box, .circle").forEach((element) => {
                if (element.textContent.trim() === oldText) {
                    element.textContent = newText;
                }
            });
        });
        setTimeout(() => renderDiagram(newCode, debounceConfig), 20);
    };

    const pzoom = useRef();

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
    }, [validateCode, validateConfig]);

    useEffect(() => {
        if (typeof window !== "undefined" && (autoSync || updateDiagram)) {
            setValidateCodeAndConfig(debounceCode, debounceConfig);
            if (updateDiagram) setUpdateDiagram(false);
        }
    }, [debounceCode, debounceConfig, autoSync, updateDiagram]);

    return (
        <Box ref={chartRef} sx={{height: "100vh", maxWidth: "100% ", cursor: "grab"}}>
            {validateCode.startsWith("Syntax error") ? (
                <Box component="div" sx={{color: "red", paddingX: 2}}>{validateCode}</Box>
            ) : (
                <Box
                    id="container"
                    ref={container}
                    component="div"
                    sx={{
                        maxWidth: "100% ",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                />
            )}
        </Box>
    );
};

export default View;
