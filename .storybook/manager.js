import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const customTheme = create({
  base: 'light',
  brandTitle: 'react-sprig',
  brandUrl: 'https://react-sprig.netlify.app',
  brandImage: 'logo.png',
  brandTarget: '_self',
})

addons.setConfig({
  theme: customTheme,
})
