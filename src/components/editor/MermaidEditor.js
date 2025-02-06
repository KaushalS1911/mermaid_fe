"use client";

import MonacoEditor from "@monaco-editor/react";
import initEditor from "monaco-mermaid";
import { useStore } from "@/store";
import { useContext, useEffect } from "react";
import mermaid from "mermaid";

const MermaidEditor = () => {
  const code = useStore((state) => state.code);
  const setCode = useStore((state) => state.setCode);
  const config = useStore((state) => state.config);
  const setConfig = useStore((state) => state.setConfig);
  const editorMode = useStore((state) => state.editorMode);

  const onChange = (value) => {
    if (editorMode === "code") {
      setCode(value);
      typeof window !== "undefined" && sessionStorage.setItem("code", value);
    } else {
      setConfig(value);
    }
  };

  const onMount = (editor, monaco) => {
    try {
      initEditor(monaco);
    } catch (error) {
      console.error("Error initializing Monaco editor:", error);
    }
  };

  // Apply custom styles for node colors and connection lines
  useEffect(() => {
    if (typeof window !== "undefined") {
      mermaid.initialize({
        theme: "default",
        themeVariables: {
          primaryColor: "#AC5C1C", // Node color
          edgeStroke: "#AC5C1C", // Line color
          primaryTextColor: "#FFFFFF",
          nodeBorder: "#333333",
        },
      });
    }
  }, [code]);

  return (
      <MonacoEditor
          height="100%"
          width={"100%"}
          language={"mermaid"}
          value={code}
          onChange={onChange}
          options={{
            minimap: {
              enabled: false,
            },
          }}
          onMount={onMount}
      />
  );
};

export default MermaidEditor;
