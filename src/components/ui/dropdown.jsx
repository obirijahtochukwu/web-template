import React, { useState } from "react";
import { Icons } from "./icons";

export default function useDropdown() {
  const DropdownMenuTrigger = ({ children }) => <>{children}</>;

  const DropdownMenuItem = ({ children, handleClick, className }) => (
    <button
      onClick={handleClick}
      className={className + " p-3 flex items-center text-sm font-medium gap-2"}
    >
      {children}
    </button>
  );

  const DropdownMenuContent = ({ children }) => (
    <div className=" group-hover:scale-100 group-hover:visible group-hover:opacity-100 opacity-0 scale-50 invisible absolute top-full right-0 w-max h-fit bg-white shadow-box rounded-md duration-200 origin-top-right z-10">
      {children}
    </div>
  );

  const DropdownMenu = ({ children, className }) => (
    <div className={className + " relative group"}>{children}</div>
  );

  return {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  };
}
