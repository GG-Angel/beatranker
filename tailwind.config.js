/** @type {import('tailwindcss').Config} */
import Colors from './constants/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ...Colors
      },
      fontSize: {
        "ch1": ["89.76px", {
          lineHeight: "89.8px",
          letterSpacing: "-2px"
        }],
        "ch2": ["50.51px", {
          lineHeight: "50.5px",
          letterSpacing: "-1.11px"
        }],
        "csub": ["28.43px", {
          lineHeight: "28.4px",
          letterSpacing: "-0.63px"
        }],
        "cbody": ["16px", {
          lineHeight: "25.6px",
          letterSpacing: "0px"
        }],
        "ctri": ["12px", {
          lineHeight: "19.2px",
          letterSpacing: "0px"
        }]
      },
      fontFamily: {
        geist: ["Geist", "sans-serif"]
        // gultralight: ["Geist-UltraLight", "sans-serif"],
        // glight: ["Geist-Light", "sans-serif"],
        // gthin: ["Geist-Thin", "sans-serif"],
        // gregular: ["Geist-Regular", "sans-serif"],
        // gmedium: ["Geist-Medium", "sans-serif"],
        // gsemibold: ["Geist-SemiBold", "sans-serif"],
        // gbold: ["Geist-Bold", "sans-serif"],
        // gblack: ["Geist-Black", "sans-serif"],
        // gultrablack: ["Geist-UltraBlack", "sans-serif"],
      },
    },
  },
  plugins: [],
}

