"use client"
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Container } from "@mui/material";


function Faq() {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const faqData = [
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
            defaultExpanded: true,
        },
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
            defaultExpanded: false,
        },
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
            defaultExpanded: false,
        },
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
            defaultExpanded: false,
        },
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
            defaultExpanded: false,
        },
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
            defaultExpanded: false,
        },
    ];

    return (
        <Box sx={{backgroundColor:"#F6F6F6" , py:15}}>
            <Container maxWidth="lg">
                <Box sx={{color:"#212121" , fontSize:{xs:"24px" , sm:"35px" , md:"56px"} , fontWeight:800 , textAlign:"center" , mb:10}}>Frequently Asked Questions</Box>
                {faqData.map((faq, index) => (
                    <Accordion
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                        key={index}
                        disableGutters
                        sx={{
                            boxShadow: 'none',
                            backgroundColor: "transparent",
                            "&.Mui-expanded": {
                                mb: 1,
                                boxShadow: 'none',
                            },
                            "& .MuiAccordionSummary-root.Mui-expanded": {
                                backgroundColor: "transparent",
                                borderBottom: "1px solid #c4cdd5",
                                padding: "0",
                            },
                            "& .MuiAccordionSummary-root": {
                                transition: "none",
                                padding: "0",
                                borderBottom: "1px solid #c4cdd5",
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            sx={{
                                "& .MuiTypography-root": {
                                    fontWeight: "bold",
                                },
                            }}
                        >
                            <Typography component="span">{faq.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: "16px 0 8px 0",  }}>
                            <Typography>{faq.content}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Container>
        </Box>
    );
}

export default Faq;
