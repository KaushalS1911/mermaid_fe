"use client"

import { useState } from "react";
import { Container, Typography, RadioGroup, FormControlLabel, Radio, TextField, Button, Box } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import Image from "next/image";
import Upload from "../../asset/dashboard/upload.png"

export default function FlowchartPage() {
    const [inputType, setInputType] = useState("");
    const [file, setFile] = useState(null);
    const [aiMethod, setAiMethod] = useState("");
    const [textInput, setTextInput] = useState("");

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box display={'flex'} alignItems={'center'}>
                <Typography  sx={{ fontSize: '32px', fontWeight: '600', color: '#171717' }}>
                    AI Flowchart Generator
                </Typography>
                <LinkIcon fontSize="medium" sx={{ml:4, color:'#FF3480'}} />
            </Box>

            <Box>
                <Typography variant="subtitle1" sx={{ fontSize: '14px',mt:2, fontWeight: 600 }}>Select Input Field:</Typography>
                <RadioGroup
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                >
                    <FormControlLabel value="text" control={<Radio sx={{ '&.Mui-checked': { color: "#FF3480" } }} />} label="Text / README" sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }} />
                    <FormControlLabel value="voice" control={<Radio sx={{ '&.Mui-checked': { color: "#FF3480" } }} />} label="Voice Recording" sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }} />
                    <FormControlLabel value="audio" control={<Radio sx={{ '&.Mui-checked': { color: "#FF3480" } }} />} label="Upload Audio" sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }} />
                </RadioGroup>
            </Box>

            <Box>
                <Typography variant="subtitle1" sx={{ fontSize: "14px", mt: 2, fontWeight: 600 }}>
                    Select AI Method:
                </Typography>
                <TextField
                    sx={{
                        mt: 1,
                        "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                                borderColor: "#FF3480 !important",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#FF3480 !important",
                            }
                        },
                        "& .MuiInputLabel-root": {
                            "&.Mui-focused": {
                                color: "#FF3480",
                            },
                            "&:hover": {
                                color: "#FF3480",
                            }
                        }
                    }}
                    label="Gemini"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={aiMethod}
                    onChange={(e) => setAiMethod(e.target.value)}
                />


                <Typography variant="subtitle1" sx={{ fontSize: "14px", mt: 2, fontWeight: 600 }}>
                    Enter Text or Mermaid Syntax:
                </Typography>
                <TextField
                    sx={{
                        mt: 1,
                        "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                                borderColor: "#FF3480 !important",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#FF3480 !important",
                            }
                        },
                        "& .MuiInputLabel-root": {
                            "&.Mui-focused": {
                                color: "#FF3480",
                            },
                            "&:hover": {
                                color: "#FF3480",
                            }
                        }
                    }}
                    fullWidth
                    label="Gemini"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
            </Box>

            <Box>
                <Typography variant="body1" sx={{ fontSize: '14px', mt: 2, fontWeight: 600 }}>Or upload a README file:</Typography>
                <Box textAlign="center" border={1} borderRadius={2} p={3} borderColor="grey.300" sx={{ my: 1 }}>
                    {/* Wrap Image inside Label to make it clickable */}
                    <Box>
                        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                            <Image
                                src={Upload}
                                alt="Upload Icon"
                                width={50}
                            />
                        </label>
                        <input
                            accept=".txt,.md,.png,.mp3,.wav,.ogg"
                            style={{ display: "none" }}
                            id="file-upload"
                            type="file"
                            onChange={handleFileUpload}
                        />
                        {file && <Typography mt={1}>{file.name}</Typography>}
                    </Box>
                    <Box>
                        <Typography sx={{ color: '#000', fontSize: '14px', mt: 1 }}>Drag and drop file here</Typography>
                        <Typography sx={{ color: '#95989C', fontSize: '14px', mt: 1 }}>Limit 200MB per file .TXT,MD</Typography>
                    </Box>
                    <Box>

                        <label htmlFor="file-upload">
                            <Button variant="contained" component="span" sx={{ mt: 2, textTransform: 'capitalize', color: '#FF3480', border: '1px solid #FF3480', bgcolor: '#fff', boxShadow: 'none', fontSize: '16px' }}>
                                Browse Files
                            </Button>
                        </label>
                    </Box>
                </Box>

            </Box>
        </Container>
    );
}
