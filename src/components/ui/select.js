import React from "react";

export default function Select({ children, className }) {
  return (
    <div className={className + " relative group"}>
      {children}
      <div className=" group-hover:scale-100 group-hover:visible group-hover:opacity-100 opacity-0 scale-50 invisible absolute top-full right-0 w-40 h-20 bg-white shadow-box rounded-md duration-200 origin-top-right">
        <div className=" p-3 flex items-center cursor-pointer text-xs font-medium text-secondary gap-2">
          <input
            type="checkbox"
            name=""
            id=""
            className=" w-4 cursor-pointer border-2"
          />
          Select All
        </div>
        <div className=" h-px w-auto bg-black/10 mx-3"></div>
        <div className=" p-3 flex items-center cursor-pointer text-xs font-medium gap-2 text-danger">
          <Delete className=" w-4" />
          Delete All
        </div>
      </div>
    </div>
  );
}

const Delete = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="16"
    viewBox="0 0 12 16"
    fill="none"
  >
    <path
      d="M4 0V1.33333H0V2.66667H12V1.33333H8V0H4ZM1.33333 4V16H10.6667V4H1.33333ZM2.66667 5.33333H4V14.6667H2.66667V5.33333ZM5.33333 5.33333H6.66667V14.6667H5.33333V5.33333ZM8 5.33333H9.33333V14.6667H8V5.33333Z"
      fill="#EE4C45"
    />
  </svg>
);
