/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#003459',
        secondary: '#007ea7',
        tertiary: '#00a8e8',
        strava: '#ff4d00',
      },
      boxShadow: {
        'sidenav': '5px 0px 10px gray',
      }
    },
    fontFamily: {
      title: 'azonix',
    },
  },
  plugins: [],
};
