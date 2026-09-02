import localFont from 'next/font/local'

export const abcFavorit = localFont({
  src: './fonts/ABCFavorit-Regular-Trial.otf',
  variable: '--font-abc-favorit',
  display: 'swap',
  weight: '400',
  style: 'normal',
})

export const abcFavoritLight = localFont({
  src: './fonts/ABCFavorit-Light-Trial.otf',
  variable: '--font-abc-favorit-light',
  display: 'swap',
  weight: '300',
  style: 'normal',
})
