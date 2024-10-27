import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-200': '#eee4ff',
        'primary-500': '#8b6ffe',
        'primary-700': '#7257ea',
        'primary-900': '#6244e5',
        'secondary-200': '#dcfcf0',
        'secondary-500': '#95f3d1',
        'secondary-900': '#2de9a6',
      },
    },
  },
  plugins: [],
};
export default config;
