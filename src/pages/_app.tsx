import '@/styles/globals.css';
import { Inter } from '@next/font/google';

import type { AppProps } from 'next/app'
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--inter-font'
})

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <>
      <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
    </>
  )
}
