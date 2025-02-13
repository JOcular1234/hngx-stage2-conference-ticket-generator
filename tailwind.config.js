// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{js,jsx,ts,tsx,html}",
//     "./components/**/*.{html,js,jsx}",],
//   theme: {
//     extend: {},
//   },
  
//   future: {
//     experimentalOptimizeUniversalDefaults: true,
//   },
//   corePlugins: {
//     preflight: false, // Prevent Tailwind from overriding default styles
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./components/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cabin: ["Cabin", "sans-serif"],
        roadRage: ["Road Rage", "cursive"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  
  plugins: [],
};
