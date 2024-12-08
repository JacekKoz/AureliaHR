import React from "react";
import { sidebarLinks } from "../assets/sidebarLinks";
import settingIcon from "../assets/settings-icon.svg/"

const Sidebar = () => (
  <div className="transition-all ease-in-out delay-150 duration-500 bg-accent_color_1 text-black h-[100%] min-h-[100vh] w-[5rem] hover:w-[15.2rem] font-vidaloka flex flex-col items-center py-5 group">
    <div className="mb-8 flex items-center justify-center w-full px-5">
      <h1 className="text-3xl font-bold flex-shrink-0">A</h1>
      <h1 className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap overflow-hidden text-ellipsis">
        ureliaHR
      </h1>
    </div>
    <nav className="w-full flex flex-col items-start px-3 space-y-4">
      {sidebarLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="flex items-center w-full text-lg px-3 py-2 hover:bg-border_color rounded-full transition-all"
        >
          <img
            src={link.icon}
            alt={`${link.label} icon`}
            className="w-7 h-7 mr-3"
          />
          <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap max-w-[10rem] overflow-hidden text-ellipsis">
            {link.label}
          </span>
        </a>
      ))}
    </nav>
    <div className="mt-auto w-full px-3">
      <a
        href="/settings"
        className="flex items-center w-full text-lg px-3 py-2 hover:bg-border_color rounded-full transition-all"
      >
        <img
          src={settingIcon}
          alt="Settings icon"
          className="w-7 h-7 mr-3"
        />
        <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap max-w-[10rem] overflow-hidden text-ellipsis">
          Settings
        </span>
      </a>
    </div>
  </div>
);

export default Sidebar;
