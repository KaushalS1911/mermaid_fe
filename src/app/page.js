"use client"
import React from 'react';
import Diagram from "@/components/home/diagram";
import Features from "@/components/home/features";
import Testimonials from "@/components/home/testimonials";
import Faq from "@/components/home/faq";
import HeroSection from '@/components/home/heroSection';

function Page(props) {
    return (
        <>
            <HeroSection />
            <Diagram />
            <Features />
            <Testimonials />
            <Faq />
        </>
    );

}

export default Page;