import React from "react";
import { Icons } from "./icons";

export default function DeleteHover({ handleClick }) {
  return (
    <section className=" opacity-0 invisible scale-0 group-hover:opacity-100 group-hover:visible group-hover:scale-100 origin-top-right duration-200 h-full w-full backdrop-blur-md bg-black/50 absolute top-0 left-0 z-40">
      <div
        onClick={handleClick}
        className="bg-white text-danger p-1 w-fit ml-auto m-1 rounded-sm flex items-center justify-center text-base cursor-pointer"
      >
        <Icons.delete className="w-5 h-5" />
      </div>
    </section>
  );
}
