"use client"

import Image from 'next/image'
import React from 'react'
import { HiOutlineHome } from "react-icons/hi2";
import { IoArchiveOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { IconType } from 'react-icons/lib';
import { Option } from '@/app/(protected-routes)/components/TagsSelect';
import { Separator } from './ui/separator';
import { PiTag } from 'react-icons/pi';

interface LinkItemProps {
    name: string;
    path: string;
    icon: IconType;
    pathname: string;
}

function LinkItem ({name, path, icon: Icon, pathname}: LinkItemProps) {
    const isActive = pathname.includes(path)

    return (
        <Link href={path} className={`flex items-center gap-1 py-[10px] px-3 rounded-[8px] text-foreground ${isActive ? "bg-background text-accent-foreground" : ""}`}>
            <Icon size={16} className={isActive ? 'stroke-blue-500' : ""}/>
            <span className='text-preset-4'>{name}</span>
            <IoIosArrowForward className='ml-auto'/>
        </Link>
    )
}

interface SidebarProps {
    tags: Option[];
}

export default function Sidebar({tags}: SidebarProps) {
    const pathname = usePathname();

    const onClickTags = (tagName: string) => {
        redirect(`/tags/${tagName}`)
    }
    
    return (
        <aside className={`hidden lg:block w-[272px] h-screen overflow-auto text-foreground py-3 px-4 scrollbar-hide border-r-[1px] border-border bg-background-2`}>
            <div className='flex flex-col gap-4'>
                <div className='w-[95px] h-[28px]'>
                    <Image
                        src={"/assets/images/logo.svg"}
                        width={0}
                        height={0}
                        sizes='100vw'
                        className='w-full h-full'
                        alt='notable logo'
                        priority
                    />                    
                </div>

                <div className='flex flex-col gap-2'>
                    {/* main selection */}
                    <div className='flex flex-col gap-1'>
                        <LinkItem path={"/home"} name='All Notes' icon={HiOutlineHome} pathname={pathname}/>
                        <LinkItem path={"/archived"} name='Archived Notes' icon={IoArchiveOutline} pathname={pathname}/>
                    </div>

                    <Separator />

                    <div className='text-foreground text-preset-4'>
                        Tags
                    </div>
                    <div className='flex flex-col gap-1'>
                    {tags.map((tag, index) => {
                        const isActive = pathname.includes(tag.value);
                        
                        return (
                            <div className={`flex gap-2 py-[10px] px-[12] cursor-pointer ${isActive ? "bg-background rounded-[8px]" : ""}`} key={`${index}`} onClick={() => onClickTags(tag.value)}>
                                <PiTag className={isActive ? "fill-primary" : 'fill-foreground'}/>
                                <span className='text-preset-4 text-foreground'>{tag.value}</span>
                                <IoIosArrowForward className='ml-auto'/>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </aside>
    )
}
