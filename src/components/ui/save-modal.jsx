import React, { useEffect, useState } from "react";
import { useData } from "../EmailEditor/utils/auth";

export default function SaveModal({
  isSave,
  setIsSave,
  saveTemplate,
  editTemplate,
  saveEditedTemplate,
}) {
  const [form, setForm] = useState({
    name: editTemplate.name || "",
    subject: editTemplate.subject || "",
  });
  const { fetchTemplates } = useData();

  const submit = (e) => {
    e.preventDefault();
    if (editTemplate.id) {
      saveEditedTemplate(form.name, form.subject);
    } else {
      saveTemplate(form.name, form.subject);
    }
    setForm({ name: "", subject: "" });
    setIsSave(false);
    fetchTemplates();
  };

  useEffect(() => {
    setForm({
      name: editTemplate.name || "",
      subject: editTemplate.subject || "",
    });
  }, [isSave]);

  return (
    <>
      <div
        className={`${
          isSave ? " visible opacity-100" : " invisible opacity-0"
        } duration-200 h-screen z-[1200] cursor-auto bg-primary/10 backdrop-blur-[2px] w-screen fixed top-0 left-0`}
      ></div>
      <form
        onSubmit={submit}
        className={`${
          isSave ? "" : "hidden"
        } max-w-md bg-white z-[1200] shadow-box p-4 rounded-lg fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-auto w-full h-fit font-primary
        `}
      >
        <div className=" text-xl font-semibold text-primary flex items-center gap-1.5">
          {editTemplate.name ? "Edit Template" : "Save Template"}
        </div>
        <section>
          <div className=" text-base text-secondary font-semibold mb-1 mt-4">
            Name
          </div>
          <input
            required
            autoFocus
            type="text"
            name={form.name}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className=" w-full h-10 rounded-md border-2 border-gray focus:outline-none py-2.5 px-3 text-base font-medium font-primary"
          />
        </section>
        <section>
          <div className=" text-base text-secondary font-semibold mb-1 mt-7">
            Subject
          </div>
          <input
            required
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className=" w-full h-10 rounded-md border-2 border-gray focus:outline-none py-2.5 px-3 text-base font-medium font-primary"
          />
        </section>
        <footer className={"flex justify-end items-center mt-5"}>
          <button
            onClick={() => setIsSave(false)}
            className=" h-9 w-20 text-secondary font-semibold text-base mt-6 rounded-md shadow-2xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" bg-primary h-9 w-20 text-white font-semibold text-base mt-6 shadow-box"
          >
            Save
          </button>
        </footer>
      </form>
    </>
  );
}
