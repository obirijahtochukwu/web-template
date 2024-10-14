import React, { useEffect, useRef } from "react";
import Select from "../../components/ui/select";

export default function Subscribers({ isOpen, setIsOpen }) {
  const targetRef = useRef();

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

  return (
    <>
      <div
        className={`${
          isOpen ? " visible opacity-100" : " invisible opacity-0"
        } duration-200 h-screen z-[1200] cursor-auto bg-primary/10 backdrop-blur-[2px] w-screen fixed top-0 left-0`}
      ></div>
      <main
        ref={targetRef}
        className={`${
          isOpen ? "" : "hidden"
        } bg-white z-[1200] shadow-box p-4 rounded-lg fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-auto w-full max-w-md h-fit shadow-2xl font-primary
        `}
      >
        <Select className=" flex items-center justify-center absolute top-4 right-3 duration-300 hover:bg-primary/20 w-6 h-6 rounded-full">
          <Bar className="cursor-pointer h-4 w-4" />
        </Select>
        <div className=" text-xl font-semibold text-primary">Subscribers</div>
        <section className=" flex-col flex gap-3 mt-6">
          {[
            "SkylineInnovator123@gmail.com",
            "QuantumPulse789@gmail.com",
            "TechNovaExplorer@gmail.com",
            "PixelFusion2024@gmail.com",
            "AeroWaveCreator@gmail.com",
          ].map((name, idx) => (
            <div
              key={idx}
              className=" flex items-center gap-2 text-base font-medium"
            >
              <input
                type="checkbox"
                name=""
                id=""
                className=" h-5 w-5 cursor-pointer"
              />
              {name}
            </div>
          ))}
        </section>
        <footer className="flex justify-end items-center">
          <button
            onClick={() => setIsOpen(false)}
            className=" h-9 w-20 text-black/80 font-medium text-base mt-6 rounded-md shadow-2xl"
          >
            Cancel
          </button>
          <button className=" bg-primary h-9 w-20 text-white font-medium text-base mt-6 rounded-md shadow-2xl">
            Save
          </button>
        </footer>
      </main>
    </>
  );
}

const Bar = (props) => (
  <svg
    {...props}
    width="5"
    height="22"
    viewBox="0 0 5 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 13.7221C3.88071 13.7221 5 12.5749 5 11.1599C5 9.7448 3.88071 8.59766 2.5 8.59766C1.11929 8.59766 0 9.7448 0 11.1599C0 12.5749 1.11929 13.7221 2.5 13.7221Z"
      fill="#000000"
    />
    <path
      d="M2.5 21.9213C3.88071 21.9213 5 20.7742 5 19.3591C5 17.944 3.88071 16.7969 2.5 16.7969C1.11929 16.7969 0 17.944 0 19.3591C0 20.7742 1.11929 21.9213 2.5 21.9213Z"
      fill="#000000"
    />
    <path
      d="M2.5 5.52287C3.88071 5.52287 5 4.37573 5 2.96065C5 1.54558 3.88071 0.398438 2.5 0.398438C1.11929 0.398438 0 1.54558 0 2.96065C0 4.37573 1.11929 5.52287 2.5 5.52287Z"
      fill="#000000"
    />
  </svg>
);
