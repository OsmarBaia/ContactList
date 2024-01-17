/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./*.{html,js}",
      "./src/**/*.{html,js}",
      "./assets/scripts/*.js",
    ]
  ,
    safelist: [
        'w-full',
        'h-auto',
        'flex',
        'flex-row',
        'items-center',
        'justify-between',
        'p-1',
        'w-2/5',
        'justify-center',
        'gap-0.5',
        'w-4',
        'h-4'
    ],
  theme: {
    extend: {},
  },
  plugins: [],
}

