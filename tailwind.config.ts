import type { Config } from 'tailwindcss'
import flowbite from 'flowbite/plugin'

export default <Config>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './node_modules/flowbite/**/*.{js,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite
  ],
}
