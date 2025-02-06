"use client";

import MonacoEditor from "@monaco-editor/react";
import initEditor from "monaco-mermaid";
import {useStore} from "@/store";
import {useState, useEffect} from "react";
import {Box, Button} from "@mui/material";
import axios from "axios";
import {useParams} from "next/navigation";
import axiosInstance from "@/utils/axiosInstance"; // Import Axios

const MermaidEditor = () => {
    const code = useStore((state) => state.code);
    const setCode = useStore((state) => state.setCode);
    const config = useStore((state) => state.config);
    const setConfig = useStore((state) => state.setConfig);
    const editorMode = useStore((state) => state.editorMode);
    const [isModified, setIsModified] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        setIsModified(false); // Reset modification flag when the code updates from store
    }, [code]);

    const onChange = (value) => {
        if (editorMode === "code") {
            setCode(value);
            if (typeof window !== "undefined") {
                sessionStorage.setItem("code", value);
            }
        } else {
            setConfig(value);
        }
        setIsModified(true);

    };


    // if (id) {
    const handleSave = async () => {
        try {

            const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BASE_URL}/flowchart/${id}`, {mermaidString: code});
            if (response.status === 200) {
                setIsModified(false);
                alert("Saved successfully!");
            } else {
                alert("Failed to save");
            }
        } catch (error) {
            console.error("Error saving:", error);
            alert("Error occurred while saving");
        }
    };
    // }

    return (
        <Box sx={{position: "relative", height: "100%"}}>
            {id && <Button
                sx={{
                    zIndex: 999,
                    position: "absolute",
                    top: "90%",
                    right: "2%",
                    backgroundColor: "#FF3480",
                    color: "#fff",
                }}
                onClick={handleSave}
            >
                Save
            </Button>}
            <MonacoEditor
                height="calc(100% - 50px)"
                width="100%"
                language="mermaid"
                value={code}
                onChange={onChange}
                options={{minimap: {enabled: false}}}
                onMount={(editor, monaco) => {
                    try {
                        initEditor(monaco);
                    } catch (error) {
                        console.error("Error initializing Monaco editor:", error);
                    }
                }}
            />
        </Box>
    );
};

export default MermaidEditor;
