"use client";
import React, {useContext} from 'react';
import {
    Box, Button, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import axios from 'axios';
import {useRouter} from "next/navigation";
import {ChartContext} from "@/app/layout";
import toast from "react-hot-toast";

function Page(props) {
    const {setCode} = useContext(ChartContext);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            method: "", aiModel: "Gemini", textOrSyntax: "", file: null,
        },
        validationSchema: Yup.object({
            method: Yup.string().required("Please select a method"),
            aiModel: Yup.string().required("Please select an AI model"),
            textOrSyntax: Yup.string()
                .required("This field is required")
                .min(10, "Must be at least 10 characters"),
            file: Yup.mixed().nullable(),
        }),
        onSubmit: async (values) => {
            console.log("Form Data:", values);
            try {
                const formData = new FormData();
                formData.append("selectInputMethod", values.method);
                formData.append("aiModel", values.aiModel);
                formData.append("textOrMermaid", values.textOrSyntax);
                if (values.file) {
                    formData.append("file", values.file);
                }

                // Replace the URL with your actual API endpoint
                const response = await axios.post('http://localhost:8080/api/flowchart', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'huggingToken': process.env.NEXT_PUBLIC_HUGGING_TOKEN
                        // Add authorization token or other headers if needed
                    },
                    withCredentials: true, // Include cookies in the request
                });
                console.log(response.data.mermaidChart,"chart")
                setCode(response.data.mermaidChart)
                typeof window !== "undefined" && localStorage.setItem("code",response.data.mermaidChart)
                router.push(`/editor`)
                // Handle the response here
                toast.success(response.data.message)
                console.log("API Response:", response.data);
            } catch (error) {
                toast.error('Something went wrong!')
                console.error("Error during API call:", error);
            }
        },
    });

    const {values, errors, touched, handleChange, handleBlur, setFieldValue} = formik;
    return (
        <>
            <Box p={4} bgcolor={"#f1f1f1"} minHeight="100vh" height={"100%"}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography component={'h1'} sx={{fontSize: 32, fontWeight: "bold"}}>AI Flowchart Generator</Typography>
                    </Grid>
                    <Grid item xs={12} mt={5}>
                        <Box
                            sx={{
                                maxWidth: "100%",
                                mx: "auto",
                                p: 3,
                                backgroundColor: "#f9f9f9",
                                borderRadius: 2,
                                boxShadow: 2,
                            }}
                        >
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl
                                    component="fieldset"
                                    sx={{mb: 3}}
                                    error={touched.method && Boolean(errors.method)}
                                >
                                    <Typography variant="body2" sx={{mb: 1, fontWeight: 'bold'}}>
                                        Select Input Method
                                    </Typography>
                                    <RadioGroup name="method" value={values.method} onChange={handleChange}>
                                        {['Tex/README', 'Voice Recording', 'Upload Audio'].map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio/>}
                                                label={option}
                                            />))}
                                    </RadioGroup>
                                    {touched.method && errors.method && (
                                        <Typography color="error" variant="body2">
                                            {errors.method}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl fullWidth sx={{mb: 3}}>
                                    <Typography variant="body2" sx={{mb: 1, fontWeight: 'bold'}}>
                                        Select AI Model
                                    </Typography>
                                    <TextField
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

                                <Typography variant="body2" sx={{mb: 1, fontWeight: 'bold'}}>
                                    Enter Text or Mermaid Syntax
                                </Typography>
                                <TextField
                                    fullWidth
                                    label=""
                                    name="textOrSyntax"
                                    value={values.textOrSyntax}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.textOrSyntax && Boolean(errors.textOrSyntax)}
                                    helperText={touched.textOrSyntax && errors.textOrSyntax}
                                    multiline
                                    rows={4}
                                    sx={{mb: 3}}
                                />

                                <FormControl fullWidth sx={{mb: 3}}>
                                    <Typography variant="body2" sx={{mb: 1, fontWeight: 'bold'}}>
                                        Upload a README File (or Image Preview)
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            border: '1px dashed #ccc',
                                            borderRadius: 2,
                                            p: 2,
                                            textAlign: 'center',
                                            position: 'relative',
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const file = e.dataTransfer.files[0];
                                            if (file) {
                                                setFieldValue('file', file);
                                            }
                                        }}
                                    >
                                        <Box>
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <CloudUploadOutlinedIcon sx={{fontSize: 33, marginRight: 1}}/>
                                                <Box>
                                                    <Typography sx={{fontSize: 20, fontWeight: 700,textAlign: 'start'}}>Drag and drop file
                                                        here</Typography>
                                                    <Typography sx={{fontSize: 12, textAlign: 'start'}}>
                                                        Limit 200MB per file. TXT, MD, or Image formats.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            sx={{
                                                fontWeight: 'bold', textTransform: 'none', borderRadius: 2, px: 3,
                                            }}
                                        >
                                            Choose File
                                            <input
                                                id="file"
                                                name="file"
                                                type="file"
                                                // accept=".txt, .md, image/*"
                                                hidden
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setFieldValue('file', file);
                                                }}
                                            />
                                        </Button>
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
                                                <CloseIcon
                                                    sx={{
                                                        color: 'white',
                                                        padding: 1,
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    )}

                                    {touched.file && errors.file && (<Typography color="error" variant="body2" sx={{mt: 1}}>
                                        {errors.file}
                                    </Typography>)}
                                </FormControl>

                                <Box display={"flex"} justifyContent={"flex-end"}>
                                    <Button type="submit" variant="contained" color="primary" sx={{
                                        fontWeight: 'bold', textTransform: 'none',
                                    }}>
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Page;
