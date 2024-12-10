/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "spring-green": {
          50: "#effef4",
          100: "#dafee6",
          200: "#b8facf",
          300: "#63f297",
          400: "#42e67e",
          500: "#1acd5c",
          600: "#0faa48",
          700: "#0f863c",
          800: "#126933",
          900: "#11562c",
          950: "#033016",
        },
        "energy-yellow": {
          50: "#fdfbe9",
          100: "#faf5c7",
          200: "#f6e892",
          300: "#f2d863",
          400: "#ebbf24",
          500: "#dba717",
          600: "#bd8111",
          700: "#975d11",
          800: "#7d4b16",
          900: "#6b3d18",
          950: "#3e200a",
        },
      },
      transitionProperty: {
        "max-height": "max-height",
        padding: "padding",
      },
      boxShadow: {
        "buy-button": "0px 5px 30px 0px #12562c",
        "indigo-button": "0px 5px 30px 0px #4f46e6",
      },
      animation: {
        text: "text 5s ease infinite",
        shine: "bgMove linear 5s infinite",
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        bgMove: {
          "0%": {
            "background-position": "-500px 0",
          },
          "100%": {
            "background-position": "1000px 0",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".5",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    // require("daisyui"),
  ],
};
