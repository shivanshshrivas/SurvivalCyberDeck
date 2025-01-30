/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["--apple-system","Poppins"],
        inter: ["--apple-system", "Inter"],
        roboto: ["--apple-system", "Roboto"],
        pro: ["Source Code Pro", "monospace"],
      },
      boxShadow: {
        'custom-light': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
        'custom-dark': '3px 3px 15px 0px rgba(167, 165, 165, 0.7)',
      }
    },
  },
  plugins: [],
};
