import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "!./node_modules", // 👈 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "myblue-100": "#CAF0F8",
        "myblue-200": "#ADE8F4",
        "myblue-300": "#90E0EF",
        "myblue-400": "#48CAE4",
        "myblue-500": "#00B4D8",
        "myblue-600": "#0096C7",
        "myblue-700": "#0077B6",
        "myblue-800": "#023E8A",
        "myblue-900": "#03045E",
      }
    },

  },
  plugins: [],
}
export default config
