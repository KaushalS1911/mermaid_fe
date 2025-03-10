// Importing dynamic component loading for client-side only rendering
import dynamic from "next/dynamic";

// Importing Material-UI components
import {
    Box,
    IconButton,
    Tooltip,
    Collapse,
    useTheme, Popover, List, ListItemButton, ListItemText, Typography, Tabs, Menu, MenuItem, TextField, Button, Stack
} from "@mui/material";

// Importing icons
import {IoMdMove} from "react-icons/io";
import {MdTextFields} from "react-icons/md"; // Font size icon
import {ExpandMore, ExpandLess} from "@mui/icons-material"; // Collapse Icons
import FullScreen from "./FullScreen";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// React hooks and state management
import {useContext, useEffect, useState} from "react";
import {useStore} from "@/store";

// Additional icons
import AddIcon from '@mui/icons-material/Add';
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ImageIcon from "@mui/icons-material/Image";
import BrushIcon from "@mui/icons-material/Brush";

// Importing themes
import {themes} from "@/layout/Sidebar";

// More icons and shapes for the editor
import InfoIcon from "@mui/icons-material/Info";
import Tab from "@mui/material/Tab";
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';

// Importing shape assets
import Rectangle from '@/asset/editor/shapes/Rectangle.svg';
import Braces from '@/asset/editor/shapes/Braces.svg';
import Card from '@/asset/editor/shapes/Card.svg';
import Circle from '@/asset/editor/shapes/Circle.svg';
import Collate_Action from '@/asset/editor/shapes/Collate Action.svg';
import Comment_Right from '@/asset/editor/shapes/Comment Right.svg';
import Comment from '@/asset/editor/shapes/Comment.svg';
import Cylinder from '@/asset/editor/shapes/Cylinder.svg';
import Database from '@/asset/editor/shapes/Database.svg';
import Decision from '@/asset/editor/shapes/Decision.svg';
import Delay from '@/asset/editor/shapes/Delay.svg';
import Diamond from '@/asset/editor/shapes/Diamond.svg';
import Direct_Access_Storage from '@/asset/editor/shapes/Direct Access Storage.svg';
import Disk_Storage from '@/asset/editor/shapes/Disk Storage.svg';
import Display from '@/asset/editor/shapes/Display.svg';
import Divied_Process from '@/asset/editor/shapes/Divied Process.svg';
import Document from '@/asset/editor/shapes/Document.svg';
import Dubble_Circle from '@/asset/editor/shapes/Dubble Circle.svg';
import Event from '@/asset/editor/shapes/Event.svg';
import Extractions_Process from '@/asset/editor/shapes/Extractions Process.svg';
import Filled_Circles from '@/asset/editor/shapes/Filled Circles.svg';
import Fork_Join from '@/asset/editor/shapes/Fork-Join.svg';
import Framed_Circle from '@/asset/editor/shapes/Framed Circle.svg';
import Hexazone from '@/asset/editor/shapes/Hexazone.svg';
import Horizontal_Cylinder from '@/asset/editor/shapes/Horizontal Cylinder.svg';
import In_Out from '@/asset/editor/shapes/In Out.svg';
import Internal_Storage from '@/asset/editor/shapes/Internal Storage.svg';
import Junction from '@/asset/editor/shapes/Junction.svg';
import Lined_Document from '@/asset/editor/shapes/Lined Document.svg';
import Lined_Process from '@/asset/editor/shapes/Lined Process.svg';
import Loop_Limit from '@/asset/editor/shapes/Loop Limit.svg';
import Manual_File_Action from '@/asset/editor/shapes/Manual File Action.svg';
import Manual_Input from '@/asset/editor/shapes/Manual Input.svg';
import Multi_Process from '@/asset/editor/shapes/Multi Process.svg';
import Multiple_Document from '@/asset/editor/shapes/Multiple Document.svg';
import Odd from '@/asset/editor/shapes/Odd.svg';
import Out_In from '@/asset/editor/shapes/Out In.svg';
import Parallelogram_Reversed from '@/asset/editor/shapes/Parallelogram Reversed.svg';
import Parallelogram from '@/asset/editor/shapes/parallelogram.svg';
import Priority_Action from '@/asset/editor/shapes/Priority Action.svg';
import Rounded from '@/asset/editor/shapes/Rounded.svg';
import Small_Circle from '@/asset/editor/shapes/Small Circle.svg';
import Stadium from '@/asset/editor/shapes/Stadium.svg';
import Standard_Process from '@/asset/editor/shapes/Standard Process.svg';
import Start from '@/asset/editor/shapes/Start.svg';
import Stop from '@/asset/editor/shapes/Stop.svg';
import Stored_Data from '@/asset/editor/shapes/Stored Data.svg';
import Sub_Process from '@/asset/editor/shapes/Sub Process.svg';
import Summary from '@/asset/editor/shapes/Summary.svg';
import Tagged_Document from '@/asset/editor/shapes/Tagged Document.svg';
import Tagged_Process from '@/asset/editor/shapes/Tagged Process.svg';
import Terminal from '@/asset/editor/shapes/Terminal.svg';
import Text_Block from '@/asset/editor/shapes/Text Block.svg';
import Trapezoid_Reversed from '@/asset/editor/shapes/Trapezoid Reversed.svg';
import Trapezoid from '@/asset/editor/shapes/Trapezoid.svg';
import Triangle from '@/asset/editor/shapes/Triangle.svg';
import Anchor from '@/asset/editor/shapes/Anchor.svg';
import Paper_Tape from '@/asset/editor/shapes/Paper Tape.svg';
import Communication_Link from '@/asset/editor/shapes/Communication Link.svg';

// Context for shared state
import {ChartContext} from "@/app/layout";

// Dynamically import View component (client-side only)
const View = dynamic(() => import("./View"), {ssr: false});

// Initial form values
const initialValue = {
    heading: 'This is sample label',
    image: 'https://static.mermaidchart.dev/whiteboard/default-image-shape.svg',
    width: 200,
    height: 200,
}
const RightContainer = () => {
    // State hooks for managing UI and data
    const [form, setForm] = useState(initialValue)
    const panZoom = useStore.use.panZoom();
    const setPanZoomEnable = useStore.use.setPanZoomEnable();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElImage, setAnchorElImage] = useState(null);
    const [fontSize, setFontSize] = useState("MD");
    const [expanded, setExpanded] = useState(true);
    const [activeButton, setActiveButton] = useState(null);
    const open = Boolean(anchorEl);
    const [openImageModel, setOpenImageModel] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const setCode = useStore((state) => state.setCode);
    const code = useStore((state) => state.code);
    const [count, setCount] = useState(0);
    const [countShape, setCountShape] = useState(0);
    const [themeAnchor, setThemeAnchor] = useState(null);
    const [countRocket, setCountRocket] = useState(0);
    const [countImage, setCountImage] = useState(0);
    const [oldCode, setOldCode] = useState(null);

    // Handle form changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Add click event to shapes dynamically
    useEffect(() => {
        const handleClick = (svgDoc) => {
            const labelElement = svgDoc.querySelector(".nodeLabel p");
            const labelText = labelElement ? labelElement.innerText : "";

            const imageElement = svgDoc.querySelector("image");
            const imgSrc = imageElement ? imageElement.getAttribute("href") : "";
            const imgWidth = imageElement ? imageElement.getAttribute("width") : "";
            const imgHeight = imageElement ? imageElement.getAttribute("height") : "";
            const identifier = svgDoc ? svgDoc.getAttribute("id").split("-")[1] : ""

            const result = `
${identifier}[${labelText}]
${identifier}@{img: ${imgSrc}, h: ${imgHeight}, w: ${imgWidth}, pos: "b"}
`;
            const b = {
                image: imgSrc,
                height: imgHeight,
                width: imgWidth,
                heading: labelText,
            }
            setForm(b)
            setOldCode(result)
            setOpenImageModel(true);
        };

        const observer = new MutationObserver(() => {
            const elements = document.getElementsByClassName('image-shape');
            if (elements.length) {
                Array.from(elements).forEach((item) => {
                    item.addEventListener('click', () => handleClick(item));
                });
            }
        });

        observer.observe(document.body, {childList: true, subtree: true});

        return () => {
            observer.disconnect();
            const elements = document.getElementsByClassName('image-shape');
            if (elements.length) {
                Array.from(elements).forEach((item) => {
                    item.removeEventListener('click', handleClick);
                });
            }
        };
    }, []);


    const [designAnchor, setDesignAnchor] = useState(null);
    const handleThemeClose = () => {
        setThemeAnchor(null);
        setDesignAnchor(null);
    };
    const handleShapeClose = () => {
        setAnchorEl(null);
    };
    const {color, setColor} = useContext(ChartContext);

    const handleClose = () => {
        setOpenImageModel(false)
    };

    // Handle pan/zoom toggle
    const togglePanZoom = () => setPanZoomEnable(!panZoom);

    // Toggle collapse/expand
    const toggleCollapse = () => {
        setExpanded(!expanded);
        setActiveButton("collapse");
    };

    // Handle font size menu
    const [anchorElFontSize, setAnchorElFontSize] = useState(null);

    const handleFontSizeMenuOpen = (event) => {
        setAnchorElFontSize(event.currentTarget);
    };

    const handleFontSizeMenuClose = () => {
        setAnchorElFontSize(null);
    };

    const handleFontSizeChange = (size) => {
        setFontSize(size);
        handleFontSizeMenuClose();
    };


    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    const handleImageClick = (event) => {

        setOpenImageModel(true);
        setAnchorElImage(event.currentTarget);
    };

    const id = open ? "image-popover" : undefined;

    {/*code counter*/}
    function countOccurrencesByPrefix(text, word, prefixLength = 8) {
        const prefix = word.slice(0, prefixLength);
        const regex = new RegExp(`\\b${prefix}\\w*\\b`, 'gi');
        const matches = text.match(regex);
        setCount(matches ? matches.length + 1 : 1)
    }

    function countOccurrencesByPrefixForShape() {
        const matches = [...code.matchAll(/shapes(\d+)/g)];
        let lastShapeNumber = 0;
        if (matches.length > 0) {
            lastShapeNumber = matches.length ? matches[matches.length - 2][1] : null;
        }
        setCountShape(matches && lastShapeNumber ? Number(lastShapeNumber) + 1 : 1)
    }

    function countOccurrencesByPrefixForRocket(text, word, prefixLength = 3) {
        const prefix = word.slice(0, prefixLength);
        const regex = new RegExp(`\\b${prefix}\\w*\\b`, 'gi');
        const matches = text.match(regex);
        setCountRocket(matches ? matches.length + 1 : 1)
    }

    function countOccurrencesByPrefixForImage(text, word, prefixLength = 8) {
        const prefix = word.slice(0, prefixLength);
        const regex = new RegExp(`\\b${prefix}\\w*\\b`, 'gi');
        if (oldCode == null) {

            const matches = text.match(regex) || [];

            const a = matches?.length ? matches?.length == 2 ? matches?.length : matches?.length - 1 : 1

            setCountImage(a)

        }
    }


    useEffect(() => {
        if (code) {
            countOccurrencesByPrefix(code, 'subchart')
            countOccurrencesByPrefixForShape(code, 'shapes')
            countOccurrencesByPrefixForRocket(code, 'xyz')

            countOccurrencesByPrefixForImage(code, 'imgTitle')
        }
    }, [code])

    {/*property click to show to code*/}
    const handleButtonClick = (event, key) => {
        setActiveButton(key);

        if (key === 'addSubChart') {
            const newCode = `${code + `\nsubgraph s${count}["Untitled subgraph"]\n` +
            `        subchart${count}["Untitled Node"]\n` +
            '  end'} `;
            const connection = count > 1 ? `s${count} --> s${count - 1}\n` : '';
            const finalCode = newCode + connection;
            setCode(finalCode);
            if (typeof window !== "undefined") {
                sessionStorage.setItem("code", finalCode);
            }
        }

        if (key === 'brushTool') {
            setDesignAnchor(event.currentTarget);
        }
        if (key === 'shapes') {
            setAnchorEl(event.currentTarget);
        }

        if (key === 'launchRocket') {
            const newcode = `${code + `xyz${countRocket}["Sample Label"]\n` +
            `xyz${countRocket}@{ icon: "mc:default", pos: "b"}\n`
            }`;

            setCode(newcode);

            if (typeof window !== "undefined") {
                sessionStorage.setItem("code", `${newcode}`);
            }
        }

        if (key === 'addImage') {
            setOldCode(null)
            const newcode = `${code + `\nimgTitle${countImage}[${form.heading}]\n` +
            `imgTitle${countImage}@{img: ${form.image}, h: ${form.height}, w: ${form.width}, pos: "b"}\n`
            }`;
            setCode(newcode);

            if (typeof window !== "undefined") {
                sessionStorage.setItem("code", `${newcode}`);
            }
        }
    };

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    {/*shape property*/}
    const BasicShapes = [
        {
            img: Rectangle,
            code: `\n shapes${countShape}["Rectangle"]\n shapes${countShape}@{ shape: rect}\n`
        },
        {
            img: Rounded,
            code: `\n shapes${countShape}["Rounded"] \n shapes${countShape}@{ shape: rounded}`
        }, {
            img: Stadium,
            code: `\n   shapes${countShape}(["Stadium"])`
        }, {
            img: Triangle,
            code: `\n shapes${countShape}["Diamond"] \n shapes${countShape}@{ shape: diam}`
        }, {
            img: Diamond,
            code: `\n shapes${countShape}["Triangle"] \n shapes${countShape}@{ shape: tri}`
        }, {
            img: Hexazone,
            code: `\n   shapes${countShape}["Hexagon"] \n shapes${countShape}@{ shape: hex}`
        }, {
            img: Cylinder,
            code: `\n shapes${countShape}["Cylinder"]\n shapes${countShape}@{ shape: cyl}`
        }, {
            img: Horizontal_Cylinder,
            code: `\n shapes${countShape}["Horizontal Cylinder"] \nshapes${countShape}@{ shape: h-cyl}`
        }, {
            img: Circle,
            code: `\n     shapes${countShape}(("Circle"))`
        }, {
            img: Dubble_Circle,
            code: `\n shapes${countShape}["Double Circle"]\n shapes${countShape}@{ shape: dbl-circ}`
        }, {
            img: Small_Circle,
            code: `\n  shapes${countShape}["Small Circle"] \n shapes${countShape}@{ shape: sm-circ}`
        }, {
            img: Framed_Circle,
            code: `\n shapes${countShape}["Frames Circle"]\n shapes${countShape}@{ shape: fr-circ}`
        }, {
            img: Filled_Circles,
            code: `\n   shapes${countShape}["Filled Circle"] \n shapes${countShape}@{ shape: f-circ}`
        }, {
            img: Parallelogram,
            code: `\n    shapes${countShape}["Parallelogram"] \n shapes${countShape}@{ shape: lean-l}`
        }, {
            img: Parallelogram_Reversed,
            code: `\n  shapes${countShape}["Parallelogram Reversed"] \n shapes${countShape}@{ shape: lean-r}`
        }, {
            img: Trapezoid,
            code: `\n   shapes${countShape}["Trapezoid"] \n shapes${countShape}@{ shape: trap-b}`
        }, {
            img: Trapezoid_Reversed,
            code: `\nshapes${countShape}["Trapezoid Reversed"] \n shapes${countShape}@{ shape: trap-t}`
        }, {
            img: Card,
            code: `\n  shapes${countShape}["Card"]  \n  shapes${countShape}@{ shape: card}`
        }, {
            img: Odd,
            code: `\n shapes${countShape}>"Odd"]`
        }, {
            img: Anchor,
            code: `\n shapes${countShape}["Anchor"] \n shapes${countShape}@{ shape: anchor}`
        },
    ]
    const ProcessShapes = [
        {img: Standard_Process, code: `\nshapes${countShape}["Standard Process"]\nshapes${countShape}@{ shape: proc}`},
        {img: Sub_Process, code: `\nshapes${countShape}["Sub Process"]\nshapes${countShape}@{ shape: subproc}`},
        {img: Tagged_Process, code: `\nshapes${countShape}["Tagged Process"]\nshapes${countShape}@{ shape: tag-proc}`},
        {img: Multi_Process, code: `\nshapes${countShape}["Multi Process"]\nshapes${countShape}@{ shape: procs}`},
        {img: Divied_Process, code: `\nshapes${countShape}["Divided Process"]\nshapes${countShape}@{ shape: div-proc}`},
        {
            img: Extractions_Process,
            code: `\nshapes${countShape}["Extraction Process"]\nshapes${countShape}@{ shape: extract}`
        },
        {img: Lined_Process, code: `\nshapes${countShape}["Lined Process"]\nshapes${countShape}@{ shape: lin-proc}`},
        {img: In_Out, code: `\nshapes${countShape}["In Out"]\nshapes${countShape}@{ shape: in-out}`},
        {img: Out_In, code: `\nshapes${countShape}["Out In"]\nshapes${countShape}@{ shape: out-in}`},
        {
            img: Manual_File_Action,
            code: `\nshapes${countShape}["Manual File Action"]\nshapes${countShape}@{ shape: manual-file}`
        },
        {
            img: Priority_Action,
            code: `\nshapes${countShape}["Priority Action"]\nshapes${countShape}@{ shape: priority}`
        },
        {img: Collate_Action, code: `\nshapes${countShape}["Collate Action"]\nshapes${countShape}@{ shape: collate}`},
        {img: Loop_Limit, code: `\nshapes${countShape}["Loop Limit"]\nshapes${countShape}@{ shape: loop-limit}`},
        {img: Manual_Input, code: `\nshapes${countShape}["Manual Input"]\nshapes${countShape}@{ shape: manual-input}`},
        {img: Event, code: `\nshapes${countShape}["Event"]\nshapes${countShape}@{ shape: event}`},
        {img: Start, code: `\nshapes${countShape}["Start"]\nshapes${countShape}@{ shape: start}`},
        {img: Stop, code: `\nshapes${countShape}["Stop"]\nshapes${countShape}@{ shape: stop}`},
        {img: Fork_Join, code: `\nshapes${countShape}["Fork/Join"]\nshapes${countShape}@{ shape: fork}`},
        {img: Terminal, code: `\nshapes${countShape}["Terminal"]\nshapes${countShape}@{ shape: terminal}`},
        {img: Delay, code: `\nshapes${countShape}["Delay"]\nshapes${countShape}@{ shape: delay}`},
        {img: Junction, code: `\nshapes${countShape}["Junction"]\nshapes${countShape}@{ shape: junction}`},
        {img: Decision, code: `\nshapes${countShape}["Decision"]\nshapes${countShape}@{ shape: decision}`},
        {img: Document, code: `\nshapes${countShape}["Document"]\nshapes${countShape}@{ shape: doc}`},
        {img: Tagged_Document, code: `\nshapes${countShape}["Tagged Document"]\nshapes${countShape}@{ shape: tag-doc}`},
        {
            img: Multiple_Document,
            code: `\nshapes${countShape}["Multiple Documents"]\nshapes${countShape}@{ shape: docs}`
        },
        {img: Lined_Document, code: `\nshapes${countShape}["Lined Document"]\nshapes${countShape}@{ shape: lin-doc}`},
        {img: Comment, code: `\nshapes${countShape}["Comment"]\nshapes${countShape}@{ shape: comment}`},
        {img: Comment_Right, code: `\nshapes${countShape}["Comment Right"]\nshapes${countShape}@{ shape: brace-r}`},
        {img: Braces, code: `\nshapes${countShape}["Braces"]\nshapes${countShape}@{ shape: braces}`},
        {img: Summary, code: `\nshapes${countShape}["Summary"]\nshapes${countShape}@{ shape: summary}`},

    ];
    const TechnicalShapes = [
        {
            img: Database,
            code: `\n shapes${countShape}["Database"]\n shapes${countShape}@{ shape: db}`
        },
        {
            img: Disk_Storage,
            code: `\n shapes${countShape}["Disk Storage"]\n shapes${countShape}@{ shape: disk}`
        },
        {
            img: Direct_Access_Storage,
            code: `\n shapes${countShape}["Direct Access Storage"]\n shapes${countShape}@{ shape: das}`
        },
        {
            img: Internal_Storage,
            code: `\n shapes${countShape}["Internal Storage"]\n shapes${countShape}@{ shape: internal-storage}`
        },
        {
            img: Display,
            code: `\n shapes${countShape}["Display"]\n shapes${countShape}@{ shape: display}`
        },
        {
            img: Stored_Data,
            code: `\n shapes${countShape}["Stored Data"]\n shapes${countShape}@{ shape: stored-data}`
        },
        {
            img: Communication_Link,
            code: `\n shapes${countShape}["Communication Link"]\n shapes${countShape}@{ shape: com-link}`
        },
        {
            img: Paper_Tape,
            code: `\n shapes${countShape}["Paper Tape"]\n shapes${countShape}@{ shape: paper-tape}`
        }
    ]


    return (
        <Box
            sx={{
                height: "100%",
                borderRadius: 1,
                overflow: "hidden",
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    height: 48,
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    alignItems: "center",
                    px: 1,
                    position: "absolute",
                    top: 10,
                    right: 10,
                    border: `2px solid ${theme.palette.bgGray}`,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                    }}
                >
                    <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                        <IconButton
                            onClick={togglePanZoom}
                            sx={{
                                backgroundColor: panZoom
                                    ? theme.palette.action.hover
                                    : "transparent",
                            }}
                        >
                            <IoMdMove/>
                        </IconButton>
                        <IconButton><FullScreen/></IconButton>
                        <IconButton onClick={handleFontSizeMenuOpen}>
                            <MdTextFields/>
                        </IconButton>
                        {/*Font size*/}
                        <Menu
                            anchorEl={anchorElFontSize}
                            open={Boolean(anchorElFontSize)}
                            onClose={handleFontSizeMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            {["MD", "LG", "XL", "XXL"].map((size) => (
                                <MenuItem key={size} onClick={() => handleFontSizeChange(size)}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    p: 1,
                    bgcolor: "#f9f9f9",
                    boxShadow: 3,
                    transition: "all 0.3s ease-in-out",
                    width: "50px",
                    top: 80,
                    left: 10,
                }}
            >
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Tooltip title={expanded ? "Collapse" : "Expand"}>
                        <IconButton
                            onClick={toggleCollapse}
                            sx={{
                                backgroundColor: activeButton === "collapse" ? "sidebarHover" : "white",
                                color: activeButton === "collapse" ? "white" : "black",
                                borderRadius: 1,
                                p: 0.5,
                                "&:hover": {
                                    backgroundColor: "#FF348033",

                                },
                            }}
                        >
                            {expanded ? <ExpandLess/> : <ExpandMore/>}
                        </IconButton>
                    </Tooltip>
                </Box>

                {/*other property*/}
                <Collapse in={expanded}>
                    <Box sx={{display: "flex", flexDirection: "column", gap: 1, mt: 1}}>
                        {[
                            ...(code?.startsWith('flowchart')
                                ? [{
                                    key: "shapes",
                                    icon: <AddIcon/>,
                                    tooltip: "Shapes",
                                }]
                                : []),
                            {key: "addSubChart", icon: <AddToPhotosIcon/>, tooltip: "Add Sub Chart"},
                            // {key: "launchRocket", icon: <RocketLaunchIcon/>, tooltip: "Launch Rocket"},
                            {key: "addImage", icon: <ImageIcon/>, tooltip: "Add Image"},
                            {key: "brushTool", icon: <BrushIcon/>, tooltip: "Brush Tool"},
                        ].map(({key, icon, tooltip, onClick}) => (
                            <Tooltip key={key} title={tooltip}>
                                <IconButton
                                    onClick={(event) => handleButtonClick(event, key)}
                                    sx={{
                                        px: 2,
                                        py: 0.5,
                                        backgroundColor: activeButton === key ? "sidebarHover" : "white",
                                        color: activeButton === key ? "white" : "black",
                                        "&:hover": {backgroundColor: "#FF348033"},
                                        borderRadius: 1,
                                    }}
                                >
                                    {icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Box>
                </Collapse>
                {/*background color chart*/}
                <Popover
                    open={Boolean(designAnchor)}
                    anchorEl={designAnchor}
                    onClose={handleThemeClose}
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                    // transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                    <List sx={{backgroundColor: "#F2F2F3", py: 0.5, px: 0.5, width: "180px"}}>
                        <ListItemButton
                            onClick={(event) => setThemeAnchor(event.currentTarget)}
                            sx={{
                                borderRadius: "10px",
                                py: 0.5,
                                "&:hover": {backgroundColor: "sidebarHover", color: "white"},
                            }}
                        >
                            <ListItemText primary="Themes"/> <KeyboardArrowRightIcon/>
                        </ListItemButton>
                    </List>
                </Popover>

                <Popover
                    open={Boolean(themeAnchor)}
                    anchorEl={themeAnchor}
                    onClose={handleThemeClose}
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    // transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <List sx={{backgroundColor: "#F2F2F3", py: 0.5, px: 0.5, width: "180px"}}>
                        {themes.map((themeItem, index) => (
                            <ListItemButton
                                key={index}
                                onClick={() => {
                                    setColor({
                                        theme: themeItem.color,
                                        image: themeItem.image,
                                        borderColor: themeItem.borderColor,
                                    });
                                    setThemeAnchor(null);
                                    setDesignAnchor(null);
                                }}
                                sx={{
                                    borderRadius: "10px",
                                    py: 0.5,
                                    "&:hover": {backgroundColor: "sidebarHover", color: "white"},
                                }}
                            >
                                <ListItemText primary={themeItem.text}/>
                            </ListItemButton>
                        ))}
                    </List>
                </Popover>
            </Box>

            {/*shapes*/}
            <Box>

                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleShapeClose}
                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    sx={{maxWidth: '450px'}}
                >
                    <Box sx={{p: 2, minWidth: 370, backgroundColor: '#ffeaf1'}}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            TabIndicatorProps={{
                                sx: {
                                    backgroundColor: 'sidebarHover',
                                    height: 3,
                                }
                            }}
                        >
                            <Tab label="Basic"/>
                            <Tab label="Process"/>
                            <Tab label="Technical"/>
                        </Tabs>

                        <Box sx={{mt: 2}}>
                            {tabIndex === 0 &&
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: 1
                                    }}>
                                    {
                                        BasicShapes.map((item, index) => (
                                            <Box key={index + 1}>
                                                <Box
                                                    onClick={() => {
                                                        let connection = '';
                                                        if (countShape > 1) {

                                                            connection = `\nshapes${countShape} --> shapes${countShape - 1}\n`
                                                        }
                                                        setCode(`${code + item.code + connection}`)
                                                        if (typeof window !== "undefined") {
                                                            sessionStorage.setItem("code", `${code + item.code + connection}`);
                                                        }
                                                    }}
                                                    sx={{
                                                        height: 48,
                                                        width: 48,
                                                        backgroundColor: 'white',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderRadius: 2
                                                    }}>
                                                    <img src={item.img.src} alt="icon"/>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            }
                            {tabIndex === 1 && <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 1
                                }}>
                                {
                                    ProcessShapes.map((item, index) => (
                                        <Box key={index + 1}>
                                            <Box
                                                onClick={() => {
                                                    let connection = '';
                                                    if (countShape > 1) {

                                                        connection = `\nshapes${countShape} --> shapes${countShape - 1}\n`
                                                    }
                                                    setCode(`${code + item.code + connection}`)
                                                    if (typeof window !== "undefined") {
                                                        sessionStorage.setItem("code", `${code + item.code + connection}`);
                                                    }
                                                }}
                                                sx={{
                                                    height: 48,
                                                    width: 48,
                                                    backgroundColor: 'white',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 2
                                                }}>
                                                <img src={item.img.src} alt="icon"/>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </Box>}
                            {tabIndex === 2 && <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 1
                                }}>
                                {
                                    TechnicalShapes.map((item, index) => (
                                        <Box key={index + 1}>
                                            <Box
                                                onClick={() => {
                                                    let connection = '';
                                                    if (countShape > 1) {

                                                        connection = `\nshapes${countShape} --> shapes${countShape - 1}\n`
                                                    }
                                                    setCode(`${code + item.code + connection}`)
                                                    if (typeof window !== "undefined") {
                                                        sessionStorage.setItem("code", `${code + item.code + connection}`);
                                                    }
                                                }}
                                                sx={{
                                                    height: 48,
                                                    width: 48,
                                                    backgroundColor: 'white',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 2
                                                }}>
                                                <img src={item.img.src} alt="icon"/>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </Box>}
                        </Box>
                    </Box>
                </Popover>
            </Box>

            {/*images*/}
            <Box>
                <Popover
                    id={id}
                    open={openImageModel}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" gap={3} p={4}>
                        <TextField
                            label="Heading"
                            variant="outlined"
                            name="heading"
                            value={form.heading}
                            onChange={handleChange}
                            sx={{width: 230}}
                        />
                        <TextField
                            label="Image URL"
                            variant="outlined"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            sx={{width: 230}}
                        />

                        <TextField
                            label="Width (px)"
                            type="number"
                            variant="outlined"
                            name="width"
                            value={form.width}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Height (px)"
                            type="number"
                            name="height"
                            variant="outlined"
                            value={form.height}
                            onChange={handleChange}
                        />


                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="secondary"
                                    onClick={() => setOpenImageModel(!openImageModel)}>
                                Close
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => {
                                const a = code.replace(oldCode, '');
                                if (typeof window !== "undefined") {
                                    sessionStorage.setItem("code", `${a}`);
                                }
                                setCode(a);
                                setForm(initialValue)
                                setOpenImageModel(false);
                                // setShowImage(false);
                            }}>
                                Delete
                            </Button>

                            <Button variant="contained" color="primary" onClick={() => {
                                // const newcode = `${code + `\nimgTitle${countImage}[${form.heading}]\n` +
                                // `imgTitle${countImage}@{img: ${form.image}, h: ${form.height}, w: ${form.width}, pos: "b"}\n`
                                // }`;
                                const a = code.replace(oldCode, `\nimgTitle${countImage}[${form.heading}]\n` +
                                    `imgTitle${countImage}@{img: ${form.image}, h: ${form.height}, w: ${form.width}, pos: "b"}\n`)
                                setCode(a);

                                if (typeof window !== "undefined") {
                                    sessionStorage.setItem("code", `${a}`);
                                }
                                setOpenImageModel(!openImageModel);
                                setForm(initialValue)
                            }}>
                                Save
                            </Button>
                        </Stack>
                    </Box>
                </Popover>
            </Box>
            <Box>
                <View fontSizes={fontSize} color={color}/>
            </Box>
        </Box>
    );
};

export default RightContainer;
