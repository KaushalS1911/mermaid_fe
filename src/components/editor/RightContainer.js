import dynamic from "next/dynamic";
import {
    Box,
    IconButton,
    Tooltip,
    Collapse,
    useTheme,
    Popover,
    Typography, Tabs
} from "@mui/material";
import {IoMdMove} from "react-icons/io";
import {MdTextFields} from "react-icons/md";
import {ExpandMore, ExpandLess} from "@mui/icons-material";
import FullScreen from "./FullScreen";
import {useState} from "react";
import {useStore} from "@/store";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ImageIcon from "@mui/icons-material/Image";
import BrushIcon from "@mui/icons-material/Brush";
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

const View = dynamic(() => import("./View"), {ssr: false});

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

    const handleAddPhotosClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const togglePanZoom = () => setPanZoomEnable(!panZoom);

    const toggleCollapse = () => {
        setExpanded(!expanded);
        setActiveButton("collapse");
    };

    const handleButtonClick = (key) => {
        setActiveButton(key);
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
            code: `\n shape${count}["Rectangle"]\n shape${count}@{ shape: rect}\n`
        },
        {
            img: Rounded,
            code: `\n shape${count}["Rounded"] \n shape${count}@{ shape: rounded}`
        }, {
            img: Stadium,
            code: `\n   shape${count}(["Stadium"])`
        }, {
            img: Triangle,
            code: `\n shape${count}["Diamond"] \n shape${count}@{ shape: diam}`
        }, {
            img: Diamond,
            code: `\n shape${count}["Triangle"] \n shape${count}@{ shape: tri}`
        }, {
            img: Hexazone,
            code: `\n   shape${count}["Hexagon"] \n shape${count}@{ shape: hex}`
        }, {
            img: Cylinder,
            code: `\n shape${count}["Cylinder"]\n shape${count}@{ shape: cyl}`
        }, {
            img: Horizontal_Cylinder,
            code: `\n shape${count}["Horizontal Cylinder"] \nshape${count}@{ shape: h-cyl}`
        }, {
            img: Circle,
            code: `\n     shape${count}(("Circle"))`
        }, {
            img: Dubble_Circle,
            code: `\n shape${count}["Double Circle"]\n shape${count}@{ shape: dbl-circ}`
        }, {
            img: Small_Circle,
            code: `\n  shape${count}["Small Circle"] \n shape${count}@{ shape: sm-circ}`
        }, {
            img: Framed_Circle,
            code: `\n shape${count}["Frames Circle"]\n shape${count}@{ shape: fr-circ}`
        }, {
            img: Filled_Circles,
            code: `\n   shape${count}["Filled Circle"] \n shape${count}@{ shape: f-circ}`
        }, {
            img: Parallelogram,
            code: `\n    shape${count}["Parallelogram"] \n shape${count}@{ shape: lean-l}`
        }, {
            img: Parallelogram_Reversed,
            code: `\n  shape${count}["Parallelogram Reversed"] \n shape${count}@{ shape: lean-r}`
        }, {
            img: Trapezoid,
            code: `\n   shape${count}["Trapezoid"] \n shape${count}@{ shape: trap-b}`
        }, {
            img: Trapezoid_Reversed,
            code: `\nshape${count}["Trapezoid Reversed"] \n shape${count}@{ shape: trap-t}`
        }, {
            img: Card,
            code: `\n  shape${count}["Card"]  \n  shape${count}@{ shape: card}`
        }, {
            img: Odd,
            code: `\n shape${count}>"Odd"]`
        }, {
            img: Anchor,
            code: `\n shape${count}["Anchor"] \n shape${count}@{ shape: anchor}`
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
                            {expanded ? <ExpandLess/> : <ExpandMore/>}
                        </IconButton>
                    </Tooltip>
                </Box>

                <Collapse in={expanded}>
                    <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                        {[
                            ...(code?.startsWith('flowchart')
                                ? [{
                                    key: "shapes",
                                    icon: <AddToPhotosIcon/>,
                                    tooltip: "Shapes",
                                    onClick: handleAddPhotosClick,
                                }]
                                : []),
                            {key: "launchRocket", icon: <RocketLaunchIcon/>, tooltip: "Launch Rocket"},
                            {key: "addImage", icon: <ImageIcon/>, tooltip: "Add Image"},
                            {key: "brushTool", icon: <BrushIcon/>, tooltip: "Brush Tool"},
                            {key: "info", icon: <InfoIcon/>, tooltip: "Information"},
                        ].map(({key, icon, tooltip, onClick}) => (
                            <Tooltip key={key} title={tooltip}>
                                <IconButton
                                    onClick={onClick || (() => handleButtonClick(key))}
                                    sx={{
                                        backgroundColor: activeButton === key ? "sidebarHover" : "white",
                                        color: activeButton === key ? "white" : "black",
                                        "&:hover": {
                                            backgroundColor: "#FF348033",
                                        },
                                    }}
                                >
                                    {icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Box>
                </Collapse>
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
                                                        setCount(count + 1)
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
                                                    setCount(count + 1)
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
                                                    setCount(count + 1)
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
                <View viewFontSizeBar={fontSize}/>
            </Box>
        </Box>
    )
        ;
};

export default RightContainer;
