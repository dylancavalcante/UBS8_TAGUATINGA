/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F4FC',
          100: '#D1E9F9',
          200: '#A3D3F3',
          300: '#75BDED',
          400: '#47A7E7',
          500: '#2D9CDB',
          600: '#247DAF',
          700: '#1B5E83',
          800: '#123F58',
          900: '#091F2C',
        },
        secondary: {
          30: '#FFCC00',
          35: '#ad8b00',
          50: '#E9F7EE',
          100: '#D3EFDD',
          200: '#A7DFBB',
          300: '#7BCF99',
          400: '#4FBF77',
          500: '#27AE60',
          600: '#1F8B4D',
          700: '#17683A',
          800: '#0F4526',
          900: '#082313',
        },
        neutral: {
          50: '#F5F7FA',
          100: '#E4E7EB',
          200: '#CBD2D9',
          300: '#9AA5B1',
          400: '#7B8794',
          500: '#616E7C',
          600: '#52606D',
          700: '#3E4C59',
          800: '#323F4B',
          900: '#1F2933',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}