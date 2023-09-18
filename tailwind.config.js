const colors = require("tailwindcss/colors");

export default {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}", "./index.html"],
  theme: {
    colors: {
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      orange: colors.orange,
      amber: colors.amber,
      cyan: colors.cyan,
      teal: colors.teal,
      fuchsia: colors.fuchsia,
      lime: colors.lime,
      rose: colors.rose,
      slate: colors.slate,
      pink: colors.pink,
      purple: colors.purple,
      sky: colors.sky,
      stone: colors.stone,
      violet: colors.violet,
      zinc: colors.zinc
    },
    fontFamily: {
      sans: ["B612", "Avenir", "sans-serif"],
      serif: ["Merriweather", "serif"]
    },
    extend: {}
  },
  plugins: [require("@tailwindcss/forms")]
};
