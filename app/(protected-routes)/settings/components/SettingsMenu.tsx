"use client";

import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/contexts/AppContext";
import { logout } from "@/server-actions/auth";
import { redirect, usePathname } from "next/navigation";
import { AiOutlineFontSize } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { IoLogOutOutline, IoSunnyOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";

interface SettingsItemProps {
    name: string;
    icon: IconType;
    path: string;
    isDarkMode: boolean;
    pathname: string;
}

function SettingsItem({
    name,
    icon: Icon,
    path,
    isDarkMode,
    pathname,
}: SettingsItemProps) {
  const isActive = pathname.includes(path);
  const onItemClicked = () => {
      redirect(`/settings/${path}`);
  };

  return (
      <div
          className={`flex items-center gap-2 py-[12.5px] lg:px-2 lg:rounded-[8px] ${isActive ? "bg-background text-accent-foreground" : ""}`}
          onClick={onItemClicked}
          role="button"
      >
          <Icon
              className={`${
                  isDarkMode ? "stroke-neutral-0" : "stroke-neutral-950"
              }`}
          />
          <span
              className={`text-preset-4 text-accent-foreground`}
          >
              {name}
          </span>
          <IoIosArrowForward className='ml-auto hidden lg:block'/>
      </div>
  );
}
export default function SettingsMenu() {
  const pathname = usePathname();
  const isSettingsMenu = pathname == "/settings";
  const { isDarkMode } = useAppContext();
  const onLogout = async () => {
      await logout();
  };

  return (
    <div
        className={`h-full w-full flex flex-col gap-4 text-accent-foreground lg:border-r-[1px] lg:py-5 lg:w-[258px] lg:pr-4 ${isSettingsMenu ? "" : "max-lg:hidden"}`}
    >
        <span className="text-preset-1 lg:hidden">Settings</span>
        <div className="flex flex-col gap-2 h-full">
            <SettingsItem
                name="Color Theme"
                icon={IoSunnyOutline}
                path={"color-theme"}
                isDarkMode={isDarkMode}
                pathname={pathname}
            />
            <SettingsItem
                name="Font Theme"
                icon={AiOutlineFontSize}
                path={"font-theme"}
                isDarkMode={isDarkMode}
                pathname={pathname}
            />
            <SettingsItem
                name="Change Password"
                icon={CiLock}
                path={"change-password"}
                isDarkMode={isDarkMode}
                pathname={pathname}
            />
            <Separator />
            <div
                className="flex items-center gap-2 py-[12.5px] lg:px-2 "
                onClick={onLogout}
            >
                <IoLogOutOutline />
                <span className="text-preset-4">Logout</span>
            </div>
        </div>
    </div>
  );
}
