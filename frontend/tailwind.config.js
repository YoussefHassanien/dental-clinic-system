/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#567daa",
        "custom-gray": "rgba(233, 233, 233, 0.25)",
      },
    },
  },
  plugins: [],
};
