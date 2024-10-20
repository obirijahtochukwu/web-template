import React, { useState } from "react";
import { Icons } from "./icons";

export default function Select({
  children,
  className,
  subscribers,
  setSubscribers,
  setSendTo,
}) {
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    const subs = subscribers.map(({ email, selected }) => ({
      email,
      selected: !checked,
    }));
    setChecked(!checked);
    setSubscribers(subs);
  };

  return (
    <div className={className + " relative group"}>
      {children}
      <div className=" group-hover:scale-100 group-hover:visible group-hover:opacity-100 opacity-0 scale-50 invisible absolute top-full right-0 w-40 h-20 bg-white shadow-box rounded-md duration-200 origin-top-right">
        <button
          onClick={handleClick}
          className=" p-3 flex items-center text-xs font-medium text-secondary gap-2"
        >
          <input
            type="checkbox"
            name=""
            id=""
            checked={checked}
            className=" w-4 cursor-pointer border-2"
          />
          {checked ? "Unselect All" : "Select All"}
        </button>
        <div className=" h-px w-auto bg-black/10 mx-3"></div>
        <button
          onClick={() => setSendTo({})}
          className=" p-3 flex items-center text-xs font-medium gap-2"
        >
          <Icons.select className=" w-4" />
          Choose template
        </button>
      </div>
    </div>
  );
}
