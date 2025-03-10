"use client"

import React from 'react'
import { HiOutlineHome } from "react-icons/hi2";
import { IoArchiveOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { PiTag } from "react-icons/pi";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons/lib';
import { useAppContext } from '@/contexts/AppContext';

interface NavLinkProps {
    name: string;
    path: string;
    currentPath: string;
    icon: IconType;
    isDarkMode: boolean;
}

function NavLink ({name, path, currentPath, icon: Icon, isDarkMode}: NavLinkProps) {
    const isActive = currentPath.includes(path)

    return (
        <Link 
            href={path} 
            className={`
                flex flex-col gap-1 justify-center items-center 
                w-[80px] rounded-[4px] py-1 
                ${isActive ? isDarkMode ? "bg-neutral-700" : "bg-blue-50" : ""}
            `}
        >
            <Icon 
                size={24} 
                color={isActive ? '#335CFF' : isDarkMode ? "#99A0AE" : "#525866"}
            />
            <span className={`hidden md:block ${isActive ? "text-primary" : "text-foreground"} text-preset-6`}>
                {name}
            </span>
        </Link>        
    )
}

export default function BottomNav() {
    const { isDarkMode } = useAppContext();
    const pathname = usePathname();
    
    return (
        <div 
            className={`
                z-10
                ${isDarkMode ? "bg-neutral-950" : "bg-neutral-0"} 
                lg:hidden h-[74px] 
                ${isDarkMode ? "shadow-[0_-5px_6px_rgba(0,0,0,0.5)]" : "shadow-[0_-4px_6px_rgba(240,240,240,0.6)]"} 
                flex justify-between py-3 px-[32px]
            `}
        >
            <NavLink 
                name='Home'
                path='/home'
                currentPath={pathname}
                icon={HiOutlineHome}
                isDarkMode={isDarkMode}
            />
            <NavLink 
                name='Search'
                path='/search'
                currentPath={pathname}
                icon={IoIosSearch}
                isDarkMode={isDarkMode}
            />
            <NavLink 
                name='Archived'
                path='/archived'
                currentPath={pathname}
                icon={IoArchiveOutline}
                isDarkMode={isDarkMode}
            />
            <NavLink 
                name='Tags'
                path='/tags'
                currentPath={pathname}
                icon={PiTag}
                isDarkMode={isDarkMode}
            />
            <NavLink 
                name='Settings'
                path='/settings'
                currentPath={pathname}
                icon={CiSettings}
                isDarkMode={isDarkMode}
            />
        </div>
    )
}
