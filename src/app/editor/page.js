"use client";
import React, {useEffect, useState} from 'react';
import MainEditor from "@/components/editor/MainEditor";
import MainLayout from "@/layout/MainLayout";

function Page() {
    const [sidebarKey, setSidebarKey] = useState("Templates");
    return (<>
        <MainLayout setSidebarKey={setSidebarKey} sidebarKey={sidebarKey}>
            <MainEditor sidebarKey={sidebarKey}  />
        </MainLayout>
    </>);
}

export default Page;


