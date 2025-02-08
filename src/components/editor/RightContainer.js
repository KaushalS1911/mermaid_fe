import dynamic from "next/dynamic";
import {
    Box,
    IconButton,
    Tooltip,
    Collapse,
    useTheme, Popover, List, ListItemButton, ListItemText,Typography, Tabs
} from "@mui/material";
import { IoMdMove } from "react-icons/io";
import { MdTextFields } from "react-icons/md"; // Font size icon
import { ExpandMore, ExpandLess } from "@mui/icons-material"; // Collapse Icons
import FullScreen from "./FullScreen";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {useContext, useEffect, useState} from "react";
import { useStore } from "@/store";
import AddIcon from '@mui/icons-material/Add';
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ImageIcon from "@mui/icons-material/Image";
import BrushIcon from "@mui/icons-material/Brush";
import { themes } from "@/layout/Sidebar";

import InfoIcon from "@mui/icons-material/Info";
import Tab from "@mui/material/Tab";
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
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
import {ChartContext} from "@/app/layout";


const View = dynamic(() => import("./View"), { ssr: false });

const RightContainer = () => {
    const panZoom = useStore.use.panZoom();
    const setPanZoomEnable = useStore.use.setPanZoomEnable();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [fontSize, setFontSize] = useState("MD");
    const [expanded, setExpanded] = useState(true);
    const [activeButton, setActiveButton] = useState(null);
    const open = Boolean(anchorEl);
    const [tabIndex, setTabIndex] = useState(0);
    const setCode = useStore((state) => state.setCode);
    const code = useStore((state) => state.code);
    const [count, setCount] = useState(0);
    const [countShape, setCountShape] = useState(0);
    const [themeAnchor, setThemeAnchor] = useState(null);

    const [designAnchor, setDesignAnchor] = useState(null);
    const handleThemeClose = () => {
        setThemeAnchor(null);
        setDesignAnchor(null);
    };
    const { color, setColor } = useContext(ChartContext);




    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFontSizeChange = (size) => {
        setFontSize(size);
        setAnchorEl(null);
    };


    const togglePanZoom = () => setPanZoomEnable(!panZoom);

    const toggleCollapse = () => {
        setExpanded(!expanded);
        setActiveButton("collapse");
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


        useEffect(() => {
            const graphDiv = document.querySelector("#graph-div");
            if (graphDiv) {
                const { color: borderColor, width: borderWidth } = getBorderColorAndWidthByTheme(color.theme);
                const nodes = graphDiv.querySelectorAll("rect, path, circle");
                nodes.forEach((node) => {
                    node.style.stroke = borderColor;
                    node.style.strokeWidth = `${borderWidth}px`;
                });
            }
        }, [color.theme]);

    function countOccurrencesByPrefix(text, word, prefixLength = 8) {
        const prefix = word.slice(0, prefixLength);
        const regex = new RegExp(`\\b${prefix}\\w*\\b`, 'gi');
        const matches = text.match(regex);
        setCount(matches ? matches.length + 1 : 1)
    }
    function countOccurrencesByPrefixForShape(text, word, prefixLength = 6) {
        const prefix = word.slice(0, prefixLength);
        const regex = new RegExp(`\\b${prefix}\\w*\\b`, 'gi');
        const matches = text.match(regex);
        setCountShape(matches ? matches.length : 1)
    }

    useEffect(() => {
        if(code){
            countOccurrencesByPrefix(code,'subchart')
            countOccurrencesByPrefixForShape(code,'shapes')
        }
    },[code])

    const handleButtonClick = (event, key) => {
        setActiveButton(key);

        if (key === 'addSubChart') {
            const newCode = `${code + `subgraph s${count}["Untitled subgraph"]\n` +
            `        subchart${count}["Untitled Node"]\n` +
            '  end'} `;

            setCode(newCode);

            if (typeof window !== "undefined") {
                sessionStorage.setItem("code", newCode);
            }
        }

        if (key === 'brushTool') {
            setDesignAnchor(event.currentTarget);
        }    if (key === 'shapes') {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const BasicShapes = [
        {
            img: Rectangle,
            code: `\n shape${countShape}["Rectangle"]\n shape${countShape}@{ shape: rect}\n`
        },
        {
            img: Rounded,
            code: `\n shape${countShape}["Rounded"] \n shape${countShape}@{ shape: rounded}`
        }, {
            img: Stadium,
            code: `\n   shape${countShape}(["Stadium"])`
        }, {
            img: Triangle,
            code: `\n shape${countShape}["Diamond"] \n shape${countShape}@{ shape: diam}`
        }, {
            img: Diamond,
            code: `\n shape${countShape}["Triangle"] \n shape${countShape}@{ shape: tri}`
        }, {
            img: Hexazone,
            code: `\n   shape${countShape}["Hexagon"] \n shape${countShape}@{ shape: hex}`
        }, {
            img: Cylinder,
            code: `\n shape${countShape}["Cylinder"]\n shape${countShape}@{ shape: cyl}`
        }, {
            img: Horizontal_Cylinder,
            code: `\n shape${countShape}["Horizontal Cylinder"] \nshape${countShape}@{ shape: h-cyl}`
        }, {
            img: Circle,
            code: `\n     shape${countShape}(("Circle"))`
        }, {
            img: Dubble_Circle,
            code: `\n shape${countShape}["Double Circle"]\n shape${countShape}@{ shape: dbl-circ}`
        }, {
            img: Small_Circle,
            code: `\n  shape${countShape}["Small Circle"] \n shape${countShape}@{ shape: sm-circ}`
        }, {
            img: Framed_Circle,
            code: `\n shape${countShape}["Frames Circle"]\n shape${countShape}@{ shape: fr-circ}`
        }, {
            img: Filled_Circles,
            code: `\n   shape${countShape}["Filled Circle"] \n shape${countShape}@{ shape: f-circ}`
        }, {
            img: Parallelogram,
            code: `\n    shape${countShape}["Parallelogram"] \n shape${countShape}@{ shape: lean-l}`
        }, {
            img: Parallelogram_Reversed,
            code: `\n  shape${countShape}["Parallelogram Reversed"] \n shape${countShape}@{ shape: lean-r}`
        }, {
            img: Trapezoid,
            code: `\n   shape${countShape}["Trapezoid"] \n shape${countShape}@{ shape: trap-b}`
        }, {
            img: Trapezoid_Reversed,
            code: `\nshape${countShape}["Trapezoid Reversed"] \n shape${countShape}@{ shape: trap-t}`
        }, {
            img: Card,
            code: `\n  shape${countShape}["Card"]  \n  shape${countShape}@{ shape: card}`
        }, {
            img: Odd,
            code: `\n shape${countShape}>"Odd"]`
        }, {
            img: Anchor,
            code: `\n shape${countShape}["Anchor"] \n shape${countShape}@{ shape: anchor}`
        },
    ]
    const ProcessShapes = [
        {img: Standard_Process, code: `\nshape${count}["Standard Process"]\nshape${count}@{ shape: proc}`},
        {img: Sub_Process, code: `\nshape${count}["Sub Process"]\nshape${count}@{ shape: subproc}`},
        {img: Tagged_Process, code: `\nshape${count}["Tagged Process"]\nshape${count}@{ shape: tag-proc}`},
        {img: Multi_Process, code: `\nshape${count}["Multi Process"]\nshape${count}@{ shape: procs}`},
        {img: Divied_Process, code: `\nshape${count}["Divided Process"]\nshape${count}@{ shape: div-proc}`},
        {img: Extractions_Process, code: `\nshape${count}["Extraction Process"]\nshape${count}@{ shape: extract}`},
        {img: Lined_Process, code: `\nshape${count}["Lined Process"]\nshape${count}@{ shape: lin-proc}`},
        {img: In_Out, code: `\nshape${count}["In Out"]\nshape${count}@{ shape: in-out}`},
        {img: Out_In, code: `\nshape${count}["Out In"]\nshape${count}@{ shape: out-in}`},
        {img: Manual_File_Action, code: `\nshape${count}["Manual File Action"]\nshape${count}@{ shape: manual-file}`},
        {img: Priority_Action, code: `\nshape${count}["Priority Action"]\nshape${count}@{ shape: priority}`},
        {img: Collate_Action, code: `\nshape${count}["Collate Action"]\nshape${count}@{ shape: collate}`},
        {img: Loop_Limit, code: `\nshape${count}["Loop Limit"]\nshape${count}@{ shape: loop-limit}`},
        {img: Manual_Input, code: `\nshape${count}["Manual Input"]\nshape${count}@{ shape: manual-input}`},
        {img: Event, code: `\nshape${count}["Event"]\nshape${count}@{ shape: event}`},
        {img: Start, code: `\nshape${count}["Start"]\nshape${count}@{ shape: start}`},
        {img: Stop, code: `\nshape${count}["Stop"]\nshape${count}@{ shape: stop}`},
        {img: Fork_Join, code: `\nshape${count}["Fork/Join"]\nshape${count}@{ shape: fork}`},
        {img: Terminal, code: `\nshape${count}["Terminal"]\nshape${count}@{ shape: terminal}`},
        {img: Delay, code: `\nshape${count}["Delay"]\nshape${count}@{ shape: delay}`},
        {img: Junction, code: `\nshape${count}["Junction"]\nshape${count}@{ shape: junction}`},
        {img: Decision, code: `\nshape${count}["Decision"]\nshape${count}@{ shape: decision}`},
        {img: Document, code: `\nshape${count}["Document"]\nshape${count}@{ shape: doc}`},
        {img: Tagged_Document, code: `\nshape${count}["Tagged Document"]\nshape${count}@{ shape: tag-doc}`},
        {img: Multiple_Document, code: `\nshape${count}["Multiple Documents"]\nshape${count}@{ shape: docs}`},
        {img: Lined_Document, code: `\nshape${count}["Lined Document"]\nshape${count}@{ shape: lin-doc}`},
        {img: Comment, code: `\nshape${count}["Comment"]\nshape${count}@{ shape: comment}`},
        {img: Comment_Right, code: `\nshape${count}["Comment Right"]\nshape${count}@{ shape: brace-r}`},
        {img: Braces, code: `\nshape${count}["Braces"]\nshape${count}@{ shape: braces}`},
        {img: Summary, code: `\nshape${count}["Summary"]\nshape${count}@{ shape: summary}`},

    ];
    const TechnicalShapes = [
        {
            img: Database,
            code: `\n shape${count}["Database"]\n shape${count}@{ shape: db}`
        },
        {
            img: Disk_Storage,
            code: `\n shape${count}["Disk Storage"]\n shape${count}@{ shape: disk}`
        },
        {
            img: Direct_Access_Storage,
            code: `\n shape${count}["Direct Access Storage"]\n shape${count}@{ shape: das}`
        },
        {
            img: Internal_Storage,
            code: `\n shape${count}["Internal Storage"]\n shape${count}@{ shape: internal-storage}`
        },
        {
            img: Display,
            code: `\n shape${count}["Display"]\n shape${count}@{ shape: display}`
        },
        {
            img: Stored_Data,
            code: `\n shape${count}["Stored Data"]\n shape${count}@{ shape: stored-data}`
        },
        {
            img: Communication_Link,
            code: `\n shape${count}["Communication Link"]\n shape${count}@{ shape: com-link}`
        },
        {
            img: Paper_Tape,
            code: `\n shape${count}["Paper Tape"]\n shape${count}@{ shape: paper-tape}`
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
                        <FullScreen/>
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
                    width: "60px",
                    top: 80,
                    left: 10,
                }}
            >
                <Box sx={{display: "flex", justifyContent: "center", mb: 1}}>
                    <Tooltip title={expanded ? "Collapse" : "Expand"}>
                        <IconButton
                            onClick={toggleCollapse}
                            sx={{
                                backgroundColor: activeButton === "collapse" ? "sidebarHover" : "white",
                                color: activeButton === "collapse" ? "white" : "black",
                                "&:hover": {
                                    backgroundColor: "#FF348033",
                                },
                            }}
                        >
                            {expanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Tooltip>
                </Box>

                <Collapse in={expanded}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            {[
                                ...(code.startsWith('flowchart')
                                    ? [{
                                        key: "shapes",
                                        icon: <AddIcon/>,
                                        tooltip: "Shapes",
                                    }]
                                    : []),
                            { key: "addSubChart", icon: <AddToPhotosIcon />, tooltip: "Add Sub Chart" },
                            // { key: "launchRocket", icon: <RocketLaunchIcon />, tooltip: "Launch Rocket" },
                            // { key: "addImage", icon: <ImageIcon />, tooltip: "Add Image" },
                            { key: "brushTool", icon: <BrushIcon />, tooltip: "Brush Tool" },
                        ].map(({ key, icon, tooltip,onClick }) => (
                            <Tooltip key={key} title={tooltip}>
                                <IconButton
                                    onClick={(event) => handleButtonClick(event, key)}  // Pass event explicitly
                                    sx={{
                                        backgroundColor: activeButton === key ? "sidebarHover" : "white",
                                        color: activeButton === key ? "white" : "black",
                                        "&:hover": { backgroundColor: "#FF348033" },
                                    }}
                                >
                                    {icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Box>
                </Collapse>
                <Popover
                    open={Boolean(designAnchor)}
                    anchorEl={designAnchor}
                    onClose={handleThemeClose}
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                    // transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                    <List sx={{ backgroundColor: "#F2F2F3", py: 0.5, px: 0.5, width: "180px" }}>
                        <ListItemButton
                            onClick={(event) => setThemeAnchor(event.currentTarget)}
                            sx={{
                                borderRadius: "10px",
                                py: 0.5,
                                "&:hover": { backgroundColor: "sidebarHover", color: "white" },
                            }}
                        >
                            <ListItemText primary="Themes" /> <KeyboardArrowRightIcon />
                        </ListItemButton>
                    </List>
                </Popover>

                <Popover
                    open={Boolean(themeAnchor)}
                    anchorEl={themeAnchor}
                    onClose={handleThemeClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    // transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <List sx={{ backgroundColor: "#F2F2F3", py: 0.5, px: 0.5, width: "180px" }}>
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
                                    "&:hover": { backgroundColor: "sidebarHover", color: "white" },
                                }}
                            >
                                <ListItemText primary={themeItem.text} />
                            </ListItemButton>
                        ))}
                    </List>
                </Popover>
            </Box>

            <Box>

                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
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
                                                        setCode(`${code + item.code}`)
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
                                                    setCode(`${code + item.code}`)
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
                                                    setCode(`${code + item.code}`)
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
            <Box>
                <View viewFontSizeBar={fontSize} color={color}/>
            </Box>
        </Box>
    );
};

export default RightContainer;
