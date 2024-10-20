import React, { useState } from "react";

export default function Subcriber({
  email,
  selected,
  subscribers,
  setSubscribers,
}) {
  const subs = [...subscribers];
  const sub = subs.find((item) => item.email == email);
  const selectSubcriber = () => {
    sub.selected = !selected;
    setSubscribers(subs);
  };

  return (
    <label
      htmlFor={sub.id}
      className=" flex items-center gap-2 text-base font-medium hover:text-black duration-200 hover:font-semibold"
    >
      <input
        id={sub.id}
        type="checkbox"
        checked={selected}
        onChange={selectSubcriber}
        className="h-5 w-5 cursor-pointer"
      />
      {email}{" "}
    </label>
  );
}
