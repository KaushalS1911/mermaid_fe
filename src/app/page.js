"use client"
import React from 'react';
import Diagram from "@/components/home/diagram";
import Features from "@/components/home/features";
import Testimonials from "@/components/home/testimonials";
import Faq from "@/components/home/faq";
import Header from "@/components/header/Header";
import Header1 from "@/components/home/header";

function Page(props) {
    return (<>
        <Header />
        <Header1 />
            <Diagram/>
            <Features/>
            <Testimonials/>
            <Faq/>
        </>);
}

export default Page;