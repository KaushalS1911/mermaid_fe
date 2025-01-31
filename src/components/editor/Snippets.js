"use client";
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Box, Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Rectangle from '../../asset/editor/snippets/Rectangle.png'
import Rounded from '../../asset/editor/snippets/Rounded.png'
import Stadium from '../../asset/editor/snippets/Stadium.png'
import Subroutine from '../../asset/editor/snippets/Subroutine.png'
import Database from '../../asset/editor/snippets/database.png'
import Decision from '../../asset/editor/snippets/Decision.png'
import Circle from '../../asset/editor/snippets/Circle.png'
import Asymmetric from '../../asset/editor/snippets/Asymmetric.png'
import Parallelogram from '../../asset/editor/snippets/Parallelogram.png'
import ParallelogramReverser from '../../asset/editor/snippets/Reversed.png'
import Trapezoid from '../../asset/editor/snippets/Trapezoid.png'
import TrapezoidReversed from '../../asset/editor/snippets/Trapezoid Reversed.png'
import DoubleCircle from '../../asset/editor/snippets/Double Circle.png'
import Arrow from '../../asset/editor/snippets/Arrow.png'
import ThickArrow from '../../asset/editor/snippets/Thick Arrow.png'
import DashedArrow from '../../asset/editor/snippets/Dashed Arrow.png'
import ArrowWithLabel from '../../asset/editor/snippets/Arrow with Label.png'
import Hexagon from '../../asset/editor/snippets/Hexagon.png'
import file from '../../asset/editor/snippets/file-text.png'
import plus from '../../asset/editor/snippets/plus.png'
import toast from "react-hot-toast";
import {ChartContext} from "@/app/layout";

function Snippets(props) {
    const [isCopied, setIsCopied] = useState(false);
    const [textToCopy, setTextToCopy] = useState('');
    const {code,setCode} = useContext(ChartContext)

    const copyToClipboard = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            toast.success('Copied!');
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy!');
            console.error('Failed to copy:', err);
            setIsCopied(false);
        }
    }, []);

    useEffect(() => {
        if (textToCopy) {
            copyToClipboard(textToCopy);
        }
    }, [textToCopy, copyToClipboard]);
    const data = [{
        mainTitle: "Flowchart Shapes", subData: [{
            title: "Rectangle", img: Rectangle, code: '\nrectId["label"]'
        }, {
            title: "Rounded", img: Rounded, code: '\nroundedId("label")'
        }, {
            title: "Stadium", img: Stadium, code: '\nstadiumId(["label"])'
        }, {
            title: "Subroutine", img: Subroutine, code: '\nsubId[["label"]]'
        }, {
            title: "Database", img: Database, code: '\ndbId[["label"]]'
        }, {
            title: "Decision", img: Decision, code: '\ndecisionId{"label"}'
        }, {
            title: "Circle", img: Circle, code: '\ncircleId(("label"))'
        }, {
            title: "Asymmetric", img: Asymmetric, code: '\nasymmetricId>"label"]'
        }, {
            title: "Hexagon", img: Hexagon, code: '\nhexId{{"label"}}'
        }, {
            title: "Parallelogram", img: Parallelogram, code: '\nparaId[/"label"/]'
        }, {
            title: "Parallelogram Reverser", img: ParallelogramReverser, code: '\nparaRevId[\\"label"\\]'
        }, {
            title: "Trapezoid", img: Trapezoid, code: '\ntrapId[/"label"\\]'
        }, {
            title: "Trapezoid Reversed", img: TrapezoidReversed, code: '\ntrapRevId[\\"label"/]'
        }, {
            title: "DoubleCircle", img: DoubleCircle, code: '\ndoubleCircleId((("label")))'
        },]
    }, {
        mainTitle: "Flowchart Edges", subData: [{
            title: "Arrow", img: Arrow, code: '\n-->'
        }, {
            title: "Thick Arrow", img: ThickArrow, code: '\n==>'
        }, {
            title: "Dashed Arrow", img: DashedArrow, code: '\n-.->'
        }, {
            title: "Arrow with Label", img: ArrowWithLabel, code: '\n-- label -->'
        },]
    }]
    const theme = useTheme()
    return (<>
        <Box sx={{px: 1,py:2}}>
            <Grid container spacing={2}>
                {data.map((item, index) => (<>
                    <Grid item xs={12} key={index}>
                        <Box>{item.mainTitle}</Box>
                    </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"} >
                    {item.subData.map((subItem, index) => (<>
                            <Box key={index} width={90}>
                                <Box fontSize={12} textAlign={"center"} mt={2} height={45}>
                                    {subItem.title}
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: `1px solid ${theme.palette.liteGray}`
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        backgroundColor: 'lightPink',
                                        p: 2,
                                        borderBottom: `1px solid ${theme.palette.liteGray}`
                                    }}>
                                        <img src={subItem.img.src}/>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        p: 1,
                                    }}>
                                        <Box mt={0.2} sx={{cursor: 'pointer'}} onClick={() => {
                                            if (subItem.code) {
                                                setTextToCopy(subItem.code)
                                            }
                                        }}
                                             className="copy-button"
                                             aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}>
                                            <img src={file.src}/>
                                        </Box>
                                        <Box color={'liteGray'}>|</Box>
                                        <Box mt={0.3} sx={{cursor: 'pointer'}}>
                                            <img src={plus.src} onClick={() => setCode(code + subItem.code)}/>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                    </>))}
                        </Grid>
                </>))}
            </Grid>
        </Box>
    </>);
}

export default Snippets;