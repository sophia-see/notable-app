"use client"

import { useAppContext } from "@/contexts/AppContext";
import { SearchInput } from "./custom-ui/search-input";
import Image from 'next/image'
import { CiSettings } from "react-icons/ci";
import React from "react";

export default function Navbar() {
    const { isDarkMode } = useAppContext();

    const renderLogo = React.useMemo(() => {
        return (
            <div className='w-[95px] h-[28px]'>
                <Image
                    src={`/assets/images/logo${isDarkMode ? "Dark" : ""}.svg`}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='w-full h-full'
                    alt='notable logo'
                    priority
                />                    
            </div>
        )
    }, [isDarkMode])

    return (
        <nav 
            className={`
                w-full 
                py-[18.5px] lg:py-[23px] px-8 
                lg:border-b-[1px] 
                flex justify-between items-center
                bg-background lg:bg-background-2
            `}
        >
            {renderLogo}
            <div className={`hidden lg:block text-preset-1 text-accent-foreground`}>
                All Notes
            </div>
            <div className="hidden lg:flex gap-4 items-center">
                <SearchInput 
                    className="w-[300px]"
                    placeholder="Search by title, content, or tags…"
                />
                <CiSettings className="stroke-neutral-500"/>
            </div>
        </nav>
    );
}
