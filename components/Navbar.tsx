"use client"

import { useAppContext } from "@/contexts/AppContext";
import { SearchInput } from "./custom-ui/search-input";
import Image from 'next/image'
import { CiSettings } from "react-icons/ci";
import React from "react";
import { redirect, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const LINK_NAMES = [
    {
        name: "All Notes",
        path: "/home"
    },
    {
        name: "Archived Notes",
        path: "/archived"
    },
    {
        name: "Notes Tagged: ",
        path: "/tags"
    },
    {
        name: "Showing results for: ",
        path: "/search"
    },
    {
        name: "Settings",
        path: "/settings"
    },
]

export default function Navbar() {
    const { isDarkMode } = useAppContext();
    const pathname = usePathname();
    const isTags = pathname.includes("/tags");
    const isSearch = pathname.includes("/search");
    const tag = isTags ? pathname.split("/").at(-1) : "";
    const search = isSearch ? pathname.split("/").at(2) : "";

    const renderTitle = React.useMemo(() => {
        return LINK_NAMES.find(i => pathname.includes(i.path))?.name ?? "";
    }, [pathname])

    const renderLogo = React.useMemo(() => {
        return (
            <div className='w-[95px] h-[28px] lg:hidden'>
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
    }, [isDarkMode]);

    
    const onSearchChange = useDebouncedCallback((value: string) => {
        redirect(`/search/${value}`)
    }, 300);
    

    const onClickSettings = () => {
        redirect("/settings")
    }

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
            <div className={`hidden lg:block text-preset-1 ${isTags ? "text-foreground" : "text-accent-foreground"}`}>
                {renderTitle}
                <span className="text-accent-foreground">{isTags ? ` ${tag}` : ""}</span>
                <span className="text-accent-foreground">{isSearch ? ` ${search}` : ""}</span>
            </div>
            <div className="hidden lg:flex gap-4 items-center">
                <SearchInput 
                    className="w-[300px]"
                    placeholder="Search by title, content, or tags…"
                    onChange={(e) => onSearchChange(e.target.value)}
                    defaultValue={search}
                />
                <CiSettings onClick={onClickSettings} className="stroke-neutral-500 cursor-pointer"/>
            </div>
        </nav>
    );
}
