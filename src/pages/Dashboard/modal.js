import React, { useEffect, useRef, useState } from "react";
import Select from "../../components/ui/select";
import Subcriber from "./subcriber";
import { Icons } from "../../components/ui/icons";
import Subscribers from "../../components/ui/subscribers";
import Templates from "../../components/ui/templates";

export default function Modal({
  isOpen,
  setIsOpen,
  subscribers,
  setSubscribers,
  templates,
  setTemplates,
  sendTo,
  setSendTo,
  edit_template,
  isLoading,
}) {
  const targetRef = useRef();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const close = (e) => {
      if (targetRef.current && !targetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, [targetRef]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const subs = subscribers.filter((item) =>
    item.email.toLowerCase().includes(inputValue.toLowerCase())
  );

  const is_empty_list = subs.length > 0 ? false : true;

  const props = {
    isOpen,
    setIsOpen,
    subscribers,
    setSubscribers,
    templates,
    setTemplates,
    sendTo,
    setSendTo,
    edit_template,
    isLoading,
  };

  return (
    <>
      <div
        className={`${
          isOpen ? " visible opacity-100" : " invisible opacity-0"
        } duration-200 h-screen z-[1200] cursor-auto bg-primary/10 backdrop-blur-[2px] w-screen fixed top-0 left-0`}
      ></div>
      <main
        ref={targetRef}
        className={`${isOpen ? "" : "hidden"} ${
          sendTo.id ? "max-w-md" : "max-w-xl"
        } bg-white z-[1200] shadow-box p-4 rounded-lg fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-auto w-full h-fit font-primary
        `}
      >
        {sendTo.id ? <Subscribers {...props} /> : <Templates {...props} />}
      </main>
    </>
  );
}
