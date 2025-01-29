// "use client";
// import React, {useEffect, useRef, useState} from 'react';
// import {Controlled as CodeMirror} from "react-codemirror2";
// import mermaid from "mermaid";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/markdown/markdown";
// import {Box, Grid, TextField} from "@mui/material";
// import Snippets from "@/components/editor/Snippets";
// function MainEditor({sidebarKey}) {
//     const mermaidCode = `
//     graph TD
//       A[Start] --> B{Decision?}
//       B -->|Yes| C[Do Task]
//
//       B -->|No| D[End]
//   `;
//     const [code, setCode] = useState(mermaidCode);
//     const chartRef = useRef(null);
//     const isInitialRender = useRef(true);
//     useEffect(() => {
//         if (chartRef?.current && code) {
//             try {
//                 mermaid.initialize();
//                 mermaid.contentLoaded();
//             } catch (error) {
//                 console.error("Mermaid rendering error:", error);
//             }
//         }
//     }, [code]);
//     return (
//         <>
//             <Box height={"100%"} minHeight={'100VH'}>
//                 <Grid container>
//                     {sidebarKey === "Snippets" && <Grid item xs={12} md={3}>
//                             <Snippets />
//                     </Grid>}
//                     <Grid item xs={12} md={4}>
//                         <CodeMirror
//                             value={code}
//                             options={{
//                                 mode: "markdown", theme: "material", lineNumbers: true,
//                             }}
//                             onBeforeChange={(editor, data, value) => setCode(value)}
//                             editorDidMount={(editor) => {
//                                 editor.getWrapperElement().style.height = '100vh';
//                                 editor.getWrapperElement().style.overflowY = 'scroll';
//                             }}
//                         />
//                     </Grid>
//                     <Grid item xs={12} md={5} bgcolor={'white'} height={'100vh'} overflowY={"scroll"}>
//                         <div
//                             ref={chartRef}
//                             className="mermaid"
//                             style={{textAlign: "center"}}
//                         >
//                             {code}
//                         </div>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </>
//     );
// }
//
// export default MainEditor;