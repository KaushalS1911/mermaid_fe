"use client";
import React from 'react';
import {Box, Grid} from "@mui/material";
import rectangle from "../../asset/editor/snippets/Rectangle.png"
import {useTheme} from "@mui/material/styles";
import PlusIcon from "../../asset/icons/editor/plus.svg";

function Snippets(props) {
    const theme = useTheme()
    return (
        <>
            <Grid container spacing={2} flexWrap="wrap" padding={2}>
                <Grid item xs={12} md={3}>
                    <Box>
                        <Box mb={1} fontSize={12} textAlign={'center'}>
                            Rectangle
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
                                <img src={rectangle.src}/>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                p: 1
                            }}>
                                <Box>
                                    <PlusIcon width={50} height={50}/>
                                </Box>
                                <Box>|</Box>
                                <Box>sss</Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Snippets;