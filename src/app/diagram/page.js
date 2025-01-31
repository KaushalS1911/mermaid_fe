"use client";
import React, {useContext, useRef, useState} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    IconButton,
    Stack, Card, CardContent,
    TextField,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Image from "next/image";
import Upload from "../../asset/dashboard/upload.png"
import {useRouter} from "next/navigation";
import { ReactMic } from "react-mic";
import {ChartContext} from "@/app/layout";
import toast from "react-hot-toast";
import { Mic, Stop } from "@mui/icons-material";
import axiosInstance from "@/utils/axiosInstance";
import FullScreenLoader from "@/utils/fullScreenLoader";
import {useStore} from "@/store";

function Page() {
    const [file, setFile] = useState(null);
    // const {setCode} = useContext(ChartContext);
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const setCode = useStore.use.setCode();

    const handleAudioStop = (recordedData) => {
        const audioBlob = recordedData.blob;
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setAudioBlob(audioBlob);
    };

    const handleToggleRecording = () => {
        setIsRecording((prev) => !prev);
    };

    const validation = Yup.object({
        method: Yup.string().required("Please select a method"),

        aiModel: Yup.string().required("This field is required"),
        title: Yup.string().required("This field is required"),

        textOrSyntax: Yup.mixed().nullable().when('method',{
            is: (val) => val.length !== 0,
                then: (schema) => schema.required("Please select a file"),
            otherwise: (schema) => schema.notRequired(),
    }),

        file: Yup.mixed().nullable().when("method", {
            is: (val) => val.length === 0,
            then: (schema) => schema.required("Please select a file"),
            otherwise: (schema) => schema.notRequired(),
        }),
    });


    const formik = useFormik({
        initialValues: {
            method: "",
            aiModel: "Gemini",
            textOrSyntax: "",
            file: null,
            title: "",
        },
        validationSchema: validation, // ✅ Use the external validation schema
        validateOnChange: true,  // ✅ Validate when fields change
        validateOnBlur: true,    // ✅ Validate when fields lose focus
        onSubmit: async (values) => {
            console.log("Form submitted with values:", values); // Debugging
            setLoading(true);
            try {
                const formData = new FormData();
                let payload = {};

                formData.append("aiModel", values.aiModel);
                payload["aiModel"] = values.aiModel;
                formData.append("title", values.title);
                payload["title"] = values.title;

                if (values.method) {
                    formData.append("selectInputMethod", values.method);
                    payload["selectInputMethod"] = values.method;
                    if (values.method === "Voice Recording" && audioBlob) {
                        formData.append("file", audioBlob);
                        payload["file"] = audioBlob;
                    } else if (values.file) {
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

                setCode(response.data.mermaidChart);
                typeof window !== "undefined" && localStorage.setItem("code", response.data.mermaidChart);
                router.push(`/editor`);
                toast.success(response.data.message);
            } catch (error) {
                toast.error("Something went wrong!");
                console.error("Error during API call:", error);
            } finally {
                setLoading(false);
            }
        }
    });



    const {values, errors, touched, handleChange, handleBlur, setFieldValue} = formik;

    if(loading){
        return (
            <FullScreenLoader  />
        )
    }

    return (
        <Box bgcolor={'#fff'}>
            <Container>
                <Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography sx={{fontSize: '32px', fontWeight: '600', color: '#171717', mt: 4}}> AI
                                Flowchart Generator</Typography>
                        </Grid>
                        <Grid item xs={12} mt={3}>
                            <Box>
                                <form onSubmit={formik.handleSubmit}>
                                    <FormControl
                                        component="fieldset"
                                        sx={{ mb: 3 }}
                                        error={touched.method && Boolean(errors.method)}
                                    >
                                        <Typography variant="body2" sx={{ fontSize: '14px', mt: 2, fontWeight: 600 }}>
                                            Select Input Field:
                                        </Typography>
                                        <RadioGroup name="method" value={values.method} onChange={handleChange} sx={{ mt: 1 }}>
                                            {['Text/README', 'Voice Recording', 'Upload Audio'].map((option,index) => (
                                                <FormControlLabel
                                                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                                                    key={index}
                                                    value={option}
                                                    control={<Radio sx={{ '&.Mui-checked': { color: "#FF3480" } }} />}
                                                    label={option}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>

                                    <Typography variant="body2"
                                                sx={{fontSize: "14px", mt: 2, fontWeight: 600}}>
                                        Enter Title
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
                                               name="title"
                                               value={values.title}
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               error={touched.title && Boolean(errors.title)}
                                               helperText={touched.title && errors.title}
                                               multiline
                                    />

                                    <FormControl fullWidth sx={{mb: 3}}>
                                        <Typography variant="body2" sx={{fontSize: "14px", mt: 2, fontWeight: 600}}>
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
                                            {['Gemini'].map((model,index) => (
                                                <MenuItem key={index} value={model}>
                                                    {model}
                                                </MenuItem>))}
                                        </TextField>
                                    </FormControl>
                                    {
                                        !values.method ? (
                                            <>
                                                <Typography variant="body2"
                                                            sx={{fontSize: "14px", mt: 2, fontWeight: 600}}>
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
                                            <>
                                                {values.method === 'Voice Recording' ? (
                                                    <Stack spacing={2} sx={{ mt: 3, p: 2, maxWidth: 400 }}>
                                                        {/* Title */}
                                                        <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: 600 }}>
                                                            Audio Recorder:
                                                        </Typography>

                                                        {/* Recorder & Mic Button in a Row */}
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <ReactMic
                                                                record={isRecording}
                                                                onStop={handleAudioStop}
                                                                mimeType="audio/webm"
                                                                className="audio-recorder"
                                                                visualSetting="sinewave"
                                                                strokeColor="#3f51b5"
                                                                backgroundColor="#e3f2fd"
                                                                style={{ borderRadius: 8, flexGrow: 1 }}
                                                            />

                                                            <IconButton
                                                                onClick={handleToggleRecording}
                                                                color={isRecording ? "secondary" : "primary"}
                                                                sx={{
                                                                    bgcolor: isRecording ? "#ffebee" : "#e3f2fd",
                                                                    p: 2,
                                                                    borderRadius: "50%",
                                                                    transition: "0.3s",
                                                                    "&:hover": { bgcolor: isRecording ? "#ffcdd2" : "#bbdefb" },
                                                                }}
                                                            >
                                                                {isRecording ? <Stop fontSize="medium" /> : <Mic fontSize="medium" />}
                                                            </IconButton>
                                                        </Stack>

                                                        {/* Audio Playback */}
                                                        {audioURL && (
                                                            <audio
                                                                src={audioURL}
                                                                controls
                                                                style={{ width: "100%", marginTop: 8, borderRadius: 8, outline: "none" }}
                                                            />
                                                        )}
                                                    </Stack>
                                                ) : (
                                                    <FormControl fullWidth sx={{mb: 3}}>
                                                        <Typography variant="body1"
                                                                    sx={{fontSize: '14px', mt: 2, fontWeight: 600}}>Or upload a
                                                            README file:</Typography>

                                                        <Box textAlign="center" border={1} borderRadius={2} p={3}
                                                             borderColor="grey.300" sx={{my: 1}}
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
                                                                <label htmlFor="file-upload" style={{cursor: "pointer"}}>
                                                                    <Image
                                                                        src={Upload}
                                                                        alt="Upload Icon"
                                                                        width={50}
                                                                    />
                                                                </label>

                                                            </Box>
                                                            <Box>
                                                                <Typography sx={{color: '#000', fontSize: '14px', mt: 1}}>Drag
                                                                    and drop file here</Typography>
                                                                <Typography sx={{color: '#95989C', fontSize: '14px', mt: 1}}>Limit
                                                                    200MB per file .TXT,MD</Typography>
                                                            </Box>
                                                            <Box>

                                                                <label htmlFor="file-upload">
                                                                    <Button variant="contained" component="label" sx={{
                                                                        mt: 2,
                                                                        textTransform: 'capitalize',
                                                                        color: '#FF3480',
                                                                        border: '1px solid #FF3480',
                                                                        bgcolor: '#fff',
                                                                        boxShadow: 'none',
                                                                        fontSize: '16px'
                                                                    }}>
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
                                                            <Box sx={{mt: 2, position: 'relative'}}>
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
                                                                <Typography sx={{fontSize: "14px", color: "#000"}}>
                                                                    Selected File: {values.file.name}
                                                                </Typography>
                                                            </Box>
                                                        )}

                                                        {touched.file && errors.file && (
                                                            <Typography color="error" variant="body2" sx={{mt: 1}}>
                                                                {errors.file}
                                                            </Typography>)}
                                                    </FormControl>
                                                )}
                                            </>

                                        )
                                    }

                                    <Box display={"flex"} justifyContent={"flex-end"}>
                                        <Button type="submit" variant="contained" color="primary" sx={{
                                            my: 2,
                                            textTransform: 'capitalize',
                                            color: '#FF3480',
                                            border: '1px solid #FF3480',
                                            bgcolor: '#fff',
                                            boxShadow: 'none',
                                            fontSize: '16px'
                                        }}>
                                            Submit
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default Page;
