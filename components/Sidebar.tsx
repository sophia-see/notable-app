"use client"

import Image from 'next/image'
import React from 'react'
import { HiOutlineHome } from "react-icons/hi2";
import { IoArchiveOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className={`hidden lg:block w-[272px] h-screen overflow-auto text-neutral-700 py-3 px-4 scrollbar-hide border-r-[1px] border-border bg-background-2`}>
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
                        <Link href={"/home"} className='flex items-center gap-1 py-[10px] px-3 rounded-[8px] bg-neutral-100 text-neutral-950'>
                            <HiOutlineHome className='stroke-blue-500'/>
                            <span className='text-preset-4'>All Notes</span>
                            <IoIosArrowForward className='ml-auto'/>
                        </Link>
                        <Link href={"/archived"} className='flex items-center gap-1 py-[10px] px-3 rounded-[8px]'>
                            <IoArchiveOutline />
                            <span className='text-preset-4'>Archived Notes</span>
                            <IoIosArrowForward className='ml-auto'/>
                        </Link>
                    </div>

                    {/* tags */}
                    <div>

                    </div>
                </div>
            </div>
        </aside>
    )
}
