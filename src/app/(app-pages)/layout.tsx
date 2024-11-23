import Navbar from '@/components/sections/nav-bar'
import React from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        template: '%s | CareerCraft',
        default: 'CareerCraft',
    },
    description: "Streamline your job search and professional networking with an intelligent tracking system.",
};

export default function AppLayout({
                                      children,
                                  }: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}
