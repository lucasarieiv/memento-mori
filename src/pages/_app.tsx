import '@/styles/globals.css';
import { Poppins } from '@next/font/google';
import { AppProvider } from '@/context/AppContext';

import type { AppProps } from 'next/app'
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--poppins-font'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className={poppins.className}>
        <Component {...pageProps} />
      </div>
    </AppProvider>
  )
}
