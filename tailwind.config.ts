import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "solar-blue-dark": "#154295",
        "solar-blue-light": "#019EE3",
        "solar-green": "#A7C414",
        "solar-gray-light": "#F6F5FA",
        'solar-yellow-100': '#FFF200',
        'solar-yellow-200': '#F99F1E',
        'solar-yellow-300': '#F37021',
      },
      fontFamily: {
        Roboto: ['var(--font-roboto)'],
      },
    },
  },
  plugins: [],
};
export default config;
