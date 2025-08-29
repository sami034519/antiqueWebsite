// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // required for JSX support
  ],
  theme: {
    extend: {
       colors: {
        primary: '#279d6d',       // e.g. warm yellow-orange
        secondary: '#8e5f32',
      },
      animation: {
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
