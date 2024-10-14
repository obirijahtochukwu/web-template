/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/EmailEditor/components/LeftSideBar/*.js",
    "./src/pages/Dashboard/subscribers.js",
    "./src/components/ui/select.js",
  ],
  theme: {
    extend: {
      colors: {
        skeleton: "rgb(228, 230, 232)",
        primary: "#2563eb",
        secondary: "#6D6D6D",
        danger: "#EE4C45",
      },
      fontFamily: {
        primary: "Quicksand",
      },
      boxShadow: {
        box: "0px 4px 20px 3px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [],
};
