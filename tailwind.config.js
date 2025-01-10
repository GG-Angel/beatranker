/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tx: {
          light: "#0C0C0D",
          dark: "#FFFFFF",
          alt: "#858586"
        },
        bg: {
          light: "#F5F5F7",
          dark: "#151419"
        },
        card: {
          light: "#FFFFFF",
          dark: "#0C0C0D",
          alt: {
            light: "#E4E4E4",
            dark: "#242436"
          }
        },
        active: {
          light: "#646cff",
          dark: "#404078"
        },
        diff: {
          expertplus: "#945FD3",
          expert: "#BF2A42",
          hard: "#FF6347",
          normal: "#59B0F4",
          easy: "#3CB371"
        },
        green: {
          light: "#168E4C",
          dark: "#48CB83",
        },
        blue: {
          light: "#2991E1",
          dark: "#2592E7"
        }
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

