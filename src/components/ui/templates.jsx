import React, { useEffect, useRef, useState } from "react";
import Select from "./select";
import { Icons } from "./icons";
import Subcriber from "./subcriber";
import Template from "./template";
import SkeletonLoader from "./skeleton";
import { usePagination } from "../EmailEditor/utils/auth";

export default function Templates({
  isOpen,
  setIsOpen,
  templates,
  setTemplates,
  sendTo,
  setSendTo,
  edit_template,
  isLoading,
}) {
  const [inputValue, setInputValue] = useState("");
  const _templates = templates.filter((item) =>
    item?.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  const { Buttons, currentPage } = usePagination(_templates.length);

  const is_empty_list = _templates.length > 0 ? false : true;

  return (
    <article className=" w-full">
      <div className=" text-xl font-semibold text-primary flex items-center gap-1.5">
        Templates{" "}
        <div className=" text-xs text-white rounded-md p-0.5 bg-danger">
          {_templates.length}
        </div>
      </div>
      <section className=" h-10 shadow-sm w-full px-4 py-1 flex items-center gap-3 rounded-lg mt-2">
        <Icons.search />{" "}
        <input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className=" text-base font-normal tracking-wider focus:outline-none w-full"
          placeholder="Search..."
        />
      </section>
      <section
        className={` grid grid-cols-12 gap-5 mt-6 pr-2 h-40 custom-scrollbar`}
      >
        {isLoading ? (
          Array(9)
            .fill("")
            .map((item, idx) => (
              <SkeletonLoader key={idx} size={"h-8 col-span-4"} />
            ))
        ) : is_empty_list ? (
          <div className=" bg-black/5 rounded-lg h-full col-span-12 text-lg flex items-center justify-center font-semibold">
            Oops! No template found
          </div>
        ) : (
          _templates.map(
            (props, idx) =>
              idx < currentPage * 9 &&
              idx > currentPage * 9 - 10 && (
                <Template
                  {...props}
                  templates={templates}
                  setTemplates={setTemplates}
                  key={idx}
                  setSendTo={setSendTo}
                  edit_template={edit_template}
                />
              )
          )
        )}
      </section>
      {_templates.length ? <Buttons /> : null}
    </article>
  );
}
