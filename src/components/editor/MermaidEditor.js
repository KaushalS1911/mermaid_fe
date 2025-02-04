// components/MermaidEditor.js

"use client";

import MonacoEditor from "@monaco-editor/react";
import initEditor from "monaco-mermaid";
import { useStore } from "@/store";
import {useContext} from "react";
import {ChartContext} from "@/app/layout";

const MermaidEditor = () => {
  // const {code} = useContext(ChartContext)
  const code = useStore((state) => state.code);
  const setCode = useStore((state) => state.setCode);
  const config = useStore((state) => state.config);
  const setConfig = useStore((state) => state.setConfig);
  const editorMode = useStore((state) => state.editorMode);

  const onChange = (value) => { // Removed TypeScript type annotations
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
