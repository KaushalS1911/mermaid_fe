"use client";
import React, { useContext, useState } from 'react';
import {
    Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Image from "next/image";
import Upload from "../../asset/dashboard/upload.png"
import {useRouter} from "next/navigation";
import {ChartContext} from "@/app/layout";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";

function Page(props) {
    const [file, setFile] = useState(null);
    const {setCode} = useContext(ChartContext);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            method: "", aiModel: "Gemini", textOrSyntax: "", file: null,
        },
        validationSchema: Yup.object({
            // method: Yup.string().required("Please select a method"),
            // aiModel: Yup.string().required("Please select an AI model"),
            // textOrSyntax: Yup.string().required("This field is required"),
            // file: Yup.mixed().nullable(),
        }),
        onSubmit: async (values) => {
            console.log("Form Data:", values);
            try {
                const formData = new FormData();
                let payload = {};
        
                formData.append("aiModel", values.aiModel);
                payload["aiModel"] = values.aiModel;
        
                if (values.method) {
                    formData.append("selectInputMethod", values.method);
                    payload["selectInputMethod"] = values.method;
        
                    if (values.file) {
                        formData.append("file", values.file);
                        payload["file"] = values.file;
                    }
                } else {
                    formData.append("textOrMermaid", values.textOrSyntax);
                    payload["textOrMermaid"] = values.textOrSyntax;
                }

                const response = await axiosInstance.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/flowchart`,
                    payload,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "huggingToken": process.env.NEXT_PUBLIC_HUGGING_TOKEN,
                        },
                    }
                );

                setCode(response.data.mermaidChart)
                typeof window !== "undefined" && localStorage.setItem("code",response.data.mermaidChart)
                router.push(`/editor`)
                toast.success(response.data.message)
            } catch (error) {
                toast.error('Something went wrong!')
                console.error("Error during API call:", error);
            }
        }
    });

    const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formik;

    return (
        <>
            <Container>
                <Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '32px', fontWeight: '600', color: '#171717', mt: 4 }}> AI Flowchart Generator</Typography>
                        </Grid>
                        <Grid item xs={12} mt={3}>
                            <Box>
                                <form onSubmit={formik.handleSubmit}>
                                    <FormControl
                                        component="fieldset"
                                        sx={{ mb: 3 }}
                                        error={touched.method && Boolean(errors.method)}
                                    >
                                        <Typography variant="body2" sx={{ fontSize: '14px', mt: 2, fontWeight: 600 }}>Select Input Field:</Typography>
                                        <RadioGroup name="method" value={values.method} onChange={handleChange} sx={{ mt: 1 }}>
                                            {['Text/README', 'Voice Recording', 'Upload Audio'].map((option) => (
                                                <FormControlLabel sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                                                    key={option}
                                                    value={option}
                                                    control={<Radio sx={{ '&.Mui-checked': { color: "#FF3480" } }} />}
                                                    label={option}
                                                />))}
                                        </RadioGroup>
                                        {touched.method && errors.method && (
                                            <Typography color="error" variant="body2">
                                                {errors.method}
                                            </Typography>
                                        )}
                                    </FormControl>

                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Typography variant="body2" sx={{ fontSize: "14px", mt: 2, fontWeight: 600 }}>
                                            Select AI Model
                                        </Typography>
                                        <TextField sx={{
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
                                            select
                                            label=""
                                            name="aiModel"
                                            value={values.aiModel}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.aiModel && Boolean(errors.aiModel)}
                                            helperText={touched.aiModel && errors.aiModel}
                                        >
                                            {['Gemini', 'Model 2', 'Model 3'].map((model) => (
                                                <MenuItem key={model} value={model}>
                                                    {model}
                                                </MenuItem>))}
                                        </TextField>
                                    </FormControl>

                                    {
                                        !values.method ? (
                                            <>
                                                <Typography variant="body2" sx={{ fontSize: "14px", mt: 2, fontWeight: 600 }}>
                                                    Enter Text or Mermaid Syntax
                                                </Typography>
                                                <TextField sx={{
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
                                                    name="textOrSyntax"
                                                    value={values.textOrSyntax}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.textOrSyntax && Boolean(errors.textOrSyntax)}
                                                    helperText={touched.textOrSyntax && errors.textOrSyntax}
                                                    multiline
                                                    rows={4}
                                                />
                                            </>
                                        ) : (
                                            <FormControl fullWidth sx={{ mb: 3 }}>
                                                <Typography variant="body1" sx={{ fontSize: '14px', mt: 2, fontWeight: 600 }}>Or upload a README file:</Typography>

                                                <Box textAlign="center" border={1} borderRadius={2} p={3} borderColor="grey.300" sx={{ my: 1 }}
                                                    onDragOver={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    onDrop={(e) => {
                                                        e.preventDefault();
                                                        const file = e.dataTransfer.files[0];
                                                        if (file) {
                                                            setFieldValue('file', file);
                                                        }
                                                    }}>
                                                    <Box>
                                                        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                                                            <Image
                                                                src={Upload}
                                                                alt="Upload Icon"
                                                                width={50}
                                                            />
                                                        </label>

                                                    </Box>
                                                    <Box>
                                                        <Typography sx={{ color: '#000', fontSize: '14px', mt: 1 }}>Drag and drop file here</Typography>
                                                        <Typography sx={{ color: '#95989C', fontSize: '14px', mt: 1 }}>Limit 200MB per file .TXT,MD</Typography>
                                                    </Box>
                                                    <Box>

                                                        <label htmlFor="file-upload">
                                                            <Button variant="contained" component="label" sx={{ mt: 2, textTransform: 'capitalize', color: '#FF3480', border: '1px solid #FF3480', bgcolor: '#fff', boxShadow: 'none', fontSize: '16px' }}>
                                                                Browse Files
                                                                <input
                                                                    id="file"
                                                                    name="file"
                                                                    type="file"
                                                                    accept=".txt,.md,.png,.mp3,.wav,.ogg"
                                                                    hidden
                                                                    onChange={(event) => {
                                                                        const file = event.currentTarget.files[0];
                                                                        setFieldValue('file', file);
                                                                    }}
                                                                />
                                                            </Button>
                                                        </label>
                                                    </Box>
                                                </Box>
                                                {values.file && values.file.type.startsWith('image/') && (
                                                    <Box sx={{ mt: 2, position: 'relative' }}>
                                                        <Box
                                                            component="img"
                                                            src={URL.createObjectURL(values.file)}
                                                            alt="Image Preview"
                                                            sx={{
                                                                maxWidth: 300,
                                                                maxHeight: 200,
                                                                objectFit: 'cover',
                                                                borderRadius: 3,
                                                            }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 5,
                                                                left: 5,
                                                                zIndex: 120,
                                                                cursor: 'pointer',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                                color: 'white',
                                                                borderRadius: '50%',
                                                            }}
                                                            onClick={() => setFieldValue('file', null)}
                                                        >
                                                            {file && <Typography mt={1}>{file.name}</Typography>}
                                                            <CloseIcon
                                                                sx={{
                                                                    color: 'white',
                                                                    padding: 1,
                                                                }}
                                                            />

                                                        </Box>
                                                    </Box>
                                                )}
                                                {values.file && (
                                                    <Box display="flex" alignItems="center" mt={2}>
                                                        <Typography sx={{ fontSize: "14px", color: "#000" }}>
                                                            Selected File: {values.file.name}
                                                        </Typography>
                                                    </Box>
                                                )}

                                                {touched.file && errors.file && (<Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                                    {errors.file}
                                                </Typography>)}
                                            </FormControl>
                                        )
                                    }

                                    <Box display={"flex"} justifyContent={"flex-end"}>
                                        <Button type="submit" variant="contained" color="primary" sx={{ my: 2, textTransform: 'capitalize', color: '#FF3480', border: '1px solid #FF3480', bgcolor: '#fff', boxShadow: 'none', fontSize: '16px' }}>
                                            Submit
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}   
export default Page;
