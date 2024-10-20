import React, { useEffect, useRef, useState } from "react";
import Select from "./select";
import { Icons } from "./icons";
import Subcriber from "./subcriber";
import SkeletonLoader from "./skeleton";
import { sendToSubcribers } from "../EmailEditor/utils/auth";

export default function Subscribers({
  isOpen,
  setIsOpen,
  subscribers,
  setSubscribers,
  sendTo,
  setSendTo,
  isLoading,
}) {
  const [inputValue, setInputValue] = useState("");

  const subs = subscribers.filter((item) =>
    item.email.toLowerCase().includes(inputValue.toLowerCase())
  );

  const is_empty_list = subs.length > 0 ? false : true;

  const _props = { subscribers, setSubscribers, setSendTo };
  console.log(sendTo);

  const send = () => {
    const recipients = subscribers
      .filter((item) => item.selected == true)
      .map((item) => `${item}`);
    sendToSubcribers({ template: sendTo, recipients });
    setSendTo({});
  };

  return (
    <>
      <Select
        {..._props}
        className={
          is_empty_list
            ? " hidden"
            : " flex items-center justify-center absolute top-4 right-3 duration-300 hover:bg-primary/20 w-6 h-6 rounded-full"
        }
      >
        <Icons.bar className="cursor-pointer h-4 w-4" />
      </Select>
      <div className=" text-xl font-semibold text-primary flex items-center gap-1.5">
        Subscribers{" "}
        <div className=" text-xs text-white rounded-md p-0.5 bg-danger">
          {subs.length}
        </div>
      </div>
      <section
        className=" h-10 shadow-sm w-full px-4 py-1
         flex items-center gap-3 rounded-lg mt-2"
      >
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
        className={`${
          isLoading ? " overflow-hidden" : "overflow-y-auto"
        } flex-col flex gap-3 mt-6 h-44 custom-scrollbar`}
      >
        {isLoading ? (
          Array(9)
            .fill("")
            .map((item, idx) => (
              <SkeletonLoader key={idx} size={"h-16 py-3.5 w-full"} />
            ))
        ) : is_empty_list ? (
          <div className=" bg-black/5 rounded-lg h-full w-full text-lg flex items-center justify-center">
            Oops! No subscriber found
          </div>
        ) : (
          subs.map((props, idx) => (
            <Subcriber {...props} {..._props} key={idx} />
          ))
        )}
      </section>
      <footer
        className={is_empty_list ? " hidden" : "flex justify-end items-center"}
      >
        <button
          onClick={() => setIsOpen(false)}
          className=" h-9 w-20 text-black/80 font-medium text-base mt-6 rounded-md shadow-2xl"
        >
          Cancel
        </button>
        <button
          onClick={send}
          className=" bg-primary h-9 w-20 text-white font-medium text-base mt-6 rounded-md shadow-2xl"
        >
          Send
        </button>
      </footer>
    </>
  );
}
