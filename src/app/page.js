"use client"
import React from 'react';
import Diagram from "@/components/home/diagram";
import Features from "@/components/home/features";
import Testimonials from "@/components/home/testimonials";
import Faq from "@/components/home/faq";
import HeroSection from '@/components/home/heroSection';
import FlowchartPage from './dashboard2/page';

function Page(props) {
    return (
        <>
            {/* <HeroSection />
            <Diagram />
            <Features />
            <Testimonials />
            <Faq /> */}
            <FlowchartPage />
        </>
    );
}

export default Page;