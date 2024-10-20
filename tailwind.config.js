/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/EmailEditor/components/LeftSideBar/*.js",
    "./src/pages/Dashboard/*.{js,ts,jsx,tsx}",
    "./src/components/ui/*.{js,ts,jsx,tsx}",
    "./src/components/EmailEditor/utils/auth.jsx",
  ],
  theme: {
    extend: {
      colors: {
        skeleton: "rgb(228, 230, 232)",
        primary: "#2563eb",
        secondary: "#6D6D6D",
        danger: "#EE4C45",
        gray: "#F3F5F5",
      },
      fontFamily: {
        primary: "Quicksand",
      },
      boxShadow: {
        box: "0px 4px 20px 3px rgba(0, 0, 0, 0.10)",
        sm: "0px 1px 10px 1px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [],
};
