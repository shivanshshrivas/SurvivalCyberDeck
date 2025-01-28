/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["-apple-system","Poppins"],
        inter: ["-apple-system", "Inter"],
        roboto: ["-apple-system", "Roboto"],
        pro: ["Source Code Pro", "monospace"],
      }
    },
  },
  plugins: [],
};
