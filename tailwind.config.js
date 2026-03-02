/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff6a00",
        primaryDark: "#cc5200",
        darkbg: "#0a0a0a",
        cardbg: "#111111",
      },
      boxShadow: {
        glow: "0 0 18px rgba(255,106,0,0.35)",
        glowStrong: "0 0 30px rgba(255,106,0,0.5)",
      },
    },
  },
  plugins: [],
}