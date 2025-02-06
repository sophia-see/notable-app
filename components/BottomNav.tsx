"use client"

import React, { ReactNode } from 'react'
import { HiOutlineHome } from "react-icons/hi2";
import { IoArchiveOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { PiTag } from "react-icons/pi";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons/lib';

interface NavLinkProps {
    name: string;
    path: string;
    currentPath: string;
    icon: IconType;
}

function NavLink ({name, path, currentPath, icon: Icon}: NavLinkProps) {
    const isActive = currentPath.includes(path)

    return (
        <Link href={path} className={`flex flex-col gap-1 justify-center items-center w-[80px] rounded-[4px] py-1 ${isActive ? "bg-blue-50" : ""}`}>
            <Icon 
                size={24} 
                color={isActive ? '#335CFF' : "#525866"}
            />
            <span className={`hidden md:block ${isActive ? "text-blue-500" : "text-neutral-600"} text-preset-6`}>
                {name}
            </span>
        </Link>        
    )
}

export default function BottomNav() {
    const pathname = usePathname();
    
    return (
        <div className='lg:hidden h-[74px] shadow-[0_-4px_6px_rgba(240,240,240,0.6)] flex justify-between py-3 px-[32px]'>
            <NavLink 
                name='Home'
                path='/home'
                currentPath={pathname}
                icon={HiOutlineHome}
            />
            <NavLink 
                name='Search'
                path='/search'
                currentPath={pathname}
                icon={IoIosSearch}
            />
            <NavLink 
                name='Archived'
                path='/archived'
                currentPath={pathname}
                icon={IoArchiveOutline}
            />
            <NavLink 
                name='Tags'
                path='/tags'
                currentPath={pathname}
                icon={PiTag}
            />
            <NavLink 
                name='Settings'
                path='/settings'
                currentPath={pathname}
                icon={CiSettings}
            />
        </div>
    )
}
