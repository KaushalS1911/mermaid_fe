"use client"
import React from 'react';
import Diagram from "@/components/home/diagram";
import Features from "@/components/home/features";
import Testimonials from "@/components/home/testimonials";
import Faq from "@/components/home/faq";
import Header from "@/components/header/Header";
import Dashboard from "@/app/dashboard1/page";

function Page(props) {
    return (<>
        {/*<Header />*/}
        {/*    <Diagram/>*/}
        {/*    <Features/>*/}
        {/*    <Testimonials/>*/}
        {/*    <Faq/>*/}
        <Dashboard/>
    </>);
}

export default Page;