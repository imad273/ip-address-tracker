module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        gray: "hsl(0, 0%, 59%)",
        "dark-gray": "hsl(0, 0%, 17%)"
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      boxShadow: {
         'mine': 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
      }
    },
  },
  plugins: [],
};
