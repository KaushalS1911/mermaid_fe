"use client";
import React, {useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import MainEditor from "@/components/editor/MainEditor";

function Page() {
    const [sidebarKey, setSidebarKey] = useState("Snippets");
    return (<>
        <MainLayout setSidebarKey={setSidebarKey} sidebarKey={sidebarKey}>
            <MainEditor sidebarKey={sidebarKey}/>
        </MainLayout>
    </>);
}

export default Page;


