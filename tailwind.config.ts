import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'solar-blue-primary': '#1a9cd9',
        'solar-blue-secundary': '#0d3b85',
        'solar-green-prymary': '#bccf00',
        'solar-green-secundary': '#fcee21',
        'solar-orange-prymary': '#F99F1E',
        'solar-wine-support': '#c1478a',
        'solar-red-support': '#e54757',
        'solar-gray-light': '#F6F5FA',
      },
      fontFamily: {
        Roboto: ['var(--font-roboto)'],
      },
    },
  },
  plugins: [],
};
export default config;
