import React, { useState } from "react";

export default function Subcriber({
  email,
  selected,
  subscribers,
  setSubscribers,
}) {
  const selectSubcriber = () => {
    const subs = [...subscribers];
    const sub = subs.find((item) => item.email == email);
    sub.selected = !selected;
    setSubscribers(subs);
  };

  return (
    <div className=" flex items-center gap-2 text-base font-medium">
      <input
        type="checkbox"
        checked={selected}
        onChange={selectSubcriber}
        className="h-5 w-5 cursor-pointer"
      />
      {email}{" "}
    </div>
  );
}
