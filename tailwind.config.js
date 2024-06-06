/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/EmailEditor/components/LeftSideBar/*.js"],
  theme: {
    extend: {
      colors: {
        skeleton: "rgb(228, 230, 232)",
      },
    },
  },
  plugins: [],
};
