"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useDebounce } from "ahooks";
import { Box } from "@mui/material";
import { parse, render } from "@/utils/mermaid";
import svgPanZoom from "svg-pan-zoom";
import { useStore } from "@/store";
import { ChartContext } from "@/app/layout";
import theme from "@/components/theme/theme";

// Custom message to display if there are syntax errors
const customMessage = `\n\nIf you are using AI, Gemini can be incorrect sometimes and may provide syntax errors.`;

// View component definition
const View = ({ viewFontSizeBar, color, fontSizes }) => {
    // Context and store hooks
    const { chartRef } = useContext(ChartContext);
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

    // Ref for the container element
    const container = useRef(null);
    // State for font size
    const [fontSize] = useState(16);

    // Debounced versions of code and config
    const debounceCode = useDebounce(code, { wait: 300 });
    const debounceConfig = useDebounce(config, { wait: 300 });

    // State for validation messages
    const [validateCode, setValidateCode] = useState("");
    const [validateConfig, setValidateConfig] = useState("");
    const setCode = useStore.use.setCode();

    // Ref for pan-zoom instance
    const pzoom = useRef();

    // Function to validate code and config
    const setValidateCodeAndConfig = async (code, config) => {
        try {
            // Attempt to parse the code and config
            await parse(code);
            JSON.parse(config);
            // If successful, update validation states
            setValidateCode(code);
            setValidateConfig(config);
            setValidateCodeState(code);
            setValidateConfigState(config);
        } catch (error) {
            // Handle errors and set error messages
            let errorMessage = error instanceof Error
                ? `Syntax error: ${error.message} ${customMessage}`
                : "Syntax error: Unknown error";
            setValidateCode(errorMessage);
            setValidateConfig(config);
            setValidateCodeState(errorMessage);
            setValidateConfigState(config);
        }
    };

    // Function to handle pan-zoom changes
    const handlePanZoomChange = () => {
        if (!pzoom.current) return;
        // Get current pan and zoom values
        const pan = pzoom.current.getPan();
        const zoom = pzoom.current.getZoom();
        setPanZoom({ pan, zoom });
    };

    // Custom themes for Mermaid diagrams
    const addTheme = [
        {
            name: "ocean",
            style: {
                primaryColor: '#71BBB2',
                primaryBorderColor: '#497D74',
            }
        },
        {
            name: "solarized",
            style: {
                primaryColor: '#A27B5C',
                primaryBorderColor: '#3F4F44'
            }
        },
        {
            name: "sunset",
            style: {
                primaryColor: '#FFCDB2',
                primaryBorderColor: '#E5989B'
            }
        },
        {
            name: "neon",
            style: {
                primaryColor: '#B6FFA1',
                primaryBorderColor: '#00FF9C'
            }
        },
        {
            name: "monochrome",
            style: {
                primaryColor: '#A7B49E',
                primaryBorderColor: '#818C78'
            }
        }
    ];

    // Function to render the diagram
    const renderDiagram = async (code, config) => {
        if (container.current && code) {
            // Determine styles based on the theme
            let styles = {};
            if (color.theme.includes("base/")) {
                const themeName = color.theme.split("/")[1];
                styles = addTheme.find((item) => item.name === themeName)?.style;
            }
            // Render the diagram with Mermaid
            const { svg } = await render(
                { ...JSON.parse(config), theme: color.theme.includes("base/") ? color.theme.split('/')[0] : color.theme },
                code,
                "graph-div",
                {
                    startOnLoad: false,
                    securityLevel: "loose",
                    theme: color.theme.includes("base/") ? color.theme.split('/')[0] : color.theme,
                    themeVariables: {
                        ...styles,
                        fontSize: fontSizes && fontSizes === "MD" ? "12px" :
                            fontSizes && fontSizes === "LG" ? "16px" :
                                fontSizes && fontSizes === "XL" ? "20px" : "24px"
                    }
                }
            );
            // Update the container with the rendered SVG
            if (svg.length > 0) {
                container.current.innerHTML = svg;
                const svgElement = container.current.querySelector("svg");
                if (svgElement) {
                    svgElement.setAttribute("width", "100%");
                    svgElement.setAttribute("height", "100%");
                    svgElement.style.display = "block";
                }
                setSvg(svg);
                const graphDiv = document.querySelector("#graph-div");
                if (!graphDiv) {
                    throw new Error("graph-div not found");
                }
                graphDiv.setAttribute("height", "100%");
                graphDiv.style.maxWidth = "100%";
                graphDiv.style.overflow = "visible";

                // Adjust text alignment and box sizes
                const textNodes = graphDiv.querySelectorAll("text, tspan, foreignObject *");
                textNodes.forEach(text => {
                    text.setAttribute("alignment-baseline", "central");
                });
                handlePanZoom();
                makeChartEditable();

                const boxes = graphDiv.querySelectorAll("rect");
                boxes.forEach(box => {
                    box.style.overflow = "visible";
                    const parentText = box.closest("g")?.querySelector("text");
                    if (parentText) {
                        const textLength = parentText.getComputedTextLength();
                        const adjustedWidth = textLength + fontSize * 1.5;
                        const adjustedHeight = fontSize * 2;
                        box.setAttribute("width", adjustedWidth);
                        box.setAttribute("height", adjustedHeight);
                    }
                });

                container.current.style.fontSize = `${fontSize}px`;
            }
        }
    };

    // Function to make chart elements editable
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

    // Function to update the code when an element is edited
    const updateCode = (oldText, newText) => {
        if (!oldText || !newText) return;
        const newCode = code.replace(oldText, newText);
        setCode(newCode);
        sessionStorage.setItem('code', newCode);
        requestAnimationFrame(() => {
            document.querySelectorAll(".node, .box, .circle").forEach((element) => {
                if (element.textContent.trim() === oldText) {
                    element.textContent = newText;
                }
            });
        });
        setTimeout(() => renderDiagram(newCode, debounceConfig), 20);
    };

    // Function to handle pan-zoom initialization
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

    // Effect to render the diagram when dependencies change
    useEffect(() => {
        if (typeof window !== "undefined") {
            renderDiagram(validateCode, validateConfig);
        }
    }, [validateCode, validateConfig, color.theme, panZoom, fontSizes]);

    // Effect to validate code and config when they change
    useEffect(() => {
        if (typeof window !== "undefined" && (autoSync || updateDiagram)) {
            setValidateCodeAndConfig(debounceCode, debounceConfig);
            if (updateDiagram) setUpdateDiagram(false);
        }
    }, [debounceCode, debounceConfig, autoSync, updateDiagram, color.theme]);

    // Render the component
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
                <Box id="container" ref={container} component="div" sx={{
                    maxWidth: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "visible"
                }} />
            )}
        </Box>
    );
};

export default View;