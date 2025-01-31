// store.js

import {create} from "zustand";
import {persist} from "zustand/middleware";
import {formatJSON} from "./utils/utils";
export const useStateStore = create(
    persist(
        (set) => ({
            code: `flowchart TD
    %% Entry point
    A[User Enters]

    %% Main options
    A ===> B{{Write their own code}}
    A ===> C{{Edit existing code}}
    A ===> D{{Export Mermaid diagrams}}
    A ===> E{{Use AI to generate charts}}

    %% AI Usage Group
    subgraph AI_Usage [Using AI to Generate Charts]
        E1[Enter query] ==> E2[Copy the generated code]
        E2 ==> E3[Directly import in workspace]
    end
    E ===> AI_Usage

    %% Connections for editing and exporting
    B ===> F{{User Editor}}
    C ===> F
    F ==> G[Save Changes]
    F ==> H[Preview Diagram]
    G ==> D
    H ==> D

    %% Connections for AI to workspace
    E1 ===> I[Process query with AI]
    I ==> E2
    `,
            config: formatJSON({
                theme: "default",
            }),
            autoSync: true,
            editorMode: "code",
            panZoom: true,
            updateDiagram: false,
            svg: "",
            validateCode: "",
            validateConfig: "",
            setCode: (code) => set(() => ({code})),
            setConfig: (config) => set(() => ({config})),
            setEditorMode: (mode) => set(() => ({editorMode: mode})),
            setAutoSync: (autoSync) => set(() => ({autoSync})),
            setPanZoomEnable: (enable) => set(() => ({panZoom: enable})),
            setPanZoom: (panZoom) =>
                set(() => ({
                    pan: panZoom.pan,
                    zoom: panZoom.zoom,
                })),
            setUpdateDiagram: (isUpdate) => set(() => ({updateDiagram: isUpdate})),
            setSvg: (svg) => set(() => ({svg})),
            setValidateCode: (code) => set(() => ({validateCode: code})),
            setValidateConfig: (config) => set(() => ({validateConfig: config})),
        }),
        {
            name: "mermaid-storage",
            partialize: (state) => ({
                autoSync: state.autoSync,
                panZoom: state.panZoom,
            }),
        }
    )
);

const createSelectors = (_store) => {
    const store = _store;
    store.use = {};
    for (const k of Object.keys(store.getState())) {
        store.use[k] = () => store((s) => s[k]);
    }

    return store;
};

export const useStore = createSelectors(useStateStore);

export const getJsonData = () => {
    const code = useStore.getState().validateCode;
    const config = useStore.getState().validateConfig;

    let parsedConfig = {};
    if (typeof config === "string" && config.trim() !== "") {
        try {
            parsedConfig = JSON.parse(config);
        } catch (error) {
            console.error("Error parsing config JSON:", error);
        }
    }

    return {
        code: JSON.stringify(code, null, 2),
        config: JSON.stringify(parsedConfig, null, 2),
    };
};
