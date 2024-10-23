import React, { useState } from "react";
import { Icons } from "./icons";
import useDropdown from "./dropdown";
import Hr from "./hr";
import axios from "axios";
import { api_url } from "../EmailEditor/utils/auth";
import { toast } from "react-toastify";

export default function Template({
  name,
  selected,
  templates,
  setTemplates,
  setSendTo,
  edit_template,
}) {
  const {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } = useDropdown();
  const _templates = [...templates];
  const template = _templates.find((item) => item.name == name);

  const selectSubcriber = () => {
    template.selected = !selected;
    setTemplates(_templates);
  };

  const deleteTemplate = (templateId) => {
    axios
      .delete(api_url + `${templateId}/`)
      .then((res) => {
        setTemplates(templates.filter((item) => item.id !== templateId));
        toast.success("Template deleted successfully!");
      })
      .catch((err) => console.error("Error deleting template:", err));
  };

  const large_text = name.length > 12 ? true : false;

  return (
    <div className=" col-span-4 flex items-center gap-2 text-sm font-medium h-10 bg-gray px-3 py-0 rounded-md">
      <div className="">
        <Icons.template className=" w-4" />
      </div>
      <div className="relative group">
        {large_text && (
          <aside className=" opacity-0 invisible scale-0 group-hover:opacity-100 group-hover:visible group-hover:scale-100 origin-bottom duration-200 absolute bg-white rounded-lg p-2 bottom-full right-0 shadow-box max-w-32 w-max">
            {name}
          </aside>
        )}
        <div className="whitespace-nowrap cursor-pointer">
          {large_text ? `${name.substring(0, 12)}...` : name}
        </div>
      </div>
      <DropdownMenu className={"ml-auto w-fit h-fit"}>
        <Icons.bar className="cursor-pointer h-3 w-3 opacity-60" />
        <DropdownMenuContent>
          <DropdownMenuItem handleClick={() => edit_template(template)}>
            <>
              <Icons.edit className="w-4 h-4" />
              Edit template
            </>
          </DropdownMenuItem>
          <Hr />
          <DropdownMenuItem handleClick={() => setSendTo(template)}>
            <>
              <Icons.select className=" w-4" />
              Send to subcribers
            </>
          </DropdownMenuItem>
          <Hr />
          <DropdownMenuItem
            handleClick={() => deleteTemplate(template.id)}
            className={" text-danger"}
          >
            <>
              <Icons.delete className=" w-4" />
              Remove template
            </>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
