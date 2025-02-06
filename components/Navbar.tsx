import { SearchInput } from "./custom-ui/search-input";
import Image from 'next/image'
import { CiSettings } from "react-icons/ci";

export default function Navbar() {
    return (
        <nav className="w-full py-[18.5px] lg:py-[23px] px-8 lg:border-b-[1px] flex justify-between items-center bg-neutral-100 lg:bg-transparent">
            <Image
                src={"./assets/images/logo.svg"}
                width={0}
                height={0}
                sizes='100vw'
                className='w-[95px] h-auto lg:hidden'
                alt='notable logo'
            />
            <div className="hidden lg:block text-preset-1 text-neutral-950">
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
