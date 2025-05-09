/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      red: "#FF0000",
      bg_color_1: "#23232c",
      bg_color_2: "#1e1f25",
      placeholder: "#3c3e46",
      border_color: "#124E66",
      accent_color_green: "#8ac186",
      accent_color_yellow: "#ffd47f",
      accent_color_pink: "#ffabc7",
      accent_color_purple: "#7868d8",
      accent_color_blue: "#154ec5",
      button_color: "#ff4d00",
      grey_100: "#E6E6E6",
      grey_200: "#AAAAAA",
      grey_300: "#535353",
      grey_400: "#252525",
    },
    boxShadow: {
      sm:'0px 2px 4px 0px rgba(11, 10, 55, 0.15)',
      lg:'0px 8px 20px 0px rgba(18, 16, 99, 0.06)',
      inner: 'inset 0 0 10px rgba(0, 0, 0, 0.25)',
    },
    fontSize: {
      xs:['14px', { lineHeight: '18px', letterSpacing: '-0.03em' }],
      sm:['16px', { lineHeight: '24px', letterSpacing: '-0.03em' }],
      base:['17px', {lineHeight: '25px', letterSpacing: '-0.03em'}],
      lg:['18px', { lineHeight: '28px', letterSpacing: '-0.03em' }],
      xl:['24px', { lineHeight: '36px', letterSpacing: '-0.03em' }],
      '2xl': ['36px', { lineHeight: '48px', letterSpacing: '-0.032em' }],
      '3xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.032em' }],
      '4xl': ['56px', { lineHeight: '64px', letterSpacing: '-0.032em' }],
      '5xl': ['80px', { lineHeight: '80px', letterSpacing: '-0.032em' }],
    },
    fontFamily: {
      poppins: ['Poppins, sans-serif'],
      vidaloka: ['Vidaloka']
    },
    extend: {}
  },
  plugins: [],
}

